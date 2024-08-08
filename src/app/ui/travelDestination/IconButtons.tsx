"use client";
import { FaRegHeart, FaShareAlt } from "react-icons/fa";
import { PiEyesFill } from "react-icons/pi";
import Tooltip from "../common/Tooltip";

interface IconButtonsProps {
  likeNum: number;
  view: number;
  isSaved: boolean;
}

export default function IconButtons({
  likeNum,
  view,
  isSaved,
}: IconButtonsProps) {
  const handleShareLink = () => {
    const currentUrl = window.location.href;

    navigator.clipboard
      .writeText(currentUrl)
      .then(() => {
        alert("링크가 클립보드에 복사되었습니다!");
      })
      .catch((error) => {
        console.error("링크 복사 실패", error);
        alert("링크 복사에 실패했습니다.");
      });

    // 토스트 추가하기
  };
  return (
    <div className="flex justify-center items-start gap-6 mb-4">
      <Tooltip content="공유하기" direction="top">
        <button
          className="flex items-center justify-center w-8 h-8 rounded-full bg-primary border-2 border-primary text-white transition-transform duration-500 hover:rotate-[360deg] hover:bg-white hover:text-primary"
          aria-label="Share"
          onClick={handleShareLink}
        >
          <FaShareAlt className="text-lg" />
        </button>
      </Tooltip>
      <Tooltip content="찜하기" direction="top">
        <div className="text-center">
          <button
            className={`flex items-center justify-center w-8 h-8 rounded-full
               ${!isSaved ? "bg-primary hover:bg-white hover:text-primary  border-primary" : "bg-red-500 hover:bg-white hover:text-red-500 border-red-500"}  border-2 text-white 
               transition-transform duration-500 hover:rotate-[360deg]`}
            aria-label="Like"
          >
            <FaRegHeart className="text-lg" />
          </button>
          <span
            className={`text-lg ${!isSaved ? "text-primary" : "text-red-500"}`}
          >
            {likeNum}
          </span>
        </div>
      </Tooltip>
      <Tooltip content="조회수" direction="top">
        <div className="text-center">
          <button
            className="flex items-center justify-center w-8 h-8 rounded-full bg-primary border-2 border-primary text-white transition-transform duration-500 hover:rotate-[360deg] hover:bg-white hover:text-primary"
            aria-label="View"
          >
            <PiEyesFill className="text-lg" />
          </button>
          <span className="text-lg text-primary">{view}</span>
        </div>
      </Tooltip>
    </div>
  );
}
