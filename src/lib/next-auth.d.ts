import NextAuth, { DefaultSession } from "next-auth";
import { IAuthUser } from "./types";

declare module "next-auth" {
  interface Session {
    provider: string;
    user: IAuthUser;
    accessToken: string;
    uid: string;
  }
}
