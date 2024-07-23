"use client";

import { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { RiCloseFill } from "react-icons/ri";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NotifyDrawer } from "./Drawer";
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
  {
    id: 8,
    title: "알림 8",
    content: "계정 보안 업데이트가 있습니다. 즉시 확인하세요.",
    timeAgo: "45분 전",
  },
  {
    id: 9,
    title: "알림 9",
    content: "이벤트가 시작되었습니다. 참여해보세요!",
    timeAgo: "1시간 전",
  },
  {
    id: 10,
    title: "알림 10",
    content: "시스템 오류가 발생했습니다. 문제를 확인 중입니다.",
    timeAgo: "2시간 전",
  },
  {
    id: 11,
    title: "알림 11",
    content: "회원님을 위한 특별 할인 쿠폰이 도착했습니다.",
    timeAgo: "3시간 전",
  },
  {
    id: 12,
    title: "알림 12",
    content: "새로운 콘텐츠가 업데이트되었습니다. 확인해보세요.",
    timeAgo: "4시간 전",
  },
  {
    id: 13,
    title: "알림 13",
    content: "시스템 유지보수가 예정되어 있습니다. 참고해 주세요.",
    timeAgo: "5시간 전",
  },
  {
    id: 14,
    title: "알림 14",
    content: "신규 기능 출시 안내입니다. 자세한 내용을 확인하세요.",
    timeAgo: "6시간 전",
  },
  {
    id: 15,
    title: "알림 15",
    content: "사용자 리뷰가 도착했습니다. 확인해보세요.",
    timeAgo: "7시간 전",
  },
];
export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [openNotification, setOpenNotification] = useState(false);
  const handleShowMenu = () => {
    setOpen(!open);
  };

  return (
    <nav
      className={`z-[30] fixed bottom-0 left-1/2 -translate-x-1/2 bg-white w-full 
        flex justify-center items-center rounded-t-xl shadow-[0_0_20px_11px_rgba(40,70,65,0.14)] 
        transition-all duration-200 ${open ? "h-36" : "h-16"} sm:bottom-[3.5rem] 
        sm:top-auto sm:left-0 sm:right-0 sm:mx-auto sm:translate-x-0 sm:translate-y-0 sm:rounded-full sm:w-fit sm:h-16`}
    >
      <div
        className={`absolute flex justify-center bottom-10 bg-primary rounded-full p-2 transition-transform duration-200 ${
          open ? "-translate-y-20" : "translate-y-0"
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
        <li
          className={`flex justify-center items-center cursor-pointer whitespace-nowrap tracking-widest`}
        >
          <Link
            href="/"
            className={` ${pathname === "/" && "border-b-4 border-primary"}`}
          >
            홈
          </Link>
        </li>
        <li
          className={`flex justify-center items-center cursor-pointer whitespace-nowrap tracking-widest`}
        >
          <Link
            href="/search-trip"
            className={` ${pathname === "/search-trip" && "border-b-4 border-primary"}`}
          >
            여행지검색
          </Link>
        </li>
        <li
          className={`flex justify-center items-center cursor-pointer whitespace-nowrap tracking-widest`}
        >
          <Link
            href="/community"
            className={` ${pathname === "/community" && "border-b-4 border-primary"}`}
          >
            커뮤니티
          </Link>
        </li>
        <li
          className={`flex justify-center items-center cursor-pointer whitespace-nowrap tracking-widest`}
        >
          <Link
            href="/mytrip"
            className={` ${pathname === "/mytrip" && "border-b-4 border-primary"}`}
          >
            여행일기
          </Link>
        </li>
        <li
          className={`flex justify-center items-center cursor-pointer whitespace-nowrap tracking-widest`}
        >
          <Link
            href="/mypage"
            className={` ${pathname === "/mypage" && "border-b-4 border-primary"}`}
          >
            마이페이지
          </Link>
        </li>
        <li className="flex justify-center items-center bg-primary rounded-2xl px-7 py-3 text-black cursor-pointer whitespace-nowrap tracking-widest sm:rounded-full">
          <div onClick={() => setOpenNotification(true)}>알림</div>
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
