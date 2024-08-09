import { del, post } from "@/lib/api";
import { useMutation, useQuery } from "@tanstack/react-query";

export default function useCartTravelDestination() {
  // 찜하기
  const addCartMutation = useMutation({
    mutationFn: (placeId: number) =>
      post(`/carts/${placeId}`, {
        headers: {
          "ngrok-skip-browser-warning": "true",
        },
      }),
  });

  // 찜하기 삭제
  const deleteCartMutation = useMutation({
    mutationFn: (placeId: number) =>
      del(`/carts/${placeId}`, {
        headers: {
          "ngrok-skip-browser-warning": "true",
        },
      }),
  });

  return { addCartMutation, deleteCartMutation };
}
