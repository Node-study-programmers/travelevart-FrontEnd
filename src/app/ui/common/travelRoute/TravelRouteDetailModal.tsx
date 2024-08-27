import { createPortal } from "react-dom";
import useGetDetailTravelData from "@/app/hooks/custom/useGetDetailTravelData";
import Image from "next/image";
import { GoGrabber } from "react-icons/go";
import { FaCar, FaTrain, FaEdit, FaShareAlt, FaSave } from "react-icons/fa";
import { TravelRoute } from "@/app/hooks/mypage/useGetTravelRoute";
import { useEffect, useCallback, useState } from "react";
import { ITravelDetail } from "@/lib/types";
import Tooltip from "../Tooltip";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setTravelRoute } from "@/redux/slices/travelRouteSlice";
import { printPdf } from "@/util/printPdf";

interface TravelRouteDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  route: TravelRoute | null;
  isNotMypage?: boolean;
}

export default function TravelRouteDetailModal({
  isNotMypage,
  isOpen,
  onClose,
  route,
}: TravelRouteDetailModalProps) {
  const { data, isLoading } = useGetDetailTravelData(route?.id ?? -1);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    // Prevent background scroll when modal is open
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  console.log(data);
  // 공개범위 수정 안되는거 달력 범위 이상하게 나오는거 수정

  const handleClose = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (event.target === event.currentTarget) {
        onClose();
      }
    },
    [onClose],
  );

  if (!isOpen) return null;

  if (isLoading) {
    return createPortal(
      <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 z-[500]">
        <div className="text-white">Loading...</div>
      </div>,
      document.body,
    );
  }

  if (!data) {
    return createPortal(
      <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 z-[500]">
        <div className="text-white">No data available</div>
      </div>,
      document.body,
    );
  }

  const handleEditRoute = () => {
    if (route) {
      dispatch(
        setTravelRoute({
          travelRouteName: route.travelName,
          travelRouteRange: route.travelrouteRange,
          startDate: route.startDate,
          endDate: route.endDate,
          travelRouteId: route.id,
          travelRouteTransport: data.transportOption,
        }),
      );
      router.push(`travel-route/setup/${route?.id}`);
    }
  };

  return createPortal(
    <div
      className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 z-[500] overflow-auto"
      onClick={handleClose}
    >
      <button
        className="absolute top-2 right-2 text-white text-2xl hover:text-white"
        onClick={onClose}
      >
        &times;
      </button>
      <div className="bg-white w-full lg:w-4/5 max-w-screen-lg mx-4 md:mx-8 lg:mx-16 p-4 lg:p-6 rounded-lg relative max-h-[90vh] overflow-y-auto">
        <div className="pb-2 bg-white p-4 min-h-64 flex flex-col justify-between px-4 lg:px-8 relative">
          <div id="travel-name" className="flex flex-col gap-5">
            <div className="text-xl lg:text-3xl font-bold gap-1 flex items-center line-clamp-1 text-primary">
              {route?.travelName}
            </div>
            <div className="flex gap-3 mt-2 text-white">
              {data.transportOption === "car" ? (
                <div className="text-sm py-2 bg-primary w-fit px-3 rounded-3xl flex items-center gap-2">
                  <FaCar />
                  승용차
                </div>
              ) : (
                <div className="text-sm py-2 bg-primary w-fit px-3 rounded-3xl flex items-center gap-2">
                  <FaTrain />
                  대중교통
                </div>
              )}
              {route?.travelrouteRange === 0 ? (
                <div className="text-sm py-2 bg-third w-fit px-3 rounded-3xl">
                  비공개
                </div>
              ) : (
                <div className="text-sm py-2 bg-third w-fit px-3 rounded-3xl">
                  공개
                </div>
              )}
            </div>
            <div id="travel-day" className="flex items-center justify-between">
              <span className="bg-secondary text-base w-fit px-4 py-2 rounded-3xl text-white">
                {route?.startDate} - {route?.endDate}
              </span>
            </div>
          </div>

          {/* <div className="absolute left-2 top-1 text-primary">
            By. TravelevarT
          </div> */}
          {!isNotMypage && (
            <div className="absolute -bottom-2 lg:bottom-2 right-2 flex gap-1 lg:gap-4 items-end">
              <Tooltip content="수정하기" direction="bottom">
                <button
                  className="text-gray-600 hover:text-gray-800 p-2"
                  onClick={handleEditRoute}
                >
                  <FaEdit size={20} />
                </button>
              </Tooltip>
              <Tooltip content="공유하기" direction="bottom">
                <button
                  className="text-gray-600 hover:text-gray-800 p-2"
                  onClick={() => router.push("/community/travel/newpost")}
                >
                  <FaShareAlt size={20} />
                </button>
              </Tooltip>
              <Tooltip content="저장하기" direction="bottom">
                <button
                  id="download-button"
                  className="text-gray-600 hover:text-gray-800 p-2"
                  onClick={() => {
                    //로딩 컴포넌트 필요
                    printPdf(data ? data.items : null, route?.travelName);
                  }}
                >
                  <FaSave size={20} />
                </button>
              </Tooltip>
            </div>
          )}
        </div>
        <div className="text-sm flex justify-between py-4 px-4 lg:px-8 bg-white border-b-2 border-gray-300 items-center">
          {/* 추가 정보가 필요하다면 여기에 추가 */}
        </div>

        <div className="mt-4 flex flex-col px-2 lg:px-8">
          {data?.items?.map((day, dayIndex) => (
            <div
              id={day.date}
              key={day.date}
              className="min-h-32 bg-[whitesmoke] mb-4 lg:mb-6 rounded-lg p-4"
            >
              <div className="flex items-center space-x-2 border-b-[1px] border-gray-300 pb-2">
                <span className="text-lg font-bold">Day {dayIndex + 1}</span>
                <span className="text-gray-500 text-sm">{day.date}</span>
              </div>
              {day.details.map((item, index) => (
                <div
                  key={item.detailtravelId}
                  className="bg-white flex flex-col space-y-2 p-2 lg:p-4 rounded-lg shadow-lg transition-shadow mb-4"
                >
                  <div className="flex items-center space-x-4 bg-white">
                    <div className="flex flex-col items-center space-y-2">
                      <span className="bg-red-500 text-white text-sm font-bold rounded-full w-8 h-8 flex items-center justify-center">
                        {index + 1}
                      </span>
                    </div>
                    <div className="flex-1 flex flex-col space-y-2">
                      <div className="flex items-center space-x-4">
                        <Image
                          src={
                            item.placeImage
                              ? item.placeImage
                              : "https://cdn.pixabay.com/photo/2024/02/21/08/44/woman-8587090_1280.png"
                          }
                          alt={item.placeTitle}
                          width={50}
                          height={50}
                          className="w-12 h-12 lg:w-16 lg:h-16 object-cover rounded-lg"
                        />
                        <div>
                          <h5 className="font-semibold text-sm lg:text-base text-nowrap line-clamp-1">
                            {item.placeTitle}
                          </h5>
                          <p className="text-[10px] lg:text-xs text-gray-600 line-clamp-2">
                            {item.address}
                          </p>
                        </div>
                      </div>

                      {item.mapLink && (
                        <a
                          href={item.mapLink}
                          className="text-blue-500 text-sm"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View on Map
                        </a>
                      )}
                    </div>
                    <GoGrabber className="text-lg" />
                  </div>
                  {item.contents && (
                    <p className="relative text-xs lg:text-sm bg-third text-gray-800 px-4 py-2 rounded-lg shadow-sm border border-third hover:bg-secondary transition duration-300 ease-in-out flex items-start space-x-2">
                      <span className="font-semibold text-primary">Memo:</span>
                      <span className="flex-1">{item.contents}</span>
                    </p>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>,
    document.body,
  );
}
