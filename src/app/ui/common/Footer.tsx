"use client";

import { IoEarthOutline } from "react-icons/io5";
import FeedbackForm from "./FeedbackForm";
import { usePathname } from "next/navigation";
import { logoFont } from "@/app/asset/fonts/fonts";

export default function Footer() {
  const pathname = usePathname();
  if (
    pathname.startsWith("/travel-route/custom") ||
    pathname.startsWith("/recommend-trip")
  ) {
    return null;
  }
  return (
    <footer className="relative w-full flex justify-center bg-slate-200 text-rgb-primary pt-6 pb-5">
      <div className="max-w-[1280px] w-full mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-between border-b-[1px] border-gray-500 mx-10 lg:mx-0">
          <div className="w-full text-4xl text-rgb-primary text-center lg:text-left flex flex-col">
            <div className="flex items-center gap-2 justify-center lg:justify-start">
              <IoEarthOutline />
              <h1 className={`${logoFont.className} tracking-wider`}>
                TravelevarT
              </h1>
            </div>
            <span className="text-[0.65rem] text-rgb-secondary">
              TravelevarT는 여행지 추천 기반 커뮤니티 서비스입니다.
            </span>
          </div>
          <div className="w-full max-w-96 my-4">
            <div className="flex justify-center lg:justify-start text-green-700 font-semibold">
              소원수리함 📮
            </div>
            <FeedbackForm />
          </div>
        </div>
        <div className="flex justify-between items-center mt-6 mb-16 mx-10 lg:mx-0">
          <span className="text-[0.65rem] text-rgb-secondary">
            ⓒ 2024. TravelevarT. All rights reserved
          </span>
        </div>
      </div>
    </footer>
  );
}
