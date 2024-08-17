import { del } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// 삭제를 위한 mutation 훅
export function useDeleteTravelRoute() {
  return useMutation({
    mutationFn: (id: number) =>
      del(`${process.env.NEXT_PUBLIC_BASE_URL}/travelroutes/${id}`),
  });
}
