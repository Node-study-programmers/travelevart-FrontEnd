import { get } from "@/lib/api";
import { IGetFestivalResponse } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";

export default function useGetDetailFestival(festivalId: string) {
  return useQuery<IGetFestivalResponse>({
    queryKey: ["festival", festivalId],
    queryFn: () =>
      get<IGetFestivalResponse>(
        `${process.env.NEXT_PUBLIC_BASE_URL}/events/${festivalId}`,
      ),
  });
}
