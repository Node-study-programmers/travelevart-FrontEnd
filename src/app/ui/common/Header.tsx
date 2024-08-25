"use client";

import Link from "next/link";
import { IoEarthOutline } from "react-icons/io5";
import { NotifyDrawer } from "./Drawer";
import { useState } from "react";
import Tooltip from "./Tooltip";
import useLogin from "@/app/hooks/auth/useLogin";
import { IoMdNotificationsOutline } from "react-icons/io";
import { MdLogin, MdLogout } from "react-icons/md";
import { signIn } from "next-auth/react";
import { logoFont } from "@/app/asset/fonts/fonts";

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

export default function Header() {
  const { handleLogout, status } = useLogin();
  const [openNotification, setOpenNotification] = useState(false);
  return (
    <div className="border-b-[1px] border-gray-300 w-full sticky z-[100] top-0 bg-white">
      <div className="max-w-[1280px] w-auto mx-auto flex items-center h-16 min-h-3 justify-between px-5">
        <Link
          href="/"
          className={`${logoFont.className} text-3xl flex items-center gap-2 cursor-pointer text-blue-500`}
        >
          <IoEarthOutline className="text-blue-500" />
          TravelevarT
        </Link>
        <div className="flex gap-5 items-center">
          <div className="relative">
            <div onClick={() => setOpenNotification(true)}>
              <Tooltip direction="bottom" content="알림">
                <IoMdNotificationsOutline className="text-3xl" />
              </Tooltip>
            </div>
            {notifications && (
              <div className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-1 flex justify-center items-center w-4 h-4 text-xs">
                {notifications.length}
              </div>
            )}
          </div>
          <div className="text-2xl">
            {status === "authenticated" && (
              <Tooltip direction="bottom" content="로그아웃">
                <MdLogout onClick={() => handleLogout({ callbackUrl: "/" })} />
              </Tooltip>
            )}
            {status === "unauthenticated" && (
              <Tooltip direction="bottom" content="로그인">
                <MdLogin onClick={() => signIn()} />
              </Tooltip>
            )}
          </div>
        </div>
      </div>
      <NotifyDrawer
        open={openNotification}
        onClose={() => setOpenNotification(false)}
        notifications={notifications}
      />
    </div>
  );
}
