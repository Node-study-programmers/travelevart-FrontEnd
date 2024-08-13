import { post } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";

interface ITravelRouteSetupRequest {
  travelRouteName: string;
  travelRouteRange: number;
  startDate: string;
  endDate: string;
}

interface ITravelRouteSetupResponse {
  user_id: number;
  travel_name: string;
  travelroute_range: number;
  startDate: string;
  endDate: string;
  id: number;
}

interface ITravelRouteSetupRequestError {
  message: string;
}

export default function useTravelRouteSetup() {
  return useMutation<
    ITravelRouteSetupResponse,
    ITravelRouteSetupRequestError,
    ITravelRouteSetupRequest
  >({
    mutationFn: async (data: ITravelRouteSetupRequest) => {
      const response = await post<ITravelRouteSetupResponse>("/travelroutes", {
        travel_name: data.travelRouteName,
        travelroute_range: data.travelRouteRange,
        start_date: data.startDate,
        end_date: data.endDate,
      });

      return response;
    },
  });
}
