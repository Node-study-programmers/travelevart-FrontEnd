import { get } from "@/lib/api";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

interface ITravelDestination {
  id: number;
  address: string;
  image: string | "";
  title: string;
  mapx: string;
  mapy: string;
  averageRating: string | null;
}

interface ITravelDestinationResponse {
  items: ITravelDestination[];
  currentPage: number;
  totalPage: number;
}

export default function useTravelDestinationInfiniteQuery(focusFilter: string) {
  const [currentPage, setCurrentPage] = useState(1);

  async function getTravelDestination(pageParam: number) {
    try {
      const response = await get<ITravelDestinationResponse>(
        `${process.env.NEXT_PUBLIC_BASE_URL}/places/search?&page=${pageParam}&sort=${focusFilter}`,
        {
          headers: {
            "ngrok-skip-browser-warning": "true",
          },
        },
      );

      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "error";

      throw new Error(`Failed to get travel destination : ${errorMessage}`);
    }
  }

  const {
    data,
    status,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<ITravelDestinationResponse>({
    queryKey: ["travelDestination", focusFilter],
    queryFn: ({ pageParam = 1 }) => getTravelDestination(Number(pageParam)),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.currentPage < lastPage.totalPage) {
        return lastPage.currentPage + 1;
      }
      return undefined;
    },
    retry: 0,
  });

  useEffect(() => {
    if (data) {
      const lastPage = data.pages[data.pages.length - 1];

      setCurrentPage(lastPage.currentPage);
    }
  }, [data]);

  const travelDestinationData = data?.pages.flatMap((page) => page.items) ?? [];

  return {
    getTravelDestination,
    travelDestinationData,
    status,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    currentPage,
  };
}
