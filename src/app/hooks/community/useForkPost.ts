import { post } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";

export default function useForkPost(postId: number) {
  return useMutation({
    mutationFn: async () => {
      try {
        await post(`/travelroutes/fork/${postId}`);
      } catch (error) {
        throw error;
      }
    },
  });
}
