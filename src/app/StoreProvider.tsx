"use client";
import { Appstore, AppStore } from "@/redux";
import { useRef } from "react";
import { Provider } from "react-redux";
import persistStore from "redux-persist/es/persistStore";
import { PersistGate } from "redux-persist/integration/react";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore>(Appstore());
  if (!storeRef.current) {
    storeRef.current = Appstore();
  }
  const persistor = persistStore(storeRef.current); // persistor 초기화

  return (
    <Provider store={storeRef.current}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}
