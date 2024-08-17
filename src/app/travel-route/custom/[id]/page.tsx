"use client";

import useGetDetailCustomData from "@/app/hooks/custom/useGetCustomData";
import usePatchDetailData from "@/app/hooks/custom/usePatchDetailData";
import usePostCustomData from "@/app/hooks/custom/usePostCustomData";
import LoadingModal from "@/app/ui/common/LoadingModal";
import CustomSearch from "@/app/ui/customTravel/CustomSearch";
import DragAndDrop from "@/app/ui/customTravel/DragAndDrop";
import { ITravelDetail, ITravelItem } from "@/lib/types";
import { RootState } from "@/redux";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export interface ITravelCustomData {
  travel_name: string;
  travelroute_range: number;
  start_date: string;
  end_date: string;
}

export type ITravelItems = {
  [date: string]: ITravelDetail[];
};

export default function DetailCustomPage({
  params,
}: {
  params: { id: string };
}) {
  const { mutate: postMutate, isPending: isPosting } = usePostCustomData(
    params.id,
  );
  const { mutate: patchMutate } = usePatchDetailData(params.id);
  const [items, setItems] = useState<ITravelItems>({});
  const { data, isLoading, isError, error } = useGetDetailCustomData(params.id);
  const [openSearch, setOpenSearch] = useState(false);
  const router = useRouter();

  // setup 페이지에서 설정한 옵션 불러오기
  const travelRoute = useSelector((state: RootState) => state.travelRoute);

  const dateRange = generateDateRange(
    travelRoute.startDate,
    travelRoute.endDate,
  );

  function transformData(apiResponse: { items: ITravelItem[] }): ITravelItems {
    const transformed: ITravelItems = {};
    apiResponse.items.forEach((item) => {
      transformed[item.date] = item.details;
    });
    return transformed;
  }

  function generateDateRange(startDate: string, endDate: string): string[] {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const dates = [];

    let currentDate = start;
    while (currentDate <= end) {
      dates.push(currentDate.toISOString().split("T")[0]); // Format YYYY-MM-DD
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
  }

  const formatItems = () => {
    return {
      transportOption:
        travelRoute.travelRouteTransport === "승용차" ? "car" : "public",
      items: Object.keys(items).map((date) => ({
        date,
        details: items[date].map((item, index) => ({
          placeId: item.placeId,
          routeIndex: index,
          contents: item.contents || null,
          mapLink: item.mapLink || null,
        })),
      })),
    };
  };

  const handleSubmit = () => {
    const allDatesHaveItems = Object.keys(items).every(
      (date) => items[date].length > 0,
    );

    if (!allDatesHaveItems) {
      alert("각 날짜에 한개 이상의 일정을 등록해야 합니다");
      return;
    }

    if (window.confirm("변경 사항을 저장하시겠습니까?")) {
      const formattedData = formatItems();

      // 조건에 따라 적절한 mutate 함수 선택
      const mutateFunction = isError ? postMutate : patchMutate;

      mutateFunction(
        { reqData: formattedData },
        {
          onSuccess: (res) => {
            window.alert("Success");
            router.push("/mypage");
          },
          onError: (error) => {
            window.alert(error.message);
          },
        },
      );
    }
  };

  useEffect(() => {
    if (data) {
      const transformedItems = transformData(data);
      setItems(transformedItems);
    }
  }, [data, isLoading]);

  useEffect(() => {
    if (Object.keys(items).length === 0 && dateRange.length > 0) {
      const initialItems: ITravelItems = {};
      dateRange.forEach((date) => {
        initialItems[date] = [];
      });
      setItems(initialItems);
    }
  }, [dateRange]);

  if (isLoading) {
    return <LoadingModal />;
  }

  return (
    <div className="flex justify-center min-h-screen bg-gray-200">
      <div className="flex w-full max-w-screen-xl">
        <DragAndDrop
          dateRange={dateRange}
          items={items}
          setItems={setItems}
          travelRouteBaseInfo={travelRoute}
          setOpenSearch={setOpenSearch}
          handleSubmit={handleSubmit}
        />
        <CustomSearch
          openSearch={openSearch}
          setOpenSearch={setOpenSearch}
          items={items}
          setItems={setItems}
        />
      </div>
    </div>
  );
}
