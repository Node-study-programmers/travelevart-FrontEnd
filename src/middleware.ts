import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
  const session = await getToken({ req });
  const pathname = req.nextUrl.pathname;

  // 로그인 페이지 유저 정보가 있을때 접근 못하게 함
  if (pathname.startsWith("/auth") && session) {
    const referer = req.headers.get("referer") || "/";
    console.log("Redirecting to referer:", referer);
    return NextResponse.redirect(new URL(referer, req.url));
  }
}
