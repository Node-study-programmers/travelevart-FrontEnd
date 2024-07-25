import { NextAuthOptions } from "next-auth";
import KakaoProvider from "next-auth/providers/kakao";
import CredentialsProvider from "next-auth/providers/credentials";
import { IAuthKaKaoUser, IAuthUser, IUser } from "./types";
import { User as NextAuthUser } from "next-auth";

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
            "https://f771-220-125-131-244.ngrok-free.app/auth/local/login",
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
        token.user = {
          name: token.name,
          profileImg: token.picture,
          userId: token.sub,
          provider: account.provider,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
        };
        delete token.name;
        delete token.picture;
        delete token.sub;
      } else if (user) {
        token.user = {
          accessToken: (user as CustomUser).accessToken,
          refreshToken: (user as CustomUser).refreshToken,
          email: (user as CustomUser).userInfo?.email,
          name: (user as CustomUser).userInfo?.name,
          profileImg: (user as CustomUser).userInfo?.profileImg,
          userId: (user as CustomUser).userInfo?.userId,
          provider: (user as CustomUser).provider,
        };
      }

      return token;
    },
    async session({ session, token }) {
      console.log(token, "local token!!!!!!!!");

      if ((token.user as IAuthKaKaoUser).provider === "kakao") {
        session.user = token.user as IAuthKaKaoUser;
        session.accessToken = token.accessToken as string;
        session.refreshToken = token.refreshToken as string;
      } else {
        // session.provider = token.provider as string;
        // session.accessToken = token.accessToken as string;
        // session.refreshToken = token.refreshToken as string;
        session.user = token.user as IAuthUser;

        delete token.userInfo;
      }

      // console.log(session);

      return session;
    },
  },
};
