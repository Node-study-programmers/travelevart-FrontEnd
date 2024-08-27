import { createPortal } from "react-dom";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { IRouteDetail } from "@/redux/slices/recommendTripSlice";
import { FaHeart, FaMapMarkerAlt, FaStar } from "react-icons/fa";
import Link from "next/link";
import { IoIosInformationCircle } from "react-icons/io";
import { TravelDetailResponse } from "@/app/hooks/searchTrip/useGetDetailTravelPage";
import { MdOutlineAccessTimeFilled } from "react-icons/md";

interface TravelPlaceDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  place: IRouteDetail;
  detailTravelDestination: TravelDetailResponse;
  sameRouteDetail: IRouteDetail[];
}

export default function TravelPlaceDetailModal({
  isOpen,
  onClose,
  place,
  detailTravelDestination,
  sameRouteDetail,
}: TravelPlaceDetailModalProps) {
  useEffect(() => {
    // 모달이 열릴 때 배경 스크롤을 막기
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleClose = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (event.target === event.currentTarget) {
        onClose();
      }
    },
    [onClose],
  );

  if (!isOpen) return null;

  // 현재 모달 기준 다음 일정 여행지
  const nextRecommenbdTravelDestination = sameRouteDetail.findIndex(
    (item) => item.placeId === place.placeId,
  );

  return createPortal(
    <div
      className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 z-[500] overflow-auto"
      onClick={handleClose}
    >
      <div className="bg-white w-full lg:w-4/5 max-w-screen-lg mx-4 md:mx-8 lg:mx-16 p-12 rounded-lg relative max-h-[90vh] overflow-y-auto">
        <div className="flex flex-col gap-4">
          <h3 className="text-2xl font-semibold">{place.placeTitle}</h3>
          <div className="flex gap-x-4">
            <div className="flex items-center gap-x-2">
              <FaHeart className={`fill-red-500`} />
              <p>{detailTravelDestination.totalSaveCount}</p>
            </div>
            <div className="flex items-center gap-x-2">
              <FaStar className="text-xl text-yellow-400" />
              <p>{detailTravelDestination.averageRating}</p>
            </div>
          </div>
          <Image
            src={
              place.placeImage ||
              "https://cdn.pixabay.com/photo/2024/02/21/08/44/woman-8587090_1280.png"
            }
            alt={place.placeTitle}
            width={800}
            height={400}
            quality={85}
            className="w-full h-[400px] object-cover rounded-lg mt-4"
          />

          <div className="flex flex-col justify-center gap-y-4">
            <div className="mt-8 flex gap-x-2 items-center">
              <FaMapMarkerAlt className="text-xl" />
              {place.mapLink ? (
                <>
                  <p className="text-xs sm:text-lg">{place.address}</p>
                  {place.mapLink && (
                    <Link
                      href={`https://map.naver.com/index.nhn?enc=utf8&level=2&lng=${place.mapx}&lat=${place.mapy}&pinTitle=${place.address}&pinType=SITE`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 text-xs sm:text-lg"
                    >
                      지도
                    </Link>
                  )}
                </>
              ) : (
                <p className="text-xs sm:text-lg text-gray-500">
                  하루의 마지막 여행지는 지도 정보를 제공하지 않아요.
                </p>
              )}
            </div>
            <div className="flex gap-x-2 items-center">
              <MdOutlineAccessTimeFilled className="text-xl" />
              <p className="text-xs sm:text-lg">
                <span>{place.placeTitle}에서 </span>
                <span>{place.playTime} </span>
                정도의 일정을 추천드려요.
              </p>
            </div>
            <div className="flex gap-x-2 items-center">
              <IoIosInformationCircle className="text-xl" />
              {sameRouteDetail[nextRecommenbdTravelDestination + 1] ? (
                <p className="text-xs sm:text-lg">
                  <span>다음 여행지인 </span>
                  <span>
                    {
                      sameRouteDetail[nextRecommenbdTravelDestination + 1]
                        .placeTitle
                    }
                    까지
                  </span>
                  <span> {place.distance}로 </span>
                  <span>{place.estimatedTime}</span> 정도의 이동이 필요해요.
                  {place.mapLink && (
                    <Link
                      href={place.mapLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 text-xs sm:text-lg ml-2"
                    >
                      경로
                    </Link>
                  )}
                </p>
              ) : (
                <p className="text-xs sm:text-lg text-gray-500">
                  <span>{place.placeTitle}</span>은 오늘의 마지막 여행지 입니다.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
