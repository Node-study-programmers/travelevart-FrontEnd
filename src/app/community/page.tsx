"use client";

import Image from "next/image";
import dummyimg from "../asset/img/mainBackground.jpg";
import { PiNotePencil } from "react-icons/pi";
import CategoryTabs from "../ui/common/CategoryTabs";
import { useEffect, useState } from "react";

const categories = [
  { id: 0, title: "여행 게시판" },
  { id: 1, title: "자유 게시판" },
];

export default function CommunityPage() {
  const [focusTab, setFocusTab] = useState<number>(0);
  useEffect(() => {
    console.log(focusTab);
  }, [focusTab]);
  return (
    <div className="max-w-screen-lg h-auto w-auto relative py-[8px] px-[16px] mx-auto">
      <CategoryTabs
        categories={categories}
        focusTab={focusTab}
        setFocusTab={setFocusTab}
      />
      <div className="grid grid-cols-1 lg:grid-cols-[7fr_3fr] mt-5">
        {/* 글 목록 보여줄곳 */}
        <div className="relative lg:pr-12 flex flex-col gap-5 py-8">
          {/* 글 쓰는 페이지 이동 */}
          <button className="flex items-center justify-between w-full gap-5 px-5 py-3 shadow-xl rounded-xl">
            <Image
              src={dummyimg}
              alt="hi"
              className="w-10 h-10 rounded-full border-[1px] border-transparent"
            />
            <span className="text-left break-all flex-grow overflow-hidden text-lg text-gray-500">
              나의 여행을 공유해보세요!
            </span>
            <PiNotePencil className="text-2xl text-gray-500" />
          </button>
          {/* post보여주는 곳 */}
          <div></div>
        </div>

        {/* 인기글 목록 보여줄곳 */}
        <div className="hidden lg:block sticky pl-12 border-l-[1px] border-gray-300">
          asd
        </div>
      </div>
    </div>
  );
}
