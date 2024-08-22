import { IRecommendTripResponse } from "@/app/hooks/recommendTrip/useGetRecommendTrip";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IRouteDetail {
  placeId: number;
  address: string;
  placeTitle: string;
  routeIndex: number;
  placeImage: string;
  mapx: number;
  mapy: number;
  day: number;
  distance: string | null;
  estimatedTime: string | null;
  playTime: string;
  mapLink: string | null;
}

interface IRoute {
  day: string;
  detail: IRouteDetail[];
}

interface IRecommendTrip {
  transportOption: "대중교통" | "자차";
  routes: IRoute[];
}

const initialState: IRecommendTrip = {
  transportOption: "대중교통",
  routes: [
    {
      day: new Date().toISOString().split("T")[0],
      detail: [
        {
          placeId: 0,
          address: "",
          placeTitle: "",
          routeIndex: 0,
          placeImage: "",
          mapx: 0,
          mapy: 0,
          day: 0,
          distance: "",
          estimatedTime: "",
          playTime: "",
          mapLink: "",
        },
      ],
    },
  ],
};

const recommendTripSlice = createSlice({
  name: "recommedTrip",
  initialState,
  reducers: {
    setRecommendTrip: (
      state,
      action: PayloadAction<IRecommendTripResponse>,
    ) => {
      state.transportOption = action.payload.transportOption;
      state.routes = action.payload.routes;
    },
  },
});

export const { setRecommendTrip } = recommendTripSlice.actions;
export const recommendTripReducer = recommendTripSlice.reducer;
