// components/MyPageTravelRoute.tsx
"use client";

import userGetTravelRoute, {
  TravelRoutes,
} from "@/app/hooks/mypage/useGetTravelRoute";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useDeleteTravelRoute } from "@/app/hooks/mypage/useDeleteTravelRoute";
import { FaTrash } from "react-icons/fa";
import { useState } from "react";
import TravelRouteDetailModal from "../travelRoute/TravelRouteDetailModal";
import Pagination from "../Pagination";

export default function MyPageTravelRoute({
  userId,
}: {
  userId: number | undefined;
}) {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const pageSize = 4;

  const { data, isLoading, refetch } = userGetTravelRoute({
    userId: userId || 0, // Ensure userId is not undefined
    page,
    pageSize,
  });
  const { mutate } = useDeleteTravelRoute();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState<
    TravelRoutes["routes"][number] | null
  >(null);

  // Extract data from API response
  const travelRoutes = data?.routes || [];
  const totalPages = data?.totalPage || 1; // Default to 1 if undefined

  const handleCreateTravelRoute = () => {
    router.push("/travel-route/setup");
  };

  const handleTravelRouteClick = (route: TravelRoutes["routes"][number]) => {
    setSelectedRoute(route);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (id: number) => {
    if (window.confirm("정말 삭제하시겠습니까? ")) {
      mutate(id, {
        onSuccess: () => {
          window.alert("삭제되었습니다.");
          refetch();
        },
        onError: (error) => {
          console.error("Error deleting travel route:", error);
        },
      });
    }
  };

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
      refetch(); // Fetch new page data
    }
  };

  return (
    <div className="w-full flex flex-col gap-5">
      <button
        className="bg-primary text-white py-2 px-4 rounded-xl hover:bg-secondary transition-all duration-150"
        onClick={handleCreateTravelRoute}
      >
        TravelRoute 생성하기
      </button>
      <div className="w-full h-[1px] bg-gray-300"></div>

      {isLoading ? (
        <div className="text-center">로딩 중...</div>
      ) : (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full pb-10">
            {travelRoutes.map((route) => (
              <div
                key={route.id}
                className="relative h-96 bg-white border rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-xl transition-shadow"
                onClick={() => handleTravelRouteClick(route)}
              >
                <Image
                  src={
                    route.detailtravelImage ||
                    `https://cdn.pixabay.com/photo/2019/06/24/16/43/mountain-4296464_640.jpg`
                  }
                  alt={route.travelName}
                  width={640}
                  height={320}
                  className="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-125"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-opacity-50 p-4">
                  <h3 className="text-2xl font-bold text-white mb-1">
                    {route.travelName}
                  </h3>
                  <p className="text-white text-sm">
                    {route.startDate} ~ {route.endDate}
                  </p>
                </div>
                <button
                  className="absolute bottom-2 right-2 bg-secondary text-white p-2 rounded-full hover:bg-primary transition-all duration-150"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteClick(route.id);
                  }}
                >
                  <FaTrash size={20} />
                </button>
              </div>
            ))}
          </div>
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
      {selectedRoute && (
        <TravelRouteDetailModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          route={selectedRoute}
        />
      )}
    </div>
  );
}
