import { NextAuthOptions } from "next-auth";
import KakaoProvider from "next-auth/providers/kakao";

export const authOptions: NextAuthOptions = {
  providers: [
    KakaoProvider({
      clientId: process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID as string,
      clientSecret: process.env.NEXT_PUBLIC_KAKAO_CLIENT_SECRET as string,
    }),
  ],

  callbacks: {
    async jwt({ token, account }) {
      if (account?.provider) token.provider = account?.provider;

      return token;
    },

    async session({ session, token }) {
      session.provider = token.provider as string;
      session.uid = token.sub as string;

      return session;
    },
  },
};
