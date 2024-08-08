import React from "react";

export default function CarouselSkeleton() {
  return (
    <div className="relative w-full group overflow-hidden">
      {/* 슬라이드 부분 */}
      <div className="flex animate-pulse">
        {/* 개별 스켈레톤 콘텐츠 */}
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className="w-full flex-shrink-0 h-64 bg-gray-300 rounded-md mr-2"
          ></div>
        ))}
      </div>

      {/* 이전 버튼 */}
      <button
        className="flex justify-center items-center border-0 w-[40px] h-[40px] bg-gray-500 rounded-full text-2xl text-white cursor-not-allowed absolute top-1/2 left-4 -translate-y-1/2 opacity-50"
        disabled
      >
        {/* 화살표 아이콘 */}
      </button>
      {/* 다음 버튼 */}
      <button
        className="flex justify-center items-center border-0 w-[40px] h-[40px] bg-gray-500 rounded-full text-2xl text-white cursor-not-allowed absolute top-1/2 right-4 -translate-y-1/2 opacity-50"
        disabled
      >
        {/* 화살표 아이콘 */}
      </button>

      {/* 인디케이터 */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {[...Array(3)].map((_, idx) => (
          <span
            key={idx}
            className="inline-block w-4 h-4 rounded-full bg-gray-400"
          ></span>
        ))}
      </div>
    </div>
  );
}
