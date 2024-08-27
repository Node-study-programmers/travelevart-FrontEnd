import { post, del } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useLikePost(postId: string) {
  // 좋아요 추가
  const likeMutation = useMutation({
    mutationFn: () =>
      post(`${process.env.NEXT_PUBLIC_BASE_URL}/posts/${postId}/likes`, null),
  });

  // 좋아요 삭제
  const unlikeMutation = useMutation({
    mutationFn: () =>
      del(`${process.env.NEXT_PUBLIC_BASE_URL}/posts/${postId}/likes`),
  });

  return { likeMutation, unlikeMutation };
}
