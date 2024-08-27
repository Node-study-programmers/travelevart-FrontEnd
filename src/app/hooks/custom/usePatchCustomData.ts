import { patch } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";

interface IPatchCustomData {
  travelRouteName: string;
  travelRouteRange: number;
  startDate: string;
  endDate: string;
}

export default function usePatchCustomData(id: string) {
  return useMutation({
    mutationFn: async (data: IPatchCustomData) => {
      const timeout = 5000;

      const res = await Promise.race([
        patch(`/travelroutes/${id}`, {
          travelName: data.travelRouteName,
          travelrouteRange: data.travelRouteRange,
          startDate: data.startDate,
          endDate: data.endDate,
        }),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error("Request timed out")), timeout),
        ),
      ]);

      return res;
    },
  });
}
