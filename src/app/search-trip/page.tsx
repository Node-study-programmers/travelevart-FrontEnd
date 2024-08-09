"use client";

import useIntersectionObserver from "../hooks/useIntersectionObserver";
import useTravelDestinationInfiniteQuery from "../hooks/searchTrip/useTravelDestinationInfiniteQuery";
import AllTravelDestination from "../ui/travelDestination/AllTravelDestination";
import TravelDestinationSkeletons from "../ui/travelDestination/skeleton/TravelDestinationSkeleton";
import PageContainer from "../ui/common/PageContainer";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import Carousel from "../ui/common/carousel/Carousel";
import useBannerContents from "../hooks/searchTrip/useBannerContents";
import CarouselSkeleton from "../ui/common/carousel/CarouselSkeleton";

const filterGroup = [
  {
    id: "view",
    title: "조회 순",
  },
  {
    id: "review",
    title: "리뷰 순",
  },
  {
    id: "rating",
    title: "별점 순",
  },
  {
    id: "save",
    title: "찜한 순",
  },
];

export default function SearchTripPage() {
  const [isDefaultLoaded, setIsDefaultLoaded] = useState(false);
  const [focusFilter, setFocusFilter] = useState<string>("view");
  const {
    travelDestinationData,
    status,
    isLoading: isTravelDestinationLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    currentPage,
  } = useTravelDestinationInfiniteQuery(focusFilter);

  const { data: bannerData, isLoading: BannerIsLoading } = useBannerContents();

  useEffect(() => {
    // if (currentPage >= 10) setIsDefaultLoaded(true);
  }, [currentPage]);

  const moreRef = useIntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        loadMore();
      }
    },
    { threshold: 0.5 },
  );

  const loadMore = () => {
    if (!hasNextPage) return;

    fetchNextPage();
  };

  const handleMoreTravelDestination = () => {
    // setIsDefaultLoaded(false); // 무한 스크롤 재시작
    fetchNextPage();
  };

  const handleSortingFilter = (filterId: string) => {
    setFocusFilter(filterId);
  };

  return (
    <div>
      {/* 핫한 행사 케러셀 */}
      <div>
        {/* <div className="text-2xl font-bold pb-2 lg:pb-5">인기 행사🔥</div> */}
        {BannerIsLoading ? (
          <CarouselSkeleton />
        ) : (
          <Carousel contents={bannerData?.events || []} />
        )}
      </div>

      <PageContainer>
        <div className="pb-2 lg:pb-5 text-2xl font-bold mt-10">여행지</div>
        <div className="flex justify-end gap-x-2 pb-2">
          {filterGroup.map((filter) => (
            <button
              key={filter.id}
              className={`${
                filter.id === focusFilter ? "text-black" : "text-rgb-primary"
              } text-sm transition-all duration-300 ease-in-out`}
              onClick={() => handleSortingFilter(filter.id)}
            >
              {filter.title}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
          {isTravelDestinationLoading && <TravelDestinationSkeletons />}
          {status === "pending" || isFetchingNextPage ? (
            <TravelDestinationSkeletons />
          ) : (
            <>
              {travelDestinationData.map((destination) => (
                <Link
                  href={`/search-trip/${destination.id}`}
                  key={destination.id}
                >
                  <AllTravelDestination
                    representativeImg={destination.image}
                    address={destination.address}
                    title={destination.title}
                    placeId={destination.id}
                    rating={destination.averageRating}
                  />
                </Link>
              ))}
            </>
          )}
          <div ref={moreRef}></div>
        </div>
        {/* {currentPage >= 10 && hasNextPage && (
          <div className="flex justify-center">
            <button
              className={`text-center bg-primary rounded-full py-4 px-8 text-white cursor-pointer outline-none mb-12`}
              onClick={handleMoreTravelDestination}
            >
              더보기
            </button>
          </div>
        )} */}
      </PageContainer>
    </div>
  );
}
