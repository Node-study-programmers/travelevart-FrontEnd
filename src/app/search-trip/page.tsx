"use client";

import useIntersectionObserver from "../hooks/useIntersectionObserver";
import useTravelDestinationInfiniteQuery from "../hooks/searchTrip/useTravelDestinationInfiniteQuery";
import AllTravelDestination from "../ui/travelDestination/AllTravelDestination";

export default function SearchTripPage() {
  const { travelDestinationData, hasNextPage, fetchNextPage } =
    useTravelDestinationInfiniteQuery();

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

  return (
    <div className="max-w-screen-lg h-auto w-auto relative py-[8px] px-[16px] mx-auto mt-12">
      <form className="flex flex-col border-4 border-primary">
        <input type="text" placeholder="국내 여행지를 검색해보세요" />
        <button>검색하기</button>
      </form>
      {/* 처음에 전체 여행지 보여주기 */}
      <div className="mt-20">
        <div className="text-center text-2xl py-4">대한민국 내 여행지</div>
        <div className="grid grid-cols-3 gap-4">
          {travelDestinationData.map((destination) => (
            <AllTravelDestination
              key={destination.placeId}
              representativeImg={destination.image}
              title={destination.title}
            />
          ))}
          <div ref={moreRef}></div>
        </div>
      </div>
    </div>
  );
}
