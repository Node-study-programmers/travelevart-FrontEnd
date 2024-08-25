import { patch } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";

interface IPatchCustomData {
  travelName: string;
  travelrouteRange: number;
  startDate: string;
  endDate: string;
}

export default function usePatchCustomData(id: string) {
  return useMutation({
    mutationFn: async ({ reqData }: { reqData: IPatchCustomData }) => {
      const timeout = 5000; // 5초 제한 시간 설정

      const res = await Promise.race([
        patch(`/travelroutes/${id}`, reqData),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error("Request timed out")), timeout),
        ),
      ]);

      return res;
    },
  });
}
