"use client";

import { useEffect, useState } from "react";
import { logoFont } from "@/app/asset/fonts/fonts";
import useLogin from "@/app/hooks/auth/useLogin";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { TRAVEL_REGION_GROUP } from "@/constant";

export default function RecommendTripIntro() {
  const { userData } = useLogin();
  const router = useRouter();

  const handlerSetupRecommendTrip = async () => {
    if (!userData) {
      toast.info("로그인 후 이용 가능합니다.", { autoClose: 1500 });
      await new Promise((resolve) => setTimeout(resolve, 1000));
      router.push("/auth/login");
      return;
    }

    router.push("/recommend-trip/setup");
  };
  const [currentImage, setCurrentImage] = useState(0);
  const representativeRegionImages = TRAVEL_REGION_GROUP.slice(1).map(
    (item) => item.imageUrl,
  );

  // 이미지 무한 슬라이드
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImage(
        (prevIndex) => (prevIndex + 1) % representativeRegionImages.length,
      );
    }, 2000);

    return () => clearInterval(intervalId);
  }, [representativeRegionImages.length]);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex py-4">
        <div className="flex items-center gap-x-2">
          <Link href="/">
            <p className={`${logoFont.className}`}>TravelevarT</p>
          </Link>
          <p className={`${logoFont.className} text-xs`}>여행지 추천</p>
        </div>
      </div>
      <div className="flex flex-col items-center justify-start flex-grow mt-12 py-8">
        <div className="flex flex-col gap-y-2 text-center">
          <p className="text-2xl font-semibold">
            사용자 취향에 맞는 여행지 일정을
            <br /> 생성해 드려요!
          </p>
          <p className="text-sm text-rgb-secondary">
            여행 일정 고민을 해결해보세요!
          </p>
        </div>
        <div className="relative w-full max-w-2xl h-[50vh] overflow-hidden mt-24 flex items-center justify-center">
          {representativeRegionImages.map((image, idx) => (
            <div
              key={idx}
              className={`absolute inset-0 transition-opacity duration-1000 ${idx === currentImage ? "opacity-100" : "opacity-0"}`}
            >
              <Image
                priority
                src={image}
                alt={`Slide ${idx}`}
                className="w-full h-[400px] sm:h-full rounded-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center">
        <button
          className="bg-primary text-white px-4 py-2 rounded-lg mb-8 hover:cursor-pointer w-40"
          onClick={handlerSetupRecommendTrip}
        >
          추천받기
        </button>
      </div>
    </div>
  );
}
