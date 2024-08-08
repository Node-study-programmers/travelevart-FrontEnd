import { ICarouselContents } from "@/lib/types";
import CarouselContent from "./CarouselContent";
import { useMemo, useState, useEffect } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

interface ICarouselProps {
  contents: ICarouselContents[];
}

export default function Carousel({ contents }: ICarouselProps) {
  const [currentActiveContent, setCurrentActiveContent] = useState(0);

  const handlePrevContent = () => {
    setCurrentActiveContent((prev) =>
      prev === 0 ? contents.length - 1 : prev - 1,
    );
  };

  const handleNextContent = () => {
    setCurrentActiveContent((prev) =>
      prev === contents.length - 1 ? 0 : prev + 1,
    );
  };

  const transformValue = useMemo(() => {
    return currentActiveContent * -100;
  }, [currentActiveContent]);

  const handleIndicator = (idx: number) => {
    setCurrentActiveContent(idx);
  };

  // 자동 슬라이드 전환 설정
  useEffect(() => {
    const intervalId = setInterval(() => {
      handleNextContent();
    }, 5000);

    // 컴포넌트 언마운트 시 interval 클리어
    return () => clearInterval(intervalId);
  }, [contents.length]);

  return (
    <div className="relative w-full group overflow-hidden h-[50vh]">
      <div
        className="flex"
        style={{
          transform: `translateX(${transformValue}%)`,
          transition: `transform 0.5s ease-in-out`,
        }}
      >
        {contents.map((content) => (
          <CarouselContent content={content} key={content.id} />
        ))}
      </div>

      {/* 버튼 */}
      <button
        onClick={handlePrevContent}
        className={`flex justify-center items-center border-0 w-[40px] h-[40px] bg-slide-btn rounded-full text-2xl text-white cursor-pointer absolute top-1/2 left-4 -translate-y-1/2 opacity-0 group-hover:opacity-100 ${currentActiveContent === 0 ? "hidden" : "block"}`}
      >
        <FaAngleLeft />
      </button>
      <button
        onClick={handleNextContent}
        className={`flex justify-center items-center border-0 w-[40px] h-[40px] bg-slide-btn rounded-full text-2xl text-white cursor-pointer absolute top-1/2 right-4 -translate-y-1/2 opacity-0 group-hover:opacity-100 ${currentActiveContent === contents.length - 1 ? "hidden" : "block"}`}
      >
        <FaAngleRight />
      </button>

      {/* 인디케이터 */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {contents.map((_, idx) => (
          <span
            onClick={() => handleIndicator(idx)}
            key={idx}
            className={`inline-block w-2 h-2 rounded-full cursor-pointer ${idx === currentActiveContent ? "bg-primary" : "bg-white"}`}
          ></span>
        ))}
      </div>
    </div>
  );
}
