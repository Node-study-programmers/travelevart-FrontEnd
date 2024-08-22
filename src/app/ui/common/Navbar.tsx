"use client";

import { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { RiCloseFill } from "react-icons/ri";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signIn } from "next-auth/react";
import useLogin from "@/app/hooks/auth/useLogin";

const menuItems = [
  { path: "/", label: "홈" },
  { path: "/search-trip", label: "여행지검색" },
  { path: "/community/travel", label: "커뮤니티" },
  { path: "/mytrip", label: "여행일기" },
  { path: "/recommend-trip", label: "여행지추천" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { status, userData } = useLogin();

  const handleShowMenu = () => {
    setOpen(!open);
  };

  // 특정 경로에서 Navbar를 숨김
  if (
    pathname.startsWith("/travel-route/") ||
    pathname === "/recommend-trip" ||
    pathname === "/recommend-trip/setup"
  ) {
    return null;
  }

  return (
    <nav
      className={`z-[30] fixed bottom-0 left-1/2 -translate-x-1/2 bg-white w-full
        flex justify-center items-center rounded-t-xl shadow-[0_0_20px_11px_rgba(40,70,65,0.14)]
        transition-all duration-200 ${open ? "h-36" : "h-12"} sm:bottom-[3.5rem] 
        ${status === "loading" ? "hidden" : "sm:animate-fade-in sm:flex"}      
        sm:top-auto sm:left-0 sm:right-0 sm:mx-auto 
        sm:translate-x-0 sm:translate-y-0 sm:rounded-full sm:w-fit sm:h-16`}
    >
      <div
        className={`absolute flex justify-center bottom-6 bg-primary rounded-full p-2 transition-transform duration-200 ${
          open ? "-translate-y-24" : "translate-y-0"
        } sm:hidden`}
        onClick={handleShowMenu}
      >
        {!open ? (
          <RxHamburgerMenu className="w-10 h-10 text-white" />
        ) : (
          <RiCloseFill className="w-10 h-10 text-white" />
        )}
      </div>
      <ul
        className={`${open ? "grid" : "hidden"} grid-cols-3 gap-3 w-[80%] font-extralight text-base 
        sm:flex sm:justify-center sm:items-center sm:pl-7 sm:pr-2 sm:gap-5`}
      >
        {menuItems.map((item) => (
          <li
            key={item.path}
            className={`flex justify-center items-center cursor-pointer whitespace-nowrap tracking-widest relative`}
          >
            <Link href={item.path}>{item.label}</Link>
            {(pathname === item.path ||
              (item.path !== "/" && pathname.startsWith(item.path))) && (
              <span className="absolute w-full -bottom-2 bg-primary h-1"></span>
            )}
          </li>
        ))}
        <li className="flex justify-center items-center bg-primary rounded-2xl cursor-pointer whitespace-nowrap tracking-widest sm:rounded-full relative text-white">
          {userData ? (
            <Link href="/mypage" className="px-7 py-3">
              마이페이지
            </Link>
          ) : (
            <div onClick={() => signIn()} className="px-7 py-3">
              로그인
            </div>
          )}
        </li>
      </ul>
    </nav>
  );
}
