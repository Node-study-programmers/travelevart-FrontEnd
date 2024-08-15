"use client";

import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { FaArrowUp, FaSearch } from "react-icons/fa";
import { CiSquareMore } from "react-icons/ci";
import { FiPlusSquare } from "react-icons/fi";
import Image from "next/image";
import Select from "../common/Select";
import Tooltip from "../common/Tooltip";
import useTravelDestinationInfiniteQuery from "@/app/hooks/searchTrip/useTravelDestinationInfiniteQuery";
import useGetRegionCode, {
  TregionResponse,
} from "@/app/hooks/searchTrip/useGetRegionCode";
import useGetCartTravelDestintaion, {
  ICartPlace,
} from "@/app/hooks/searchTrip/useGetCartTravelDestination";
import useIntersectionObserver from "@/app/hooks/useIntersectionObserver";
import AllTravelDestination from "../travelDestination/AllTravelDestination";
import CategoryTabs from "../common/CategoryTabs";
import DetailModal from "./Modal/DetailModal";
import { CustomSearchSkeleton } from "./skeleton/Skeletons";
import { ITravelItems } from "@/app/travel-route/custom/[id]/page";
import DropDown from "../common/DropDown";
import { ITravelDetail, ITravelItem } from "@/lib/types";
import { TravelItem } from "@/app/hooks/searchTrip/useGetDetailTravelPage";

const filterGroup = [
  { id: "view", title: "조회 순" },
  { id: "review", title: "리뷰 순" },
  { id: "rating", title: "별점 순" },
  { id: "save", title: "찜한 순" },
];

const categories = [
  { id: 0, title: "검색하기" },
  { id: 1, title: "찜 목록 보기" },
];

interface ICustomSearchProps {
  openSearch: boolean;
  setOpenSearch: Dispatch<SetStateAction<boolean>>;
  items: ITravelItems;
  setItems: (items: ITravelItems) => void;
}

