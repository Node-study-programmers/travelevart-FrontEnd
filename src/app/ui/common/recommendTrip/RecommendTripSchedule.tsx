"use client";

import { logoFont } from "@/app/asset/fonts/fonts";
import { RootState } from "@/redux";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSelector } from "react-redux";
import { FaCar, FaTrain } from "react-icons/fa";
import {
  ISetupFormValues,
  travelRouteRangeOptions,
} from "../travelRoute/TravelRouteSetUpForm";
import { useForm } from "react-hook-form";
import useSaveRecommendTrip from "@/app/hooks/recommendTrip/useSaveRecommendTrip";
import TravelPlaceDetailModal from "./RecommendTripDetailModal";
import { IRouteDetail } from "@/redux/slices/recommendTripSlice";
import { TravelDetailResponse } from "@/app/hooks/searchTrip/useGetDetailTravelPage";
import { get } from "@/lib/api";
import { TRAVEL_REGION_GROUP } from "@/constant";

export default function RecommendTripSchedule() {
  const [focusDay, setFocusDay] = useState(0);
  const [travelRouteRange, setTravelRouteRange] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTravelDestination, setSelectedTravelDestination] =
    useState<null | IRouteDetail>(null); // 모달로 보여줄 추천 여행지
  const [detailTravelDestination, setDetailTravelDestination] =
    useState<null | TravelDetailResponse>(null); // 여행지 상세 정보
  const [sameRouteDetail, setSameRouteDetail] = useState<IRouteDetail[]>([]);
  const router = useRouter();
  const { mutate, isPending } = useSaveRecommendTrip(); // travelroute 생성

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Pick<ISetupFormValues, "travelRouteName" | "travelRouteRange">>({
    defaultValues: {
      travelRouteName: "",
      travelRouteRange: 0,
    },
  });

  // 추천 여행지
  const recommendTripDatas = useSelector(
    (state: RootState) => state.recommendTrip,
  );

  const DynamicNaverMap = dynamic(
    () => import("@/app/ui/travelDestination/NaverMap"),
    {
      ssr: false,
    },
  );

  const getStepperColor = (idx: number) => {
    switch (idx) {
      case 0:
        return "bg-primary";
      case 1:
        return "bg-secondary";
      case 2:
        return "bg-third";
      default:
        return "bg-primary";
    }
  };

  // @박 @일
  const totalNight =
    recommendTripDatas.routes[recommendTripDatas.routes.length - 1].detail[0]
      .day - recommendTripDatas.routes[0].detail[0].day;
  const totalDay =
    recommendTripDatas.routes[recommendTripDatas.routes.length - 1].detail[0]
      .day;

  // 추천 데이터 travleroute 저장
  const handleSaveRecommendTrip = (
    data: Pick<ISetupFormValues, "travelRouteName" | "travelRouteRange">,
  ) => {
    const transformedDetailRoute = recommendTripDatas.routes.flatMap((route) =>
      route.detail.map((dayDetailData) => ({
        placeId: dayDetailData.placeId,
        routeIndex: dayDetailData.routeIndex,
        day: dayDetailData.day,
        date: route.day,
        estimatedTime: dayDetailData.estimatedTime,
        distance: dayDetailData.distance,
        playTime: dayDetailData.playTime,
        mapLink: dayDetailData.mapLink,
      })),
    );

    mutate({
      travelName: data.travelRouteName,
      travelrouteRange: data.travelRouteRange,
      transportOption: recommendTripDatas.transportOption,
      detailRoute: transformedDetailRoute,
    });

    reset();
  };

  // 모달 핸들링 함수
  const handleDetailTravelDestinationModal = async (place: IRouteDetail) => {
    setSelectedTravelDestination(place);

    try {
      const response = await get<TravelDetailResponse>(
        `${process.env.NEXT_PUBLIC_BASE_URL}/places/${place.placeId}`,
      );

      if (response) {
        setDetailTravelDestination(response);
      }

      setIsModalOpen(true);

      // 모달에 보여준 여행지가 속한 날짜의 여행지 routes
      const sameDetailRoutesIndex = recommendTripDatas.routes.findIndex(
        (route) => route.detail.some((item) => item.placeId === place.placeId),
      );

      setSameRouteDetail(
        recommendTripDatas.routes[sameDetailRoutesIndex].detail,
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="py-4">
        <div className="flex items-center gap-x-2">
          <Link href="/">
            <p className={`${logoFont.className}`}>TravelevarT</p>
          </Link>
          <p className={`${logoFont.className} text-xs`}>여행지 추천</p>
        </div>
      </div>
      <div className="flex flex-col items-center justify-start flex-grow py-8">
        <div className="flex flex-col items-center gap-y-4">
          {/* 추천 지역 대표 이미지 */}
          <Image
            src={TRAVEL_REGION_GROUP[recommendTripDatas.regions[0].id].imageUrl}
            alt="dummy image"
            width={400}
            height={400}
            quality={85}
            className="w-[200px] h-[200px] rounded-full object-cover"
          />

          <p className="text-2xl font-semibold text-center">
            {`${totalNight > 0 ? totalNight + "박 " + totalDay + "일" : "당일치기"}`}
            <br />
            <span className="text-primary font-semibold">추천일정</span>
            입니다.
          </p>
          <p className="text-sm text-rgb-secondary text-center">
            TravelevarT에서 추천받은 일정으로 여행을 떠나보세요.
          </p>
        </div>
      </div>
      {/* 날짜별 여행 루트 보여줄 지도 */}
      <div className="w-full h-64 lg:h-96 bg-gray-300 rounded-2xl mt-12">
        <DynamicNaverMap
          mapx={recommendTripDatas.routes[focusDay].detail[0].mapx}
          mapy={recommendTripDatas.routes[focusDay].detail[0].mapy}
          address={recommendTripDatas.routes[focusDay].detail[0].address}
          points={recommendTripDatas.routes[focusDay].detail.map(
            (dayDetailData, idx) => ({
              mapx: dayDetailData.mapx,
              mapy: dayDetailData.mapy,
              stepNumber: idx + 1,
            }),
          )}
        />
      </div>
      {/* 날짜별 추천 여행지 */}
      <div className="py-8 px-4">
        {/* Day */}
        <div className="flex flex-wrap gap-x-2 gap-y-4 mb-4">
          {recommendTripDatas.routes.map((recommenTripData, idx) => (
            <div
              key={recommenTripData.day}
              className={`px-4 py-1 rounded-2xl ${focusDay === idx ? "bg-primary text-white" : "bg-stone-200 text-gray-500"} cursor-pointer transition-all duration-300 ease-in-out`}
              onClick={() => setFocusDay(idx)}
            >
              <div>{`Day ${idx + 1}`}</div>
            </div>
          ))}
        </div>
        {/* 날짜별 추천 여행 경로 */}
        <div className="flex flex-col gap-y-12 py-8 px-4">
          {recommendTripDatas.routes[focusDay]?.detail.map(
            (dayDetailData, idx) => (
              <div className="flex items-start" key={dayDetailData.placeId}>
                <div className="flex flex-col items-center mr-12 relative">
                  {/* 스텝 번호 */}
                  <div
                    className={`w-8 h-8 rounded-full ${getStepperColor(idx)} text-white flex items-center justify-center`}
                  >
                    {idx + 1}
                  </div>
                  {/* 스테퍼 라인 (아이콘 위) */}
                  {idx <
                    recommendTripDatas.routes[focusDay].detail.length - 1 && (
                    <>
                      {/* 스테퍼 라인 (아래) */}
                      <div
                        className={`absolute transform -translate-x-1/2 w-0.5 bg-stone-200`}
                        style={{
                          top: "100%",
                          height: "100px",
                          zIndex: -1,
                        }}
                      />
                      {/* 맵링크 아이콘 */}
                      {dayDetailData.mapLink && (
                        <Link
                          href={dayDetailData.mapLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="absolute"
                          style={{
                            left: "50%",
                            top: "calc(100% + 100px)",
                            transform: "translateX(-50%)",
                          }}
                        >
                          {recommendTripDatas.transportOption === "대중교통" ? (
                            <div className="flex items-center gap-x-1 text-stone-400">
                              <FaTrain className="text-lg" />
                              <p className="whitespace-nowrap">
                                {dayDetailData.estimatedTime?.split("약 ")[1]}
                              </p>
                            </div>
                          ) : (
                            <div className="flex items-center gap-x-1 text-stone-400">
                              <FaCar className="text-lg" />
                              <p className="whitespace-nowrap">
                                {dayDetailData.estimatedTime?.split("약 ")[1]}
                              </p>
                            </div>
                          )}
                        </Link>
                      )}
                      {/* 스테퍼 라인 (아이콘 이후) */}
                      <div
                        className={`absolute transform -translate-x-1/2 w-0.5 bg-stone-200`}
                        style={{
                          top: "calc(100% + 130px)",
                          height: "40px",
                          zIndex: -1,
                        }}
                      />
                    </>
                  )}
                </div>
                {/* 여행지 */}
                <div
                  className={`flex bg-white shadow-xl rounded-lg p-4 cursor-pointer transform transition-transform duration-300 ease-in-out hover:scale-105 flex-grow`}
                  onClick={() =>
                    handleDetailTravelDestinationModal(dayDetailData)
                  }
                >
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Image
                      src={`${dayDetailData.placeImage === "" || dayDetailData.placeImage === null ? "https://cdn.pixabay.com/photo/2024/02/21/08/44/woman-8587090_1280.png" : dayDetailData.placeImage}`}
                      alt="dummy image"
                      width={100}
                      height={100}
                      className="w-[100px] h-[100px] object-cover rounded-lg"
                    />
                    <div className="flex flex-col justify-center gap-y-2">
                      <p className="text-lg font-semibold">
                        {dayDetailData.placeTitle}
                      </p>
                      <p className="text-xs text-gray-500">
                        {dayDetailData.address}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ),
          )}
          {/* 추천 일정 travelroute 저장, 다시 추천받기 버튼 */}
          <div className="flex flex-col py-8 w-full">
            <form onSubmit={handleSubmit(handleSaveRecommendTrip)}>
              <div className="flex flex-col justify-center items-center gap-y-4">
                <p className="text-lg font-semibold">
                  추천일정이 마음에 드시나요?
                </p>
                <p className="text-xs text-gray-400 text-center">
                  추천일정을 TravelRoute에 담아 언제든 확인, 수정할 수 있어요!
                </p>
              </div>
              <div className="w-full py-8 flex flex-col gap-y-8">
                <div>
                  <p className="pb-2">TravelRoute</p>
                  <input
                    type="name"
                    placeholder="TravelRoute 입력"
                    className="border border-gray-300 p-2 w-full rounded-lg py-3 outline-none"
                    {...register("travelRouteName", {
                      required: "travelroute 입력은 필수입니다.",
                    })}
                  />
                  {errors.travelRouteName && (
                    <p className="text-red-500 text-sm py-2">
                      {errors.travelRouteName.message}
                    </p>
                  )}
                </div>
                <div>
                  <p className="pb-2">공개 범위</p>
                  <div className="flex flex-wrap gap-2 w-full">
                    {travelRouteRangeOptions.map((travelRouteRangeOption) => (
                      <div
                        key={travelRouteRangeOption.id}
                        className={`flex justify-center items-center flex-1 px-4 py-2 ${travelRouteRange === travelRouteRangeOption.id ? "bg-primary text-white" : "bg-stone-200 text-gray-500"} ${travelRouteRangeOption.id === 0 ? "rounded-tl-xl rounded-bl-xl" : "rounded-tr-xl rounded-br-xl"} cursor-pointer transition-all duration-300 ease-in-out`}
                        onClick={() =>
                          setTravelRouteRange(travelRouteRangeOption.id)
                        }
                      >
                        {travelRouteRangeOption.title}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="w-full flex flex-col gap-y-4 justify-center py-12">
                  <button
                    type="button"
                    className="bg-stone-200 text-gray-500 rounded-xl px-4 py-2 flex-grow"
                    onClick={() => router.push("/recommend-trip")}
                  >
                    다시 추천받기
                  </button>
                  <button
                    type="submit"
                    className="bg-primary text-white rounded-xl px-4 py-2 flex-grow"
                    disabled={isPending}
                  >
                    {isPending ? "생성 중..." : "생성하기"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <TravelPlaceDetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        place={selectedTravelDestination as IRouteDetail}
        detailTravelDestination={
          detailTravelDestination as TravelDetailResponse
        }
        sameRouteDetail={sameRouteDetail}
      />
    </div>
  );
}
