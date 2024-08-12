"use client";

import React, { useState, useRef, useEffect } from "react";
import { IoLocationSharp } from "react-icons/io5";
import ReviewWithStar from "../travelDestination/ReviewWithStar";
import { TravelItem } from "@/app/hooks/searchTrip/useGetDetailTravelPage";
import useReviewsInfiniteQuery from "@/app/hooks/searchTrip/useReviewInfinitiQuery";
import ReviewContainer from "./ReviewContainer";
import useIntersectionObserver from "@/app/hooks/useIntersectionObserver";
import { ReviewContainerSkeletons } from "../travelDestination/skeleton/DetailPageSkeleton";
import dynamic from "next/dynamic";

interface IDetailContentsProps {
  idx: number;
  data: TravelItem;
}

const DynamicNaverMap = dynamic(
  () => import("@/app/ui/travelDestination/NaverMap"),
  {
    ssr: false,
  },
);

export default function DetailContents({ idx, data }: IDetailContentsProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showMoreButton, setShowMoreButton] = useState(false);
  const {
    reviews,
    hasNextPage,
    fetchNextPage,
    status,
    isFetchingNextPage,
    refetch,
    totalReviews,
  } = useReviewsInfiniteQuery(data.id);

  const contentRef = useRef<HTMLDivElement>(null);

  const moreRef = useIntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        loadMore();
      }
    },
    { threshold: 1 },
  );

  const loadMore = () => {
    if (!hasNextPage) return;

    fetchNextPage();
  };

  useEffect(() => {
    const checkContentHeight = () => {
      if (contentRef.current) {
        const contentHeight = contentRef.current.scrollHeight;
        const visibleHeight = contentRef.current.clientHeight;
        setShowMoreButton(contentHeight > visibleHeight);
      }
    };

    checkContentHeight();
    window.addEventListener("resize", checkContentHeight);
    return () => window.removeEventListener("resize", checkContentHeight);
  }, [data.descreiption, isExpanded]);

  const handleMoreClick = () => {
    setIsExpanded(true);
  };

  return (
    <div>
      {idx === 0 && (
        <div className="flex flex-col gap-20 lg:gap-36">
          <div className="flex flex-col gap-5">
            <h2 className="text-2xl font-semibold">상세정보</h2>
            <div className="relative">
              <div
                ref={contentRef}
                className={`overflow-hidden transition-all duration-300 ${
                  isExpanded ? "max-h-full" : "max-h-60"
                }`}
                style={{
                  WebkitMaskImage:
                    !isExpanded && showMoreButton
                      ? "linear-gradient(180deg, rgba(0, 0, 0, 0.7) calc(100% - 1rem), transparent)"
                      : "none",
                  maskImage:
                    !isExpanded && showMoreButton
                      ? "linear-gradient(180deg, rgba(0, 0, 0, 0.5) calc(100% - 1rem), transparent)"
                      : "none",
                }}
              >
                <p className="text-lg">{data.descreiption}</p>
              </div>
              {!isExpanded && showMoreButton && (
                <button
                  className="mt-2 text-blue-500 underline"
                  onClick={handleMoreClick}
                >
                  더보기
                </button>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <h2 className="text-2xl font-semibold">위치</h2>
            <div className="w-full h-64 lg:h-96 bg-gray-300 rounded-2xl">
              <DynamicNaverMap
                mapx={data.mapx}
                mapy={data.mapy}
                address={data.address}
              />
            </div>
            <div className="pl-2 flex items-center gap-2 text-gray-800">
              <IoLocationSharp />
              {data.address}
            </div>
          </div>
          {/* 리뷰 부분 */}
          <div className="flex flex-col gap-5">
            <h2 className="text-2xl font-semibold">
              리뷰 <span className="text-primary">{totalReviews}</span>
            </h2>
            <div className="text-lg">
              <ReviewWithStar detailId={data.id} refetch={refetch} />
            </div>
            {/* 리뷰목록 보여주기 */}
            <div>
              {reviews.map((review) => (
                <div key={review.id}>
                  <ReviewContainer review={review} />
                </div>
              ))}
              {(status === "pending" || isFetchingNextPage) && (
                <>
                  <ReviewContainerSkeletons />
                </>
              )}
              <div ref={moreRef}></div>
            </div>
          </div>
        </div>
      )}
      {idx === 1 && (
        <div className="flex flex-col gap-20 lg:gap-36">
          <div className="flex flex-col gap-5">
            <h2 className="text-2xl font-semibold">상세정보</h2>
            <div className="relative">
              <div
                ref={contentRef}
                className={`overflow-hidden transition-all duration-300 ${
                  isExpanded ? "max-h-full" : "max-h-60"
                }`}
                style={{
                  WebkitMaskImage:
                    !isExpanded && showMoreButton
                      ? "linear-gradient(180deg, rgba(0, 0, 0, 0.5) calc(100% - 1rem), transparent)"
                      : "none",
                  maskImage:
                    !isExpanded && showMoreButton
                      ? "linear-gradient(180deg, rgba(0, 0, 0, 0.5) calc(100% - 1rem), transparent)"
                      : "none",
                }}
              >
                <p className="text-lg">{data.descreiption}</p>
              </div>
              {!isExpanded && showMoreButton && (
                <button
                  className="mt-2 text-blue-500 underline"
                  onClick={handleMoreClick}
                >
                  더보기
                </button>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <h2 className="text-2xl font-semibold">위치</h2>
            <div className="w-full h-64 lg:h-96 bg-gray-300 rounded-2xl">
              <DynamicNaverMap
                mapx={data.mapx}
                mapy={data.mapy}
                address={data.address}
              />
            </div>
            <div className="pl-2 flex items-center gap-2 text-gray-800">
              <IoLocationSharp />
              {data.address}
            </div>
          </div>
        </div>
      )}
      {idx === 2 && (
        <div className="flex flex-col gap-5">
          <h2 className="text-2xl font-semibold">
            리뷰 <span className="text-primary">{totalReviews}</span>
          </h2>
          <div className="text-lg">
            <ReviewWithStar detailId={data.id} refetch={refetch} />
          </div>
          {/* 리뷰목록 보여주기 */}
          <div>
            {reviews.map((review) => (
              <div key={review.id}>
                <ReviewContainer review={review} />
              </div>
            ))}
            {(status === "pending" || isFetchingNextPage) && (
              <>
                <ReviewContainerSkeletons />
              </>
            )}
            <div ref={moreRef}></div>
          </div>
        </div>
      )}
    </div>
  );
}
