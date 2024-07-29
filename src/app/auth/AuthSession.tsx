"use client";

import { LOCAL_STORAGE_KEY } from "@/constant";
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";

interface AuthSessionProps {
  children: React.ReactNode;
}

export default function AuthSession({ children }: AuthSessionProps) {
  const { status, data } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      const tokens = {
        accessToken: data.user.accessToken,
        refreshToken: data.user.refreshToken,
      };
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tokens));
    }
  }, [status, data]);

  return <>{children}</>;
}
