"use client";
import useTravelDestinationInfiniteQuery from "@/app/hooks/searchTrip/useTravelDestinationInfiniteQuery";
import { FormEvent, useRef, useState } from "react";
import Select from "../common/Select";
import useGetRegionCode, {
  TregionResponse,
} from "@/app/hooks/searchTrip/useGetRegionCode";
import { FaSearch } from "react-icons/fa";
import Link from "next/link";
import useIntersectionObserver from "@/app/hooks/useIntersectionObserver";
import AllTravelDestination from "../travelDestination/AllTravelDestination";
import CategoryTabs from "../common/CategoryTabs";
import useGetCartTravelDestintaion from "@/app/hooks/searchTrip/useGetCartTravelDestination";
import Image from "next/image";

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

const categories = [
  { id: 0, title: "검색하기" },
  { id: 1, title: "찜 목록 보기" },
];

export default function CustomSearch() {
  const [focusFilter, setFocusFilter] = useState<string>("view");
  const { data: regionData, isLoading } = useGetRegionCode();
  const [regionCode, setRegionCode] = useState<number>(0);
  const [searchName, setSearchName] = useState<string>("");
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const [focusTab, setFocusTab] = useState<number>(0);
  const {
    travelDestinationData,
    status,
    isLoading: isTravelDestinationLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    currentPage,
  } = useTravelDestinationInfiniteQuery(focusFilter, regionCode, searchName);
  const isLogin = localStorage.getItem("accessToken");
  const {
    data: cartData,
    isLoading: cartLoading,
    refetch,
  } = useGetCartTravelDestintaion(Boolean(isLogin));
  const cartItems = cartData?.map((item) => item.place);
  const handleSortingFilter = (filterId: string) => {
    setFocusFilter(filterId);
  };
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

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (searchInputRef.current) {
      setSearchName(searchInputRef?.current?.value);
      searchInputRef.current.value = "";
    }
  };
  return (
    <div className="lg:w-1/2 border-x-2 border-gray-300 mt-5">
      <CategoryTabs
        focusTab={focusTab}
        setFocusTab={setFocusTab}
        categories={categories}
      />
      {focusTab === 0 ? (
        <>
          <div
            style={{ transition: "top 0.3s ease" }}
            className="w-full 
lg:h-16 flex transition-all duration-1000 h-[56px] mb-10"
          >
            <Select
              className="h-full"
              placeholder="검색할 지역 선택"
              label="지역"
              defaultValue={regionData?.regions[0].region}
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
            <form
              className="flex-grow h-full flex shadow-xl p-2 rounded-r-full"
              onSubmit={handleSearch}
            >
              <input
                className="flex-grow h-full outline-none text-base lg:text-lg "
                placeholder="여행지를 검색하세요!"
                ref={searchInputRef}
              />
              <button
                className="bg-primary h-full w-12 rounded-full flex items-center justify-center 
text-white text-xl lg:text-2xl cursor-pointer"
                onClick={handleSearch}
                type="submit"
              >
                <FaSearch />
              </button>
            </form>
          </div>
          <div className="flex justify-end gap-x-2 pb-2 px-10">
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

          <div className="flex flex-col gap-12 h-full overflow-scroll px-10">
            {isTravelDestinationLoading && <p>Loading</p>}
            {status === "pending" || isFetchingNextPage ? (
              <p>Loading</p>
            ) : (
              <>
                {travelDestinationData.map((destination) => (
                  <div key={destination.id}>
                    <AllTravelDestination
                      isInCustom
                      representativeImg={destination.image}
                      address={destination.address}
                      title={destination.title}
                      placeId={destination.id}
                      rating={destination.averageRating}
                    />
                  </div>
                ))}
              </>
            )}
            <div ref={moreRef}></div>
          </div>
        </>
      ) : (
        <div className="flex flex-col gap-12 px-10 mt-10">
          {cartItems?.map((item) => (
            <div
              className="h-full border-b-[1px] border-gray-300"
              key={item.placeId}
            >
              <div className="relative">
                <Image
                  src={
                    item.image ||
                    "https://cdn.pixabay.com/photo/2024/02/21/08/44/woman-8587090_1280.png"
                  }
                  alt={item.title}
                  width={50}
                  height={50}
                  className="rounded-full object-cover w-12 h-12"
                />
              </div>
              <div className="flex flex-col py-2 gap-y-1">
                {/* 여행지 & 별점 */}
                <div className="flex justify-between items-center sm text-sm">
                  <div className="w-3/5">{item.title.split("(")[0]}</div>
                </div>
                {/* 주소 */}
                <p className="text-rgb-primary text-xs">
                  {item.address.split("(")[0]}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
