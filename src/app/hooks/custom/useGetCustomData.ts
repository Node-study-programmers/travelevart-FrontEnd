import { get } from "@/lib/api";
import { ITravelResponse } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";

export default function useGetDetailCustomData(travelrouteId: string) {
  return useQuery({
    queryKey: ["customData", travelrouteId],
    queryFn: () =>
      get<ITravelResponse>(
        `${process.env.NEXT_PUBLIC_BASE_URL}/travelroutes/${travelrouteId}/details`,
      ),
    retry: 0,
  });
}
