import { del, post } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";

export default function useCartTravelDestination() {
  // 찜하기
  const addCartMutation = useMutation({
    mutationFn: (placeId: number) => post(`/carts/${placeId}`),
  });

  // 찜하기 삭제
  const deleteCartMutation = useMutation({
    mutationFn: (placeId: number) => del(`/carts/${placeId}`),
  });

  return { addCartMutation, deleteCartMutation };
}
