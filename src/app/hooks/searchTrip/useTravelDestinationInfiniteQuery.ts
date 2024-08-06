import { get } from "@/lib/api";
import { useInfiniteQuery } from "@tanstack/react-query";

interface ITravelDestination {
  placeId: number;
  address: string;
  image: string | "";
  title: string;
  mapx: string;
  mapy: string;
}

interface ITravelDestinationResponse {
  items: ITravelDestination[];
  currentPage: number;
  totalPage: number;
}

export default function useTravelDestinationInfiniteQuery() {
  async function getTravelDestination(pageParam: number) {
    try {
      const response = await get<ITravelDestinationResponse>(
        `${process.env.NEXT_PUBLIC_BASE_URL}/places/search?&page=${pageParam}&limit=9`,
      );

      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "error";

      throw new Error(`Failed to get travel destination : ${errorMessage}`);
    }
  }

  const { data, hasNextPage, fetchNextPage } =
    useInfiniteQuery<ITravelDestinationResponse>({
      queryKey: ["travelDestination"],
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

  const travelDestinationData = data?.pages.flatMap((page) => page.items) ?? [];

  return { travelDestinationData, hasNextPage, fetchNextPage };
}
