"use client";
import { useState } from "react";
import useGetDetailFestival from "@/app/hooks/searchTrip/useGetDetailFestival";
import PageContainer from "@/app/ui/common/PageContainer";
import { differenceInDays, format } from "date-fns";
import { ko } from "date-fns/locale/ko";
import Image from "next/image";
import { FaArrowRight, FaShareAlt } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import Tooltip from "@/app/ui/common/Tooltip";
import { PiEyesFill } from "react-icons/pi";
import FestivalSkeleton from "@/app/ui/travelDestination/skeleton/FestivalSkeleton";
import { toast } from "react-toastify";
import SEO from "@/app/seo/SEO";

export default function FestivalDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { data, isLoading, isError } = useGetDetailFestival(params.id);
  const [showEventInfo, setShowEventInfo] = useState(false);

  if (isLoading) {
    return (
      <PageContainer>
        <FestivalSkeleton />
      </PageContainer>
    );
  }

  if (isError) {
    return <PageContainer>Error loading festival details.</PageContainer>;
  }

  if (!data?.item) {
    return <PageContainer>No festival details available.</PageContainer>;
  }

  const item = data.item;
  const {
    title,
    address,
    image,
    summary,
    detailInfo,
    eventInfo,
    tel,
    eventAddress,
    site,
    price,
    host,
    viewCount,
    endDay,
    startDay,
  } = item;

  const startDate = format(new Date(startDay), "yyyy년 MM월 dd일", {
    locale: ko,
  });
  const endDate = format(new Date(endDay), "yyyy년 MM월 dd일", {
    locale: ko,
  });

  const today = new Date();
  const startDayDate = new Date(startDay);
  const endDayDate = new Date(endDay);
  const daysRemaining = differenceInDays(startDayDate, today) + 1;
  const isOngoing = today >= startDayDate && today <= endDayDate;

  let dDayText;
  if (isOngoing) {
    dDayText = `행사 중`;
  } else if (daysRemaining >= 0) {
    dDayText = `D-Day ${daysRemaining}`;
  } else {
    dDayText = "행사 종료";
  }
  const handleShareLink = () => {
    const currentUrl = window.location.href;

    navigator.clipboard
      .writeText(currentUrl)
      .then(() => {
        toast.info("링크가 클립보드에 복사되었습니다!");
      })
      .catch((error) => {
        toast.error("링크 복사에 실패했습니다.");
      });
  };

  return (
    <>
      <SEO title="SEARCH TRIP" description="여행지 검색을 위한 페이지입니다." />
      <PageContainer>
        <div className="flex flex-col lg:flex-row gap-12 justify-center mb-20 lg:mb-0">
          <div className="relative lg:w-1/2 aspect-[9/14] mt-5 lg:my-10">
            <Image
              fill
              priority
              className="object-cover rounded-2xl"
              alt="Festival Image"
              src={
                image
                  ? image
                  : "https://cdn.pixabay.com/photo/2024/02/21/08/44/woman-8587090_1280.png"
              }
            />
          </div>

          <div className="lg:w-1/2 text-3xl lg:pt-10 pb-10">
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-5">
                <div className="text-4xl font-bold">{title}</div>
                <div className="text-base text-gray-500 flex justify-between mt-5 lg:mt-0">
                  <div className="flex gap-2 items-center">
                    <IoLocationSharp />
                    {address}
                  </div>
                  <div className="flex gap-3 items-start">
                    <Tooltip content="공유하기" direction="top">
                      <button
                        className="flex items-center justify-center w-8 h-8 rounded-full bg-primary border-2 border-primary text-white transition-transform duration-500 hover:rotate-[360deg] hover:bg-white hover:text-primary"
                        aria-label="Share"
                        onClick={handleShareLink}
                      >
                        <FaShareAlt className="text-lg" />
                      </button>
                    </Tooltip>
                    <Tooltip content="조회수" direction="top">
                      <div className="text-center">
                        <button
                          className="flex items-center justify-center w-8 h-8 rounded-full bg-primary border-2 border-primary text-white transition-transform duration-500 hover:rotate-[360deg] hover:bg-white hover:text-primary"
                          aria-label="View"
                        >
                          <PiEyesFill className="text-lg" />
                        </button>
                        <span className="text-lg text-primary">
                          {viewCount}
                        </span>
                      </div>
                    </Tooltip>
                  </div>
                </div>
                <p className="text-sm lg:text-base -mt-5 lg:mt-0 mb-10">
                  {startDate} ~ {endDate}
                </p>
                <div className="flex justify-between items-start lg:mb-5">
                  <div className="text-lg font-semibold bg-primary text-white w-24 text-center py-1 px-2 rounded-xl">
                    {dDayText}
                  </div>

                  <button
                    onClick={() => setShowEventInfo(!showEventInfo)}
                    className="text-lg text-primary flex items-center gap-3"
                  >
                    {showEventInfo ? "상세정보 닫기" : "행사 정보 더보기"}
                    <FaArrowRight
                      className={`transition-transform duration-300 ${showEventInfo ? "rotate-90" : ""}`}
                    />
                  </button>
                </div>

                <div className="relative w-full h-[400px]">
                  <div
                    className={`absolute inset-0 transition-transform duration-500 ${showEventInfo ? "rotate-y-180" : ""}`}
                  >
                    {/* Front Side */}
                    <div
                      className={`w-full h-full ${showEventInfo ? "opacity-0" : "opacity-100"} transition-opacity duration-500`}
                    >
                      <p className="text-3xl mb-10 text-secondary w-full">
                        {summary}
                      </p>
                      <h2 className="text-2xl font-bold">행사 상세 정보</h2>
                      <div className="w-full h-[1px] bg-gray-300 mb-4"></div>
                      <p className="text-lg line-clamp-10">{detailInfo}</p>
                    </div>
                    {/* Back Side */}
                    <div
                      className={`w-full h-full absolute top-0 left-0 rotate-y-180 ${showEventInfo ? "opacity-100" : "opacity-0"} transition-opacity duration-500`}
                    >
                      <div className="flex flex-col gap-4 mt-6">
                        <div className="flex items-center gap-2 text-base text-gray-600">
                          <strong className="font-semibold whitespace-nowrap">
                            전화:
                          </strong>{" "}
                          {tel}
                        </div>
                        <div className="flex items-center gap-2 text-base text-gray-600">
                          <strong className="font-semibold whitespace-nowrap">
                            행사 주소:
                          </strong>{" "}
                          {eventAddress}
                        </div>
                        <div className="flex items-center gap-2 text-base text-gray-600">
                          <strong className="font-semibold whitespace-nowrap">
                            사이트:
                          </strong>
                          <a className="underline" href={site} target="_blank">
                            {site}
                          </a>
                        </div>
                        <div className="flex items-center gap-2 text-base text-gray-600">
                          <strong className="font-semibold whitespace-nowrap">
                            가격:
                          </strong>{" "}
                          {price}
                        </div>
                        <div className="flex items-center gap-2 text-base text-gray-600">
                          <strong className="font-semibold whitespace-nowrap">
                            주최:
                          </strong>{" "}
                          {host}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PageContainer>
    </>
  );
}
