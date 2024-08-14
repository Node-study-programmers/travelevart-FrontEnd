"use client";
import useGetDetailCustomData from "@/app/hooks/custom/useGetCustomData";
import CustomSearch from "@/app/ui/customTravel/CustomSearch";
import TodoLibraryExample from "@/app/ui/customTravel/DragAndDrop";
import { ITravelDetail, ITravelItem } from "@/lib/types";
import { RootState } from "@/redux";
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

function transformData(apiResponse: { items: ITravelItem[] }): ITravelItems {
  const transformed: ITravelItems = {};

  apiResponse.items.forEach((item) => {
    transformed[item.date] = item.details;
  });

  return transformed;
}

// API에서 받은 데이터 형식
type ApiResponse = {
  items: ITravelItem[];
};

// 더미 데이터

// 데이터 변환 함수
export default function TodoPage({ params }: { params: { id: string } }) {
  const [items, setItems] = useState<ITravelItems>({});
  const { data, isLoading } = useGetDetailCustomData(params.id);

  // setup 페이지에서 설정한 옵션 불러오기
  const travelRoute = useSelector((state: RootState) => state.travelRoute);

  const dateRange = generateDateRange(
    travelRoute.startDate,
    travelRoute.endDate,
  );

  // console.log(items);
  useEffect(() => {
    // 더미 데이터를 사용하여 상태를 초기화
    if (data) {
      const transformedItems = transformData(data);
      setItems(transformedItems);
    }
  }, [data]);

  return (
    <div className="flex relative">
      <TodoLibraryExample
        dateRange={dateRange}
        items={items}
        setItems={setItems}
        travelRouteBaseInfo={travelRoute}
      />
      <CustomSearch />
    </div>
  );
}
