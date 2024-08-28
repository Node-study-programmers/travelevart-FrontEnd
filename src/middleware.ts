import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
  const session = await getToken({ req });
  const pathname = req.nextUrl.pathname;
  const method = req.method;

  // 로그인 페이지 유저 정보가 있을때 접근 못하게 함
  if (pathname.startsWith("/auth") && session) {
    const referer = req.headers.get("referer") || "/";

    return NextResponse.redirect(new URL(referer, req.url));
  }

  // 여행지
  if (pathname.includes("/place/?region=&id=") && !session) {
    const referer = req.headers.get("referer") || "/";

    return NextResponse.redirect(new URL(referer, req.url));
  }

  // 찜
  if (pathname.startsWith("/carts") && !session) {
    const referer = req.headers.get("referer") || "/";

    return NextResponse.redirect(new URL(referer, req.url));
  }

  // travel route
  if (pathname.startsWith("/customs") && !session) {
    const referer = req.headers.get("referer") || "/";
    console.log(referer);
    return NextResponse.redirect(new URL(referer, req.url));
  }

  // 일기
  if (pathname.startsWith("/diaries") && !session) {
    const referer = req.headers.get("referer") || "/";

    return NextResponse.redirect(new URL(referer, req.url));
  }

  // 게시글
  // if (pathname.startsWith("/community")) {
  //   if (method !== "GET") {
  //     const referer = req.headers.get("referer") || "/";

  //     return NextResponse.redirect(new URL(referer, req.url));
  //   }
  // }

  // if (pathname.startsWith("/community/") && !session) {
  //   const referer = req.headers.get("referer") || "/";

  //   return NextResponse.redirect(new URL("/", req.url));
  // }

  // 댓글
  if (pathname.startsWith("/comments")) {
    if (method !== "GET") {
      const referer = req.headers.get("referer") || "/";

      return NextResponse.redirect(new URL(referer, req.url));
    }
  }
}
