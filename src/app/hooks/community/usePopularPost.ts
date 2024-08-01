import { get } from "@/lib/api";
import { TFocusBoard } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";

interface IPopularPostProps {
  focusBoard: TFocusBoard;
}

interface PopularPost {
  id: number;
  author: string;
  profileImg: string;
  title: string;
  contents: string;
}

interface PopularPostResponse {
  popularPosts: PopularPost[];
}

export default function usePopularPost({ focusBoard }: IPopularPostProps) {
  async function fetchPopularPosts(
    focusBoard: TFocusBoard,
  ): Promise<PopularPostResponse> {
    try {
      const response = await get<PopularPostResponse>(
        `${process.env.NEXT_PUBLIC_BASE_URL}/posts/popular?target=${focusBoard}`,
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
      console.error("Failed to fetch popular posts", error);
      throw new Error(`Failed to fetch popular posts: ${errorMessage}`);
    }
  }
  return useQuery<PopularPostResponse, Error>({
    queryKey: ["popularPosts", focusBoard],
    queryFn: () => fetchPopularPosts(focusBoard),
    retry: 0,
  });
}
