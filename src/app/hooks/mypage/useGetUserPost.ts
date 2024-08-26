import { get } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
export interface UserPost {
  commentCount: number;
  created_at: string;
  id: number;
  likeCount: number;
  title: string;
  travelRoute_id: number | null;
  user_id: number;
  view_count: number;
}

export default function useGetUserPost(userId: number) {
  return useQuery<UserPost[]>({
    queryKey: ["userpost", userId],
    queryFn: () => get(`/posts/mypage/${userId}`),
  });
}
