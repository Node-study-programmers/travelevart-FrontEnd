import { get } from "@/lib/api";
import { TFocusBoard } from "@/lib/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

export interface Post {
  id: number;
  author: string;
  profileImg: string;
  title: string;
  views: number;
  commentCount: number;
  created_at: string;
  travelRoute_id: number;
  like: number;
  contents: string;
}

interface PostResponseData {
  posts: Post[];
  currentPage: number;
  totalPage: number;
}

interface IPostInfinitiQueryProps {
  focusBoard: TFocusBoard;
}

//https://95b7-118-176-13-136.ngrok-free.app
export default function usePostInfinitiQuery({
  focusBoard,
}: IPostInfinitiQueryProps) {
  async function getCommunityPost(
    pageParam: number,
  ): Promise<PostResponseData> {
    try {
      const response = await get<PostResponseData>(
        `${process.env.NEXT_PUBLIC_BASE_URL}/posts?target=${focusBoard}&searchName=&page=${pageParam}&pageSize=3`,
        {
          headers: {
            "ngrok-skip-browser-warning": "true",
          },
        },
      );
      return response;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      console.error("Failed to fetch community post", error);
      throw new Error(`Failed to fetch community post: ${errorMessage}`);
    }
  }

  const { data, hasNextPage, fetchNextPage, status } = useInfiniteQuery<
    PostResponseData,
    Error
  >({
    queryKey: ["communitypost", focusBoard],
    queryFn: ({ pageParam = 1 }) => getCommunityPost(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const page = lastPage?.currentPage;
      if (page) {
        const totalPages = lastPage?.totalPage;
        if (totalPages === page) return null;
        return page + 1;
      }
      return false;
    },
    retry: 0,
  });

  const postData = data?.pages.flatMap((page) => page.posts) ?? [];

  return {
    postData,
    hasNextPage,
    fetchNextPage,
    status,
  };
}
