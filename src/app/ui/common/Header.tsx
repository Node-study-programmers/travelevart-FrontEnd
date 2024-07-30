"use client";

import { logoFont } from "@/font";
import Link from "next/link";
import { IoEarthOutline, IoNotifications } from "react-icons/io5";
import { NotifyDrawer } from "./Drawer";
import { useState } from "react";
import { RxExit } from "react-icons/rx";
import Tooltip from "./Tooltip";
import useLogin from "@/app/hooks/auth/useLogin";

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
  const { handleLogout } = useLogin();
  const [openNotification, setOpenNotification] = useState(false);
  return (
    <div className="border-b-[1px] border-gray-300 w-full sticky z-[48] top-0">
      <div className="max-w-[1280px] w-auto mx-auto flex items-center h-16 min-h-3 justify-between px-3">
        <Link
          href="/"
          className={`${logoFont.className} text-3xl flex items-center gap-2 cursor-pointer`}
        >
          <IoEarthOutline />
          TravelevarT
        </Link>
        <div className="flex gap-3 items-center">
          <div className="relative">
            <div onClick={() => setOpenNotification(true)}>
              <Tooltip direction="bottom" content="알림">
                <IoNotifications className="text-3xl" />
              </Tooltip>
            </div>
            <div className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 flex justify-center items-center w-5 h-5">
              {notifications.length}
            </div>
          </div>
          <div
            className="text-2xl"
            onClick={() => handleLogout({ callbackUrl: "/" })}
          >
            <Tooltip direction="bottom" content="로그아웃">
              <RxExit />
            </Tooltip>
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
