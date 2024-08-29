import { get } from "@/lib/api";
import { useInfiniteQuery } from "@tanstack/react-query";

export interface ReviewUser {
  id: number;
  profileImg: string;
  userName: string;
}

export interface IReview {
  id: number;
  placeId: number;
  ratingValue: number;
  review: string;
  createdAt: string;
  user: ReviewUser;
}

export interface ReviewResponseData {
  totalReviews: number;
  reviews: IReview[];
  currentPage: number;
  totalPage: number;
}

export default function useReviewsInfiniteQuery(placeId: number) {
  async function fetchReviews(pageParam: number): Promise<ReviewResponseData> {
    try {
      const response = await get<ReviewResponseData>(
        `${process.env.NEXT_PUBLIC_BASE_URL}/places/${placeId}/rating?page=${pageParam}&limit=3`,
      );
      return response;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      throw new Error(`Failed to fetch reviews: ${errorMessage}`);
    }
  }

  const {
    data,
    hasNextPage,
    fetchNextPage,
    status,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery<ReviewResponseData, Error>({
    queryKey: ["reviews", placeId],
    queryFn: ({ pageParam = 1 }) => fetchReviews(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { currentPage, totalPage } = lastPage;
      if (currentPage < totalPage) {
        return currentPage + 1;
      }
      return undefined;
    },
    retry: 0, // 실패 시 재시도 횟수
  });

  const reviews = data?.pages.flatMap((page) => page.reviews) ?? [];

  const totalReviews = data?.pages[0]?.totalReviews ?? 0;

  return {
    reviews,
    totalReviews,
    hasNextPage,
    fetchNextPage,
    status,
    isFetchingNextPage,
    refetch,
  };
}
