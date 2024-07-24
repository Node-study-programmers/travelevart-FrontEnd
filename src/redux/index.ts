import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./slices/userSlice";

export const Appstore = () => {
  return configureStore({
    reducer: {
      userInfo: userReducer,
    },
  });
};

export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
export type AppStore = ReturnType<typeof Appstore>;
