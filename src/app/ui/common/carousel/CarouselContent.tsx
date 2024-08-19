import { ICarouselContents } from "@/lib/types";
import Image from "next/image";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import Link from "next/link";

interface ICarouselContentProps {
  content: ICarouselContents;
}

export default function CarouselContent({ content }: ICarouselContentProps) {
  const startDate = format(new Date(content?.startDay), "yyyy년 MM월 dd일", {
    locale: ko,
  });
  const endDate = format(new Date(content?.endDay), "yyyy년 MM월 dd일", {
    locale: ko,
  });

  return (
    <div className="relative flex flex-shrink-0 flex-grow-0 basis-full justify-center items-center text-center overflow-hidden h-[50vh]">
      {/* 이미지 컨테이너 */}
      <div className="absolute inset-0 overflow-hidden">
        <Image
          fill
          src={content.image}
          alt={content.title}
          className="object-cover"
          style={{
            filter: "brightness(70%)", // 이미지 어두운 정도 조정
            objectPosition: "center", // 이미지 위치 중앙으로 조정
          }}
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-transparent to-gray-900"
          style={{ zIndex: 1 }}
        />
      </div>
      {/* 텍스트 */}
      <div
        className="absolute top-1/2 right-8 transform -translate-y-1/2 
        w-1/2 flex flex-col items-center p-4 lg:h-full justify-center"
        style={{ zIndex: 2 }}
      >
        <h2 className="text-base lg:text-3xl font-semibold mb-4 text-white text-center">
          {content.title}
        </h2>
        <p className="text-sm lg:text-lg text-white text-center pb-10">
          {startDate} ~ <br />
          {endDate}
        </p>
        <Link
          className="text-black bg-white py-2 px-4 cursor-pointer rounded-2xl"
          href={`/search-trip/festival/${content.id}`}
        >
          자세히 보기
        </Link>
      </div>
    </div>
  );
}
