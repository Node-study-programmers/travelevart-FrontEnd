import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ITravelRouteState {
  travelRouteName: string;
  travelRouteRange: number;
  startDate: string;
  endDate: string;
  travelRouteId: number | null;
  travelRouteTransport: string;
}

const initialState: ITravelRouteState = {
  travelRouteName: "",
  travelRouteRange: 0,
  startDate: "",
  endDate: "",
  travelRouteId: null,
  travelRouteTransport: "",
};

const travelRouteSlice = createSlice({
  name: "travelRoute",
  initialState,
  reducers: {
    setTravelRoute: (state, action: PayloadAction<ITravelRouteState>) => {
      state.travelRouteName = action.payload.travelRouteName;
      state.travelRouteRange = action.payload.travelRouteRange;
      state.startDate = action.payload.startDate;
      state.endDate = action.payload.endDate;
      state.travelRouteId = action.payload.travelRouteId;
      state.travelRouteTransport = action.payload.travelRouteTransport;
    },
    resetTravelRoute: (state) => {
      state.travelRouteName = "";
      state.travelRouteRange = 0;
      state.startDate = "";
      state.endDate = "";
      state.travelRouteId = null;
      state.travelRouteTransport = "";
    },
  },
});

export const { setTravelRoute, resetTravelRoute } = travelRouteSlice.actions;
export const travelRouteReducer = travelRouteSlice.reducer;
