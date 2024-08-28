import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
  const session = await getToken({ req });
  const pathname = req.nextUrl.pathname;
  const method = req.method;

  // 로그인 페이지: 세션이 있는 사용자는 로그인 페이지 접근 불가
  if (pathname.startsWith("/auth") && session) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // 여행지: 세션이 없는 사용자는 특정 여행지 페이지 접근 불가
  if (pathname.includes("/place/") && !session) {
    return NextResponse.redirect(new URL("/login", req.url)); // 로그인 페이지로 리다이렉션
  }

  // 찜 목록: 세션이 없는 사용자는 찜 페이지 접근 불가
  if (pathname.startsWith("/carts") && !session) {
    return NextResponse.redirect(new URL("/login", req.url)); // 로그인 페이지로 리다이렉션
  }

  // 여행 경로 커스터마이즈: 세션이 없는 사용자는 접근 불가
  if (pathname.startsWith("/customs") && !session) {
    return NextResponse.redirect(new URL("/login", req.url)); // 로그인 페이지로 리다이렉션
  }

  // 댓글: GET 이외의 요청을 차단
  if (pathname.startsWith("/comments") && method !== "GET") {
    return NextResponse.redirect(new URL("/", req.url)); // 홈 페이지로 리다이렉션
  }

  return NextResponse.next(); // 기본적으로 요청을 계속 진행
}
