import NextAuth, { DefaultSession } from "next-auth";
import { IAuthKaKaoUser, IAuthUser } from "./types";

declare module "next-auth" {
  interface Session {
    provider: string;
    user: IAuthUser | IAuthKaKaoUser;
    accessToken?: string;
    refreshToken?: string;
    uid: string;
    email: string;
    profileImg: string;
    userId: number;
  }
}
