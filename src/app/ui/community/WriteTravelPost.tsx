"use client";
import Image from "next/image";
import WriteTravelPostSecondStep from "./WriteTravelPostSecondStep";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import useUserGetTravelRoute, {
  TravelRoutes,
} from "@/app/hooks/mypage/useGetTravelRoute";
import Pagination from "../common/Pagination";

export default function WriteTravelPost() {
  const { data: userData } = useSession();
  const [page, setPage] = useState(1);
  const pageSize = 4;
  const selectedRouteRef = useRef<HTMLDivElement | null>(null);

  const [selectedRoute, setSelectedRoute] = useState<
    TravelRoutes["routes"][number] | null
  >(null);

  const { data, isLoading, refetch } = useUserGetTravelRoute({
    userId: userData?.user.userId || 0,
    page,
    pageSize,
  });

  const totalPages = data?.totalPage || 1;

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
      refetch();
    }
  };

  // 경로 선택 시 해당 경로로 스크롤 이동
  useEffect(() => {
    if (selectedRoute && selectedRouteRef.current) {
      selectedRouteRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedRoute]);

  const handleBack = () => {
    setSelectedRoute(null);
  };

  if (selectedRoute) {
    return (
      <WriteTravelPostSecondStep
        selectedRoute={selectedRoute}
        onBack={handleBack}
      />
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 my-10">
      <h2 className="text-2xl font-bold text-gray-700" ref={selectedRouteRef}>
        공유할 여행 경로 선택하기
      </h2>

      {/* 여행 경로 리스트 */}
      <div className="space-y-4 mt-6">
        {isLoading ? (
          <div className="text-center">로딩 중...</div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full">
            {data?.routes.map((route) => (
              <div
                key={route.id}
                className={`relative h-40 bg-white border rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-xl transition-shadow ${
                  selectedRoute?.id === route.id ? "border-primary" : ""
                }`}
                onClick={() => setSelectedRoute(route)}
              >
                <Image
                  src={
                    route.detailtravelImage ||
                    `https://cdn.pixabay.com/photo/2019/06/24/16/43/mountain-4296464_640.jpg`
                  }
                  alt={route.travelName}
                  width={640}
                  height={320}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-opacity-50 p-2">
                  <h3 className="text-xl font-bold text-white">
                    {route.travelName}
                  </h3>
                  <p className="text-white text-sm">
                    {route.startDate} ~ {route.endDate}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 페이지 네이션 */}
      <div className="mt-8">
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
