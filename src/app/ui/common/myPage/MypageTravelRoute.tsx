"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { useDeleteTravelRoute } from "@/app/hooks/mypage/useDeleteTravelRoute";
import { FaTrash } from "react-icons/fa";
import { useState } from "react";
import TravelRouteDetailModal from "../travelRoute/TravelRouteDetailModal";
import Pagination from "../Pagination";
import useUserGetTravelRoute, {
  TravelRoutes,
} from "@/app/hooks/mypage/useGetTravelRoute";
import MyPageNotfound from "./MyPageNotfound";
import LoadingModal from "../LoadingModal";

export default function MyPageTravelRoute({
  userId,
  isNotMypage,
}: {
  userId: number | undefined;
  isNotMypage?: boolean;
}) {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const pageSize = 4;

  const { data, isLoading, refetch } = useUserGetTravelRoute({
    userId: userId || 0,
    page,
    pageSize,
  });
  const { mutate } = useDeleteTravelRoute();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState<
    TravelRoutes["routes"][number] | null
  >(null);

  let travelRoutes = data?.routes || [];
  const totalPages = data?.totalPage || 1;

  if (isNotMypage) {
    travelRoutes = travelRoutes.filter((route) => route.travelrouteRange === 1);
  }

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
    <div className="w-full flex flex-col gap-5 mb-10">
      {!isNotMypage && (
        <>
          <button
            className="bg-primary text-white py-2 px-4 rounded-xl hover:bg-secondary transition-all duration-150"
            onClick={handleCreateTravelRoute}
          >
            TravelRoute 생성하기
          </button>
          <div className="w-full h-[1px] bg-gray-300"></div>
        </>
      )}
      {isLoading ? (
        <div className="text-center">
          <LoadingModal />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full">
            {travelRoutes.map((route) => (
              <div
                key={route.id}
                className="relative h-96 bg-white border rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-xl transition-shadow"
                onClick={() => handleTravelRouteClick(route)}
              >
                <Image
                  src={
                    route.detailtravelImage ||
                    `https://cdn.pixabay.com/photo/2024/02/21/08/44/woman-8587090_1280.png`
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
                {!isNotMypage && (
                  <button
                    className="absolute bottom-2 right-2 bg-primary text-white p-2 rounded-full hover:bg-primary transition-all duration-150"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteClick(route.id);
                    }}
                  >
                    <FaTrash size={20} />
                  </button>
                )}
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
