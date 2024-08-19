import { get } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export interface IDetail {
  address: string;
  contents: string | null;
  detailtravelId: number;
  mapLink: string | null;
  placeId: number;
  placeTitle: string;
  placeImage: string;
  regionId: number;
  routeIndex: number;
  travelrouteId: number;
}

export interface ITravelDetail {
  date: string;
  details: IDetail[];
}

export interface ITravelCustomGetData {
  transportOption: "public" | "car";
  items: ITravelDetail[];
}
export default function useGetDetailTravelData(id: number) {
  return useQuery<ITravelCustomGetData>({
    queryKey: ["detailTravelData", id],
    queryFn: () => get<ITravelCustomGetData>(`/travelroutes/${id}/details`),
  });
}
