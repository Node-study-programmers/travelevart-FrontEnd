"use client";

import { logoFont } from "@/app/asset/fonts/fonts";
import { RootState } from "@/redux";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function RecommendTripSchedule() {
  const [focusDay, setFocusDay] = useState(0);
  const [isDetailDataModalOpen, setIsDetailDataModalOpen] = useState(false);
  const router = useRouter();

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

  console.log(recommendTripDatas);

  const steps = [
    {
      label: "Select campaign settings",
      description: `For each ad campaign that you create, you can control how much
              you're willing to spend on clicks and conversions, which networks
              and geographical locations you want your ads to show on, and more.`,
    },
    {
      label: "Create an ad group",
      description:
        "An ad group contains one or more ads which target a shared set of keywords.",
    },
    {
      label: "Create an ad",
      description: `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`,
    },
  ];

  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
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
          {/* 추천 지역 대표 이미지 (첫 번째 지역으로) */}
          <Image
            src="https://cdn.pixabay.com/photo/2024/02/21/08/44/woman-8587090_1280.png"
            alt="dummy image"
            width={100}
            height={100}
            className="rounded-full"
          />
          {/* 선택 지역 추가로 같이 알려주기 */}
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
          mapx={recommendTripDatas.routes[0].detail[0].mapx}
          mapy={recommendTripDatas.routes[0].detail[0].mapy}
          address={recommendTripDatas.routes[0].detail[0].address}
        />
      </div>

      {/* 날짜별 추천 여행지 */}
      <div className="py-8 px-4">
        {/* Day */}
        <div className="flex gap-x-2">
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
                <div className="flex flex-col items-center mr-8 relative">
                  <div
                    className={`w-8 h-8 rounded-full ${getStepperColor(idx)} text-white flex items-center justify-center`}
                  >
                    {idx + 1}
                  </div>
                  {idx <
                    recommendTripDatas.routes[focusDay].detail.length - 1 && (
                    <div
                      className={`absolute transform -translate-x-1/2 w-0.5 bg-stone-200`}
                      style={{
                        top: "100%",
                        height: "calc(1000%)",
                        zIndex: -1,
                      }}
                    />
                  )}
                </div>
                {/* 여행지 */}
                <div
                  className={`flex flex-col bg-white shadow-xl rounded-lg p-4 cursor-pointer transform transition-transform duration-300 ease-in-out hover:scale-105 flex-grow`}
                >
                  <div className="flex gap-x-4">
                    <Image
                      src={`${dayDetailData.placeImage === "" || dayDetailData.placeImage === null ? "https://cdn.pixabay.com/photo/2019/06/24/16/43/mountain-4296464_640.jpg" : dayDetailData.placeImage}`}
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
          <div className="flex flex-col items-center py-8">
            <div className="flex flex-col justify-center items-center gap-y-2">
              <p className="text-lg font-semibold">
                추천일정이 마음에 드시나요?
              </p>
              <p className="text-xs text-gray-400 text-center">
                추천일정을 TravelRoute에 담아 언제든 확인, 수정할 수 있어요!
              </p>
            </div>
            <div className="w-full flex flex-col gap-y-4 md:flex-row justify-center md:gap-x-4 py-8">
              <button
                className=" bg-stone-200 text-gray-500 rounded-xl px-4 py-2 flex-grow"
                onClick={() => router.push("/recommend-trip")}
              >
                다시 추천받기
              </button>
              <button className=" bg-primary text-white rounded-xl px-4 py-2 flex-grow">
                TravelRoute에 추가하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
