import { get } from "@/lib/api";
import { useInfiniteQuery } from "@tanstack/react-query";

interface Comment {
  id: number;
  author: string;
  profileImg: string;
  comment: string;
  created_at: string;
  authorId: number;
}

export interface CommentsResponseData {
  comments: Comment[];
  currentPage: number;
  totalPage: number;
}

export default function useGetCommentsInfinite(postId: string) {
  async function fetchComments(
    pageParam: number,
  ): Promise<CommentsResponseData> {
    try {
      const response = await get<CommentsResponseData>(
        `${process.env.NEXT_PUBLIC_BASE_URL}/comments/${postId}?page=${pageParam}`,
      );
      return response;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "error";

      throw new Error(`Failed to fetch comments: ${errorMessage}`);
    }
  }

  const {
    data,
    hasNextPage,
    fetchNextPage,
    status,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery<CommentsResponseData, Error>({
    queryKey: ["comments", postId],
    queryFn: ({ pageParam = 1 }) => fetchComments(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const page = lastPage?.currentPage;
      const totalPages = lastPage?.totalPage;
      if (page && totalPages && page < totalPages) {
        return page + 1;
      }
      return null;
    },
    retry: 0,
  });

  const comments = data?.pages.flatMap((page) => page.comments) ?? [];

  return {
    comments,
    hasNextPage,
    fetchNextPage,
    status,
    isFetchingNextPage,
    refetch,
  };
}
