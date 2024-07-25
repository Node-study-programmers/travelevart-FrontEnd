"use client";

import { Suspense, useEffect, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { RiCloseFill } from "react-icons/ri";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NotifyDrawer } from "./Drawer";
import { useTypedDispatch, useTypedSelector } from "@/app/hooks/reduxHooks";
import { setUser } from "@/redux/slices/userSlice";
import useLogin from "@/app/hooks/auth/useKaKaoLogin";

// 더미 데이터
const notifications = [
  {
    id: 1,
    title: "알림 1",
    content: "이것은 첫 번째 알림의 내용입니다. 중요하니 확인해주세요.",
    timeAgo: "5분 전",
  },
  {
    id: 2,
    title: "알림 2",
    content: "두 번째 알림이 도착했습니다. 이 알림은 덜 중요할 수 있습니다.",
    timeAgo: "15분 전",
  },
  {
    id: 3,
    title: "알림 3",
    content: "새로운 업데이트가 있습니다. 내용을 확인하세요.",
    timeAgo: "1시간 전",
  },
  {
    id: 4,
    title: "알림 4",
    content: "알림이 추가되었습니다. 추가 정보를 확인하세요.",
    timeAgo: "2시간 전",
  },
  {
    id: 5,
    title: "알림 5",
    content: "중요한 메시지가 도착했습니다. 지금 확인하세요!",
    timeAgo: "5시간 전",
  },
  {
    id: 6,
    title: "알림 6",
    content: "새로운 기능이 추가되었습니다. 확인해보세요!",
    timeAgo: "10분 전",
  },
  {
    id: 7,
    title: "알림 7",
    content: "서비스 점검 안내입니다. 서비스가 잠시 중단됩니다.",
    timeAgo: "30분 전",
  },
];

const menuItems = [
  { path: "/", label: "홈" },
  { path: "/search-trip", label: "여행지검색" },
  { path: "/community", label: "커뮤니티" },
  { path: "/mytrip", label: "여행일기" },
  { path: "/mypage", label: "마이페이지" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [openNotification, setOpenNotification] = useState(false);
  const { user } = useTypedSelector((state) => state.userInfo);
  const { handleLogin, status, handleLogout } = useLogin();
  const dispatch = useTypedDispatch();

  // // session 으로 store 저장
  // useEffect(() => {
  //   if (userData) {
  //     console.log(userData);
  //     // dispatch(setUser(userData.user));
  //   }

  //   console.log(user, "user data");
  // }, [userData, dispatch, user]);

  const handleShowMenu = () => {
    setOpen(!open);
  };
  console.log(status);

  return (
    <nav
      className={`z-[30] fixed bottom-0 left-1/2 -translate-x-1/2 bg-white w-full
flex justify-center items-center rounded-t-xl shadow-[0_0_20px_11px_rgba(40,70,65,0.14)]
transition-all duration-200 ${open ? "h-36" : "h-12"} sm:bottom-[3.5rem]
sm:top-auto sm:left-0 sm:right-0 sm:mx-auto sm:translate-x-0 sm:translate-y-0 sm:rounded-full sm:w-fit sm:h-16`}
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
            {pathname === item.path && (
              <span className="absolute w-full -bottom-2 bg-primary h-1"></span>
            )}
          </li>
        ))}
        <li className="flex justify-center items-center bg-primary rounded-2xl px-7 py-3 text-black cursor-pointer whitespace-nowrap tracking-widest sm:rounded-full relative">
          {/* {userData ? (
            <>
              <div onClick={() => setOpenNotification(true)}>알림</div>
              <div className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 flex justify-center items-center w-7 h-7">
                {notifications.length}
              </div>
            </>
          ) : (
            <div onClick={() => login()}>로그인</div>
          )} */}
          <div onClick={() => handleLogout({ callbackUrl: "/" })}>로그아웃</div>
        </li>
      </ul>
      <NotifyDrawer
        open={openNotification}
        onClose={() => setOpenNotification(false)}
        notifications={notifications}
      />
    </nav>
  );
}
