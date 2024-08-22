import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./slices/userSlice";
import { travelRouteReducer } from "./slices/travelRouteSlice";
import storage from "redux-persist/lib/storage";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import { recommendTripReducer } from "./slices/recommendTripSlice";

const persistConfig = {
  key: "travelRouteSetupOption",
  storage, // localStorage,
  whitelist: ["travelRoute", "recommendTrip"], // travelRoute, recommendTrip 저장
};

const reducers = combineReducers({
  userInfo: userReducer,
  travelRoute: travelRouteReducer,
  recommendTrip: recommendTripReducer,
});

const persistedReducer = persistReducer(persistConfig, reducers);

export const Appstore = () => {
  return configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          // persist 액션 직렬화 검사에서 제외
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  });
};

export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
export type AppStore = ReturnType<typeof Appstore>;
