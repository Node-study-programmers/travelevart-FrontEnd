import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./slices/userSlice";
import { travelRouteReducer } from "./slices/travelRouteSlice";

export const Appstore = () => {
  return configureStore({
    reducer: {
      userInfo: userReducer,
      travelRoute: travelRouteReducer,
    },
  });
};

export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
export type AppStore = ReturnType<typeof Appstore>;
