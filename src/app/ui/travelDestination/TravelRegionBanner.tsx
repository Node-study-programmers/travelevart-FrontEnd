import Image from "next/image";
import seoul from "@/app/asset/img/travelRegion/seoul.jpeg";
import incheon from "@/app/asset/img/travelRegion/incheon.jpeg";
import kangwon from "@/app/asset/img/travelRegion/kangwon.jpeg";
import chungbuk from "@/app/asset/img/travelRegion/chungbuk.jpeg";
import daejeon from "@/app/asset/img/travelRegion/daejeon.jpeg";
import chungnam from "@/app/asset/img/travelRegion/chungnam.jpeg";
import daegu from "@/app/asset/img/travelRegion/daegu.jpeg";
import kyeongbuk from "@/app/asset/img/travelRegion/kyeongbuk.jpeg";
import kwangju from "@/app/asset/img/travelRegion/kwangju.jpeg";
import kyeongnam from "@/app/asset/img/travelRegion/kyeongnam.jpeg";
import busan from "@/app/asset/img/travelRegion/busan.jpeg";
import jeonbuk from "@/app/asset/img/travelRegion/jeonbuk.jpeg";
import ulsan from "@/app/asset/img/travelRegion/ulsan.jpeg";
import jeonnam from "@/app/asset/img/travelRegion/jeonnam.jpeg";
import seojong from "@/app/asset/img/travelRegion/seojong.jpeg";
import jeju from "@/app/asset/img/travelRegion/jeju.jpeg";
import kyeongi from "@/app/asset/img/travelRegion/kyeongi.jpeg";
import { logoFont } from "@/app/asset/fonts/fonts";

// 대표 지역별 이미지
export const travelRegionGroup = [
  { id: 0, region: "전체", imageUrl: "" },
  { id: 1, region: "서울", imageUrl: seoul },
  { id: 2, region: "인천", imageUrl: incheon },
  { id: 3, region: "강원도", imageUrl: kangwon },
  { id: 4, region: "충북", imageUrl: chungbuk },
  { id: 5, region: "대전", imageUrl: daejeon },
  { id: 6, region: "충남", imageUrl: chungnam },
  { id: 7, region: "대구", imageUrl: daegu },
  { id: 8, region: "경북", imageUrl: kyeongbuk },
  { id: 9, region: "광주", imageUrl: kwangju },
  { id: 10, region: "경남", imageUrl: kyeongnam },
  { id: 11, region: "부산", imageUrl: busan },
  { id: 12, region: "전북", imageUrl: jeonbuk },
  { id: 13, region: "울산", imageUrl: ulsan },
  { id: 14, region: "전남", imageUrl: jeonnam },
  { id: 15, region: "세종", imageUrl: seojong },
  { id: 16, region: "제주", imageUrl: jeju },
  { id: 17, region: "경기", imageUrl: kyeongi },
];

export default function TravelRegionBanner({
  regionCode,
}: {
  regionCode: number;
}) {
  return (
    <div className="relative w-full group overflow-hidden h-[50vh] sm:h-[60vh] lg:h-[60vh]">
      <Image
        src={travelRegionGroup[regionCode].imageUrl}
        alt={travelRegionGroup[regionCode].region}
        layout="fill"
        objectFit="cover"
        className="absolute inset-0 transform scale-110 brightness-75"
      />
      <h1
        className={`absolute inset-0 flex items-center justify-center text-white text-4xl sm:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold ${logoFont.className} text-shadow-md`}
      >
        {travelRegionGroup[regionCode].region}
      </h1>
    </div>
  );
}
