"use client";

import useIntersectionObserver from "../hooks/useIntersectionObserver";
import useTravelDestinationInfiniteQuery from "../hooks/searchTrip/useTravelDestinationInfiniteQuery";
import AllTravelDestination from "../ui/travelDestination/AllTravelDestination";
import TravelDestinationSkeletons from "../ui/travelDestination/skeleton/TravelDestinationSkeleton";
import PageContainer from "../ui/common/PageContainer";
import Link from "next/link";
import React, { FormEvent, useRef, useState, useEffect } from "react";
import Carousel from "../ui/common/carousel/Carousel";
import useBannerContents from "../hooks/searchTrip/useBannerContents";
import CarouselSkeleton from "../ui/common/carousel/CarouselSkeleton";
import Select from "../ui/common/Select";
import { FaSearch } from "react-icons/fa";
import useGetRegionCode, {
  TregionResponse,
} from "../hooks/searchTrip/useGetRegionCode";
import { useRouter } from "next/navigation";
import NotFoundTravelDestiantion from "../ui/travelDestination/NotFoundTravelDestination";
import TravelRegionBanner from "../ui/travelDestination/TravelRegionBanner";

const filterGroup = [
  { id: "view", title: "조회 순" },
  { id: "review", title: "리뷰 순" },
  { id: "rating", title: "별점 순" },
  { id: "save", title: "찜한 순" },
];

export default function SearchTripPage() {
  const [isDefaultLoadedPage, setIsDefaultLoadedPage] = useState(false); // 자동 무한스크롤 페이지
  const [focusFilter, setFocusFilter] = useState<string>("view");
  const [regionCode, setRegionCode] = useState<number>(0);
  const [searchName, setSearchName] = useState<string>("");
  const [regionImage, setRegionImage] = useState<string | null>(null);
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();

  const {
    travelDestinationData,
    status,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    refetch,
    currentPage,
  } = useTravelDestinationInfiniteQuery(focusFilter, regionCode, searchName);

  const { data: bannerData, isLoading: BannerIsLoading } = useBannerContents();
  const { data: regionData } = useGetRegionCode();

  useEffect(() => {
    if (currentPage >= 10) setIsDefaultLoadedPage(true); // 10페이지까지 자동 무한스크롤
  }, [currentPage]);

  // URL 쿼리 파라미터 업데이트
  useEffect(() => {
    const query = new URLSearchParams({
      filter: focusFilter,
      regionCode: regionCode.toString(),
      searchName,
    }).toString();
    router.replace(`?${query}`);
  }, [focusFilter, regionCode, searchName, router]);

  const moreRef = useIntersectionObserver(
    ([entry]) => {
      if (
        entry.isIntersecting &&
        hasNextPage &&
        !isFetchingNextPage &&
        !isDefaultLoadedPage
      ) {
        fetchNextPage(); // 다음 페이지 불러오기
      }
    },
    { threshold: 1 },
  );

  const handleSortingFilter = (filterId: string) => {
    setFocusFilter(filterId);
  };

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (searchInputRef.current) {
      setSearchName(searchInputRef.current.value || "");
      searchInputRef.current.value = ""; // 검색 후 입력값 초기화
    }
  };

  // 검색 결과 없을 떄 첫 페이지 렌더링
  const handleResetSearchTripPage = () => {
    setSearchName("");
    setRegionCode(0);
    refetch();
  };

  const handleMoreTravelDestination = () => {
    setIsDefaultLoadedPage(false); // 무한 스크롤 재시작
    fetchNextPage();
  };

  return (
    <div>
      {/* 전체 지역 선택 시 핫한 행사 케러셀 그 외 지역 이미지 배너 */}
      <div className="relative mb-10">
        {regionCode ? (
          <TravelRegionBanner regionCode={regionCode} />
        ) : BannerIsLoading ? (
          <CarouselSkeleton />
        ) : (
          <Carousel contents={bannerData?.events || []} />
        )}
      </div>

      <PageContainer className="relative">
        <div
          style={{ transition: "top 0.3s ease" }}
          className="sticky w-full max-w-2xl z-[101] lg:h-16 flex -top-0 mx-auto transition-all duration-1000 bg-white h-[56px]"
        >
          <Select
            className="h-full"
            placeholder="검색할 지역 선택"
            label="지역"
            defaultValue={regionData?.regions[0]?.region || ""}
            items={regionData?.regions.map((item) => item.region) || []}
            onChange={(selectedRegion) => {
              const selectedRegionData = regionData?.regions.find(
                (region: TregionResponse) => region.region === selectedRegion,
              );
              if (selectedRegionData) {
                setRegionCode(selectedRegionData.id);
                setSearchName(searchInputRef.current?.value || "");
                searchInputRef.current!.value = ""; // 입력 필드 초기화
              }
            }}
          />
          <form
            className="flex-grow h-full flex shadow-xl p-2 rounded-r-full"
            onSubmit={handleSearch}
          >
            <input
              className="flex-grow h-full outline-none text-base lg:text-lg"
              placeholder="여행지를 검색하세요!"
              ref={searchInputRef}
            />
            <button
              className="bg-primary h-full w-12 rounded-full flex items-center justify-center text-white text-xl lg:text-2xl cursor-pointer"
              onClick={handleSearch}
              type="submit"
            >
              <FaSearch />
            </button>
          </form>
        </div>
        <div className="pb-2 lg:pb-5 text-2xl font-bold mt-10">여행지</div>
        {status === "success" && !travelDestinationData.length ? (
          <NotFoundTravelDestiantion
            reloadTravelDestination={handleResetSearchTripPage}
          /> // 검색결과 없을 떄
        ) : (
          <>
            <div className="flex justify-end gap-x-2 pb-2">
              {filterGroup.map((filter) => (
                <button
                  key={filter.id}
                  className={`${
                    filter.id === focusFilter
                      ? "text-black"
                      : "text-rgb-primary"
                  } text-sm transition-all duration-300 ease-in-out`}
                  onClick={() => handleSortingFilter(filter.id)}
                >
                  {filter.title}
                </button>
              ))}
            </div>

            {/* 검색 결과 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
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
              <div ref={moreRef} />
            </div>
            {currentPage >= 10 && hasNextPage && (
              <div className="flex justify-center">
                <button
                  className={`text-center bg-primary rounded-full py-4 px-8 text-white cursor-pointer outline-none mb-12`}
                  onClick={handleMoreTravelDestination}
                >
                  더보기
                </button>
              </div>
            )}

            {/* 다음 페이지 로딩 스켈레톤 */}
            {(status === "pending" || isFetchingNextPage) && (
              <TravelDestinationSkeletons />
            )}
          </>
        )}
      </PageContainer>
    </div>
  );
}
