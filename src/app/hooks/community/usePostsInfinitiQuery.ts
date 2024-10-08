import { get } from "@/lib/api";
import { TFocusBoard } from "@/lib/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

export interface PostContent {
  id: number;
  postId: number;
  order: number;
  text: string;
  image: string;
}

export interface Post {
  id: number;
  author: string;
  authorId: number;
  profileImg: string;
  title: string;
  views: number;
  commentCount: number;
  created_at: string;
  travelRoute_id: number;
  like: number;
  contents: PostContent[];
  isLiked: boolean;
}

interface PostResponseData {
  posts: Post[];
  currentPage: number;
  totalPage: number;
}

interface IPostInfinitiQueryProps {
  focusBoard: TFocusBoard;
  searchName?: string | null;
}

export default function usePostInfinitiQuery({
  focusBoard,
  searchName = "",
}: IPostInfinitiQueryProps) {
  async function getCommunityPost(
    pageParam: number,
  ): Promise<PostResponseData> {
    try {
      const response = await get<PostResponseData>(
        `${process.env.NEXT_PUBLIC_BASE_URL}/posts?target=${focusBoard}&searchName=${searchName}&page=${pageParam}&pageSize=5`,
      );

      return response;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      throw new Error(`Failed to fetch community post: ${errorMessage}`);
    }
  }

  const { data, hasNextPage, fetchNextPage, status, isFetchingNextPage } =
    useInfiniteQuery<PostResponseData, Error>({
      queryKey: ["communitypost", focusBoard, searchName],
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
    isFetchingNextPage,
  };
}
