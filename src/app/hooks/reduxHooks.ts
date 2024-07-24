import { AppDispatch, RootState, AppStore } from "@/redux";
import { TypedUseSelectorHook, useSelector, useStore } from "react-redux";
import { useDispatch } from "react-redux";

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useTypedDispatch = () => useDispatch<AppDispatch>();
export const useAppStore: () => AppStore = useStore;
