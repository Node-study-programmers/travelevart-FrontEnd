import { post } from "@/lib/api";
import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
} from "@tanstack/react-query";

interface AddReviewRequest {
  ratingValue: number;
  review: string;
}

interface AddReviewResponse {
  success: boolean;
  message: string;
}

export default function useAddReview(detailId: number) {
  return useMutation<AddReviewResponse, unknown, AddReviewRequest>({
    mutationFn: async ({ ratingValue, review }) => {
      const res = await post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/places/${detailId}/rating`,
        { ratingValue, review },
      );
      return res;
    },
  });
}
