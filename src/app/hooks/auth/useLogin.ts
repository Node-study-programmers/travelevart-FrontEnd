import { LOCAL_STORAGE_KEY } from "@/constant";
import { TLoginWay } from "@/lib/types";
import {
  signIn,
  SignInOptions,
  signOut,
  SignOutParams,
  useSession,
} from "next-auth/react";

export default function useLogin() {
  const { status, data: userData } = useSession();

  const handleLogout = (options?: SignOutParams) => {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    signOut(options);
  };

  const handleLogin = (loginWay: TLoginWay, options?: SignInOptions) =>
    signIn(loginWay, options);

  return {
    handleLogout,
    handleLogin,
    status,
    userData,
  };
}
