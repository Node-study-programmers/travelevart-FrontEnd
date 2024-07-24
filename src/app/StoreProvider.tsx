"use client";
import { Appstore, AppStore } from "@/redux";
import { useRef } from "react";
import { Provider } from "react-redux";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    storeRef.current = Appstore();
  }
  return <Provider store={storeRef.current}>{children}</Provider>;
}
