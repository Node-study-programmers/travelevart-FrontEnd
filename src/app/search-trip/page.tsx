"use client";

import useIntersectionObserver from "../hooks/useIntersectionObserver";
import useTravelDestinationInfiniteQuery from "../hooks/searchTrip/useTravelDestinationInfiniteQuery";
import AllTravelDestination from "../ui/travelDestination/AllTravelDestination";
import TravelDestinationSkeletons from "../ui/travelDestination/skeleton/TravelDestinationSkeleton";
import PageContainer from "../ui/common/PageContainer";
import Link from "next/link";
import React, {
  FormEvent,
  KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import Carousel from "../ui/common/carousel/Carousel";
import useBannerContents from "../hooks/searchTrip/useBannerContents";
import CarouselSkeleton from "../ui/common/carousel/CarouselSkeleton";
import TravelSearchBar from "../ui/travelDestination/TravelSearchBar";
import Select from "../ui/common/Select";
import { FaSearch } from "react-icons/fa";
import useGetRegionCode, {
  TregionResponse,
} from "../hooks/searchTrip/useGetRegionCode";
import { useRouter } from "next/navigation";

const filterGroup = [
  { id: "view", title: "조회 순" },
  { id: "review", title: "리뷰 순" },
  { id: "rating", title: "별점 순" },
  { id: "save", title: "찜한 순" },
];

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

  const [regionCode, setRegionCode] = useState<number>(0);
  const [searchName, setSearchName] = useState<string>("");
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();

  const {
    travelDestinationData,
    status,
    isLoading: isTravelDestinationLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    currentPage,
  } = useTravelDestinationInfiniteQuery(focusFilter, regionCode, searchName);

  const { data: bannerData, isLoading: BannerIsLoading } = useBannerContents();
  const { data: regionData, isLoading } = useGetRegionCode();

  useEffect(() => {
    // URL 쿼리 파라미터 업데이트
    const query = new URLSearchParams({
      filter: focusFilter,
      regionCode: regionCode.toString(),
      searchName,
    }).toString();
    router.replace(`?${query}`);
  }, [focusFilter, regionCode, searchName, router]);

  useEffect(() => {
    setSearchName("");
  }, [regionCode]);

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


  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (searchInputRef.current) {
      setSearchName(searchInputRef?.current?.value);
      searchInputRef.current.value = "";
    }
  };

  return (
    <div>
      {/* 핫한 행사 케러셀 */}
      <div className="relative mb-20">
        {BannerIsLoading ? (
          <CarouselSkeleton />
        ) : (
          <Carousel contents={bannerData?.events || []} />
        )}

        <div
          className="absolute left-1/2 w-full max-w-3xl z-[99] 
    h-16 -bottom-8 -translate-x-1/2 flex items-center"
        >
          <Select
            className="h-full"
            placeholder="지역을 선택하세요."
            label="지역"
            items={regionData?.regions.map((item) => item.region) || []}
            onChange={(selectedRegion) => {
              const selectedRegionData = regionData?.regions.find(
                (region: TregionResponse) => region.region === selectedRegion,
              );
              if (selectedRegionData) {
                setRegionCode(selectedRegionData.id);
              }
            }}
          />
          <form className="flex-grow h-full flex" onSubmit={handleSearch}>
            <input
              className="flex-grow shadow-xl h-full outline-none text-xl p-4"
              placeholder="여행지를 검색하세요!"
              ref={searchInputRef}
            />
            <button
              className="bg-primary h-full w-16 rounded-r-2xl flex items-center justify-center 
      text-white text-3xl cursor-pointer shadow-xl"
              onClick={handleSearch}
              type="submit"
            >
              <FaSearch />
            </button>
          </form>
        </div>
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
        {/* 검색 결과 보여주는 부분 컴포넌트 빼서 querystring으로 데이터 패칭하기 , notfound 까지  */}

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
