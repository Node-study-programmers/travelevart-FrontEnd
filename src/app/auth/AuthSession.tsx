"use client";
import { LOCAL_STORAGE_KEY } from "@/constant";

import getCurrentUser from "@/util/getCurrentUser";
import { useSession } from "next-auth/react";

import React, { useEffect } from "react";

interface AuthSessionProps {
  children: React.ReactNode;
}

export default function AuthSession({ children }: AuthSessionProps) {
  // const currentUser = await getCurrentUser();
  const { data, status } = useSession();
  useEffect(() => {
    if (status === "authenticated" && data.user) {
      const accessToken = localStorage.getItem(LOCAL_STORAGE_KEY.accessToken);

      localStorage.setItem(
        LOCAL_STORAGE_KEY.refreshToken,
        data.user.refreshToken,
      );
      localStorage.setItem(
        LOCAL_STORAGE_KEY.accessToken,
        accessToken ? accessToken : data.user.accessToken,
      );
    }
  }, [status, data]);

  return <>{children}</>;
}
