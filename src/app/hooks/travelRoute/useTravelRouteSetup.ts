import { post } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";

// API Format 통일

interface ITravelRouteSetupRequest {
  travelRouteName: string;
  travelRouteRange: number;
  startDate: string;
  endDate: string;
}

interface ITravelRouteSetupResponse {
  userId: number;
  travelName: string;
  travelrouteRange: number;
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
        travelName: data.travelRouteName,
        travelrouteRange: data.travelRouteRange,
        startDate: data.startDate,
        endDate: data.endDate,
      });

      return response;
    },
  });
}
