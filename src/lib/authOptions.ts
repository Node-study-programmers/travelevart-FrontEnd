import { NextAuthOptions } from "next-auth";
import KakaoProvider from "next-auth/providers/kakao";
import CredentialsProvider from "next-auth/providers/credentials";
import { IAuthKaKaoUser, IAuthUser, IUser } from "./types";

// src/lib/authOptions.ts
export const authOptions: NextAuthOptions = {
  providers: [
    KakaoProvider({
      clientId: process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID as string,
      clientSecret: process.env.NEXT_PUBLIC_KAKAO_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "이메일",
          type: "text",
          placeholder: "email@example.com",
        },
        password: {
          label: "비밀번호",
          type: "password",
          placeholder: "비밀번호를 입력해주세요.",
        },
      },
      async authorize(credentials) {
        try {
          console.log("kakao login");
          const res = await fetch(
            "https://7d3e-220-125-131-244.ngrok-free.app/auth/local/login",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                email: credentials?.email,
                password: credentials?.password,
              }),
            },
          );

          if (!res.ok) {
            throw new Error("Failed to fetch");
          }

          const user = await res.json();

          if (user) {
            return user;
          }
        } catch (error) {
          console.log("Authorization Error:", error);
          return error;
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, account }) {
      console.log(account, "account");
      if (account?.provider) token.provider = account?.provider;
      console.log(token, "auth");
      return token;
    },

    async session({ session, token }) {
      if (token.provider === "credentials") {
        session.provider = token.provider as string;
        session.accessToken = token.accessToken as string;
        session.refreshToken = token.refreshToken as string;
        session.user = token.userInfo as IAuthUser;
        console.log("session", session);
        return session;
      } else {
        session.provider = token.provider as string;
        session.user = token.user as IAuthKaKaoUser;
        console.log("kakaotoken", token);
        console.log("kakao", session);
        return session;
      }
    },
  },
};
