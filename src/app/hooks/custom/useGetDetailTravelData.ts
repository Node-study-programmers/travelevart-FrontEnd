import { get } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { ITravelCustomPostData } from "./usePostCustomData";

export default function useGetDetailTravelData(id: number) {
  return useQuery<ITravelCustomPostData>({
    queryKey: ["detailTravelData", id],
    queryFn: () => get<ITravelCustomPostData>(`/travelroutes/${id}/details`),
  });
}
