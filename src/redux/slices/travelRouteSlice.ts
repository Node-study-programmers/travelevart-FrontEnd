import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ITravelRouteState {
  travelRouteName: string;
  travelRouteRange: number;
  startDate: string;
  endDate: string;
  travelRouteId: number | null;
}

const initialState: ITravelRouteState = {
  travelRouteName: "",
  travelRouteRange: 0,
  startDate: "",
  endDate: "",
  travelRouteId: null,
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
    },
    resetTravelRoute: (state) => {
      state.travelRouteName = "";
      state.travelRouteRange = 0;
      state.startDate = "";
      state.endDate = "";
      state.travelRouteId = null;
    },
  },
});

export const { setTravelRoute, resetTravelRoute } = travelRouteSlice.actions;
export const travelRouteReducer = travelRouteSlice.reducer;
