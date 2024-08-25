import { useMutation } from "@tanstack/react-query";
import { post } from "@/lib/api";

export interface IDetailRoute {
  placeId: number;
  routeIndex: number;
  day: number;
  date: string;
  estimatedTime: string | null;
  distance: string | null;
  playTime: string;
  mapLink: string | null;
}

interface ISaveRecommendTripRequest {
  travelName: string;
  travelrouteRange: number;
  transportOption: "대중교통" | "자차";
  detailRoute: IDetailRoute[];
}

interface ISaveRecommendTripResponse {
  message: string;
}

interface ISaveRecommendTripResquestError extends ISaveRecommendTripResponse {}

export default function useSaveRecommendTrip() {
  return useMutation<
    ISaveRecommendTripResponse,
    ISaveRecommendTripResquestError,
    ISaveRecommendTripRequest
  >({
    mutationFn: async (data: ISaveRecommendTripRequest) => {
      const response = await post<ISaveRecommendTripResponse>(
        `/travelroutes/recommendations`,
        {
          travelName: data.travelName,
          travelrouteRange: data.travelrouteRange,
          transportOption: data.transportOption,
          detailRoute: data.detailRoute,
        },
      );

      return response;
    },
  });
}
