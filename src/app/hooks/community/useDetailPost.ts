import { IContent } from "@/app/ui/community/CommunityPopularPost";
import { get } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

interface DetailPost {
  id: number;
  author: string;
  profileImg: string;
  title: string;
  views: number;
  commentCount: number;
  created_at: string;
  travelRoute_id: boolean;
  like: number;
  contents: IContent[];
  isLiked: boolean;
  authorId: number;
}

export default function useDetailPost(id: string) {
  return useQuery<DetailPost>({
    queryKey: ["detailPost", id],
    queryFn: () =>
      get<DetailPost>(`${process.env.NEXT_PUBLIC_BASE_URL}/posts/${id}`),
  });
}
