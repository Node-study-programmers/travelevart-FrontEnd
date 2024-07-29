import { NextAuthOptions } from "next-auth";
import KakaoProvider from "next-auth/providers/kakao";
import CredentialsProvider from "next-auth/providers/credentials";
import { IAuthKaKaoUser, IAuthUser } from "./types";
import { User as NextAuthUser } from "next-auth";
import axios from "axios";

// 기존 `User` 타입을 확장하여 필요한 속성을 추가
interface CustomUser extends NextAuthUser {
  accessToken?: string;
  refreshToken?: string;
  userInfo?: IAuthUser; // `IAuthUser`는 사용자 정보 타입
  provider: string;
}

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,
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
          const res = await fetch(
            "https://a951-220-125-131-244.ngrok-free.app/auth/local/login",
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
          console.log(user, "useruser");
          if (user) return user;
        } catch (error) {
          console.log("Authorization Error:", error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    async jwt({ token, account, user }) {
      if (account?.provider === "kakao") {
        // 서버 저장용
        try {
          const response = await axios.post(
            "https://a951-220-125-131-244.ngrok-free.app/auth/kakao/login",
            {
              uid: token.sub,
              user: {
                image: token.picture,
                name: token.name,
              },
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            },
          );

          token.user = {
            userId: token.sub,
            name: token.name,
            profileImg: token.picture,
            provider: account.provider,
            accessToken: account.access_token,
            refreshToken: account.refresh_token,
          };
          delete token.name;
          delete token.picture;
          delete token.sub;
        } catch (err) {
          console.log(err);
        }
      } else if (user) {
        token.user = {
          userId: (user as CustomUser).userInfo?.userId,
          name: (user as CustomUser).userInfo?.name,
          email: (user as CustomUser).userInfo?.email,
          profileImg: (user as CustomUser).userInfo?.profileImg,
          provider: (user as CustomUser).provider,
          accessToken: (user as CustomUser).accessToken,
          refreshToken: (user as CustomUser).refreshToken,
        };
      }

      return token;
    },
    async session({ session, token }) {
      if ((token.user as IAuthKaKaoUser).provider === "kakao") {
        session.user = token.user as IAuthKaKaoUser;
        session.accessToken = token.accessToken as string;
        session.refreshToken = token.refreshToken as string;
      } else {
        session.user = token.user as IAuthUser;

        delete token.userInfo;
      }

      return session;
    },
  },
};