export default function CustomSearch({
  openSearch,
  setOpenSearch,
  items,
  setItems,
}: ICustomSearchProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [focusFilter, setFocusFilter] = useState<string>("view");
  const { data: regionData } = useGetRegionCode();
  const [regionCode, setRegionCode] = useState<number>(0);
  const [searchName, setSearchName] = useState<string>("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [focusTab, setFocusTab] = useState<number>(0);

  const {
    travelDestinationData,
    status,
    isLoading: isTravelDestinationLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useTravelDestinationInfiniteQuery(focusFilter, regionCode, searchName);

  const isLogin = Boolean(localStorage.getItem("accessToken"));
  const { data: cartData, isLoading: cartLoading } =
    useGetCartTravelDestintaion(isLogin);
  const cartItems = cartData?.map((item) => item.place);
  const [showScrollTopButton, setShowScrollTopButton] = useState(false);

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
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (searchInputRef.current) {
      setSearchName(searchInputRef.current.value);
      searchInputRef.current.value = "";
    }
  };

  const handleOpenModal = (id: string) => {
    setSelectedId(id);
    setIsModalOpen(true);
  };

  useEffect(() => {
    const handleScroll = () => {
      const container = document.getElementById("scroll-container");
      if (container) {
        setShowScrollTopButton(container.scrollTop > 300);
      }
    };

    const container = document.getElementById("scroll-container");
    if (container) {
      container.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  const scrollToTop = () => {
    const container = document.getElementById("scroll-container");
    if (container) {
      container.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleAddPlan = (value: string, item: TravelItem | ICartPlace) => {
    // ICartPlace 또는 ITravelItem 타입에 따라 ITravelDetail 객체로 변환
    const newDetail = (item: ICartPlace | TravelItem): ITravelDetail => {
      if ("placeId" in item) {
        // ICartPlace 타입인 경우
        return {
          detailtravelId: 0, // 기본값, 필요시 적절한 값으로 대체
          travelrouteId: 0, // 기본값, 필요시 적절한 값으로 대체
          placeId: item.placeId, // ICartPlace의 경우 placeId 사용
          routeIndex: 0, // 기본값, 필요시 적절한 값으로 대체
          contents: "", // 비워두기
          regionId: 0, // 기본값, 필요시 적절한 값으로 대체
          address: item.address,
          placeTitle: item.title,
          placeImage: item.image,
          mapLink: null, // 비워두기
        };
      } else {
        // ITravelItem 타입인 경우
        return {
          detailtravelId: 0, // 기본값, 필요시 적절한 값으로 대체
          travelrouteId: 0, // 기본값, 필요시 적절한 값으로 대체
          placeId: item.id, // ITravelItem의 경우 id를 placeId로 사용
          routeIndex: 0, // 기본값, 필요시 적절한 값으로 대체
          contents: "", // 비워두기
          regionId: 0, // 기본값, 필요시 적절한 값으로 대체
          address: item.address,
          placeTitle: item.title,
          placeImage: item.image,
          mapLink: null, // 비워두기
        };
      }
    };

    // item이 ICartPlace 타입인지 확인하여 details를 생성
    const details =
      "placeId" in item
        ? [newDetail(item as ICartPlace)] // ICartPlace의 경우 details를 생성
        : [newDetail(item as TravelItem)]; // ITravelItem의 경우 details를 생성

    // 새 ITravelItem 객체 생성
    const newItem: ITravelItem = {
      date: value,
      details,
    };

    setItems((prevItems: ITravelItems) => {
      if (prevItems.hasOwnProperty(value)) {
        // 날짜가 이미 존재하면 알림 표시
        const existingDetails = prevItems[value];
        const newDetailIds = newItem.details.map((detail) => detail.placeId);
        const duplicate = existingDetails.some((detail) =>
          newDetailIds.includes(detail.placeId),
        );

        if (duplicate) {
          alert("이미 존재하는 일정입니다.");
          return prevItems; // 변경하지 않고 기존 상태 반환
        }

        // 기존 항목이 존재하는 경우, 업데이트
        return {
          ...prevItems,
          [value]: [...prevItems[value], ...newItem.details],
        };
      } else {
        // 새로운 항목을 추가
        return {
          ...prevItems,
          [value]: newItem.details,
        };
      }
    });
    setOpenSearch(false);
  };

  return (
    <>
      <div
        id="scroll-container"
        className={`fixed top-0 right-0 w-full lg:w-1/3 border-2 border-gray-300 p-2 overflow-y-auto h-screen bg-white
      transition-transform duration-300 ease-in-out transform ${openSearch ? "translate-x-0" : "translate-x-full"} lg:translate-x-0
      lg:relative
    `}
      >
        <div className="flex justify-end lg:hidden">
          <button
            onClick={() => setOpenSearch(false)}
            className="lg:hidden outline flex gap-2 items-center bg-primary text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-primary 
        focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 transition duration-300"
          >
            x
          </button>
        </div>
        <CategoryTabs
          focusTab={focusTab}
          setFocusTab={setFocusTab}
          categories={categories}
        />
        {focusTab === 0 ? (
          <>
            <div
              style={{ transition: "top 0.3s ease" }}
              className="w-full lg:h-16 flex transition-all duration-1000 h-[56px] mb-10 mt-10"
            >
              <Select
                className="h-full"
                placeholder="검색할 지역 선택"
                label="지역"
                defaultValue={regionData?.regions[0]?.region || ""}
                items={regionData?.regions.map((item) => item.region) || []}
                onChange={(selectedRegion) => {
                  const selectedRegionData = regionData?.regions.find(
                    (region: TregionResponse) =>
                      region.region === selectedRegion,
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
                  className="flex-grow h-full outline-none text-base lg:text-lg p-4"
                  placeholder="여행지를 검색하세요!"
                  ref={searchInputRef}
                />
                <button
                  className="bg-primary h-full w-12 rounded-full flex items-center justify-center text-white text-xl lg:text-2xl cursor-pointer"
                  type="submit"
                >
                  <FaSearch />
                </button>
              </form>
            </div>
            <div className="flex justify-end gap-x-2 pb-2 px-5 lg:px-10">
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
            <div className="flex flex-col gap-0 h-full px-5 lg:px-10 py-10">
              {isTravelDestinationLoading && <CustomSearchSkeleton />}
              {status === "pending" || isFetchingNextPage ? (
                <CustomSearchSkeleton />
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
                        items={items}
                        destination={destination}
                        handleAddPlan={handleAddPlan}
                      />
                    </div>
                  ))}
                  <div ref={moreRef}></div>
                </>
              )}
            </div>
          </>
        ) : (
          <div className="flex flex-col px-5 lg:px-10 mt-10">
            {cartItems?.map((item) => (
              <div
                className="h-full border-b-[1px] border-gray-300 flex justify-between items-center py-5"
                key={item.placeId}
              >
                <div className="flex items-center flex-grow gap-3">
                  <div className="relative">
                    <Image
                      src={
                        item.image ||
                        "https://cdn.pixabay.com/photo/2024/02/21/08/44/woman-8587090_1280.png"
                      }
                      alt={item.title}
                      width={50}
                      height={50}
                      className="rounded-xl object-cover w-24 h-20"
                    />
                  </div>
                  <div className="flex flex-col py-2 gap-y-1 w-full overflow-x-auto text-ellipsis">
                    <div className="flex items-center text-sm">
                      <div className="w-3/5">
                        <p className="line-clamp-2">
                          {item.title.split("(")[0]}
                        </p>
                      </div>
                    </div>
                    <p className="text-rgb-primary text-xs line-clamp-1">
                      {item.address.split("(")[0]}
                    </p>
                  </div>
                </div>
                <div className="flex gap-1 items-center">
                  <Tooltip content="상세보기" direction="bottom">
                    <button
                      onClick={() => handleOpenModal(String(item.placeId))}
                      className="text-secondary lg:px-2 py-2 text-2xl"
                    >
                      <CiSquareMore />
                    </button>
                  </Tooltip>

                  <DropDown
                    contents={Object.keys(items)}
                    handleClickValue={(selectedValue) =>
                      handleAddPlan(selectedValue, item)
                    }
                  >
                    <button className="text-primary lg:px-2 py-2 text-2xl">
                      <FiPlusSquare />
                    </button>
                  </DropDown>
                </div>
              </div>
            ))}
          </div>
        )}
        {selectedId && (
          <DetailModal
            id={selectedId}
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        )}
      </div>
      {showScrollTopButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-4 right-4 bg-primary text-white p-3 rounded-full shadow-lg transition-transform transform hover:scale-105"
          aria-label="Scroll to top"
        >
          <FaArrowUp />
        </button>
      )}
    </>
  );
}
