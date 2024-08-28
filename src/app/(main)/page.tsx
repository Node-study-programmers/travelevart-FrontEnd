"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import useIntersectionObserver from "../hooks/useIntersectionObserver";
import { logoFont } from "../asset/fonts/fonts";
import intro from "@/app/asset/img/mockup/intro.png";
import recommend1 from "@/app/asset/img/mockup/recommend1.png";
import recommend2 from "@/app/asset/img/mockup/recommend2.png";
import travelroute1 from "@/app/asset/img/mockup/travelroute1.png";
import travelroute2 from "@/app/asset/img/mockup/travelroute2.png";
import travelroute3 from "@/app/asset/img/mockup/travelroute3.png";
import SEO from "../seo/SEO";
import Loading from "../loading";

export default function Home() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [showLogo, setShowLogo] = useState(false);
  const [isIntroVisible, setIsIntroVisible] = useState(false);
  const [isTravelRouteVisible, setIsTravelRouteVisible] = useState(false);
  const [isRecommendationVisible, setIsRecommendationVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // 비디오 로드 상태

  const introRef = useIntersectionObserver(
    (entries) => {
      const [entry] = entries;
      setIsIntroVisible(entry.isIntersecting);
    },
    { threshold: 0.2 },
  );

  const travelRouteRef = useIntersectionObserver(
    (entries) => {
      const [entry] = entries;
      setIsTravelRouteVisible(entry.isIntersecting);
    },
    { threshold: 0.2 },
  );

  const recommendationRef = useIntersectionObserver(
    (entries) => {
      const [entry] = entries;
      setIsRecommendationVisible(entry.isIntersecting);
    },
    { threshold: 0.2 },
  );

  useEffect(() => {
    const videoElement = videoRef.current;

    if (!videoElement) return;

    const handleLoadedMetadata = () => {
      videoElement.addEventListener("timeupdate", handleTimeUpdate);
    };

    const handleTimeUpdate = () => {
      if (videoElement.currentTime >= videoElement.duration - 10) {
        setShowLogo(true);
      } else {
        setShowLogo(false);
      }
    };

    const handleLoadedData = () => {
      setIsLoading(false); // 비디오가 로드되면 로딩 상태를 false로 설정
    };

    videoElement.addEventListener("loadedmetadata", handleLoadedMetadata);
    videoElement.addEventListener("loadeddata", handleLoadedData);

    return () => {
      videoElement.removeEventListener("timeupdate", handleTimeUpdate);
      videoElement.removeEventListener("loadedmetadata", handleLoadedMetadata);
      videoElement.removeEventListener("loadeddata", handleLoadedData);
    };
  }, []);

  return (
    <>
      <SEO />
      <main className="min-h-screen">
        {/* 로딩 화면 */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <Loading />
          </div>
        )}
        {/* 비디오 */}
        <div className="relative h-screen">
          <video
            preload="metadata"
            autoPlay
            loop
            muted
            playsInline
            ref={videoRef}
            poster="/videos/thumbnail.png"
            className="absolute inset-0 object-cover h-screen w-screen"
          >
            <source src="/videos/mainVideo.mp4" type="video/mp4" />
          </video>
          {showLogo && (
            <div
              className={`text-7xl sm:text-8xl md:text-9xl absolute top-1/3 left-0 right-0 text-center text-white ${showLogo ? "animate-fade-in" : "animate-fade-out"} ${logoFont.className}`}
            >
              TravelevarT
            </div>
          )}
        </div>
        {/* intro */}
        <div
          ref={introRef}
          className={`min-h-screen flex flex-col gap-y-4 md:flex-row justify-center items-center gap-x-32 py-20 mt-40 transition-opacity duration-[2000ms] ease-in-out ${
            isIntroVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <div className="flex flex-col items-start gap-y-8">
            <div className="flex justify-center text-center md:justify-start md:text-start w-full">
              <span
                className={`text-3xl lg:text-5xl ${logoFont.className} leading-snug`}
              >
                여행지 추천 서비스 <br /> TravelevarT
              </span>
            </div>
            <span className="text-sm lg:text-base">
              여행지 추천, 플랜을
              <span className="text-primary font-bold"> TravelevarT</span>에서
              한번에 해결해보세요
            </span>
          </div>
          <Image
            src={intro.src}
            alt="intro"
            width={300}
            height={0}
            className="w-[150px] lg:w-[300px]"
          />
        </div>

        {/* travelRoute 소개 */}
        <div
          ref={travelRouteRef}
          className={`min-h-screen bg-[whitesmoke] flex flex-col items-center py-20 gap-y-8 transition-opacity duration-[2000ms] ease-in-out ${
            isTravelRouteVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <div className="flex flex-col items-center py-20 gap-y-8">
            <span className="text-3xl lg:text-5xl leading-snug text-center">
              나만의 여행 플랜 <br /> 직접 커스텀 해보세요
            </span>
            <span className="text-sm lg:text-base">
              교통, 여행 기간에 맞춰 플랜을 구성할 수 있어요
            </span>
          </div>
          <div className="relative flex justify-center px-4 pb-20 gap-x-4">
            <Image
              src={travelroute1.src}
              alt="travelroute1"
              width={300}
              height={0}
              className="w-[150px] lg:w-[300px] lg:relative lg:left-auto absolute transform -translate-x-[60%] lg:translate-x-0 "
            />
            <Image
              src={travelroute3.src}
              alt="travelroute3"
              width={300}
              height={0}
              className="w-[150px] lg:w-[300px] z-10 -translate-y-2 lg:translate-y-0"
            />
            <Image
              src={travelroute2.src}
              alt="travelroute2"
              width={300}
              height={0}
              className="w-[150px] lg:w-[300px] lg:relative lg:right-auto absolute transform translate-x-[60%] lg:translate-x-0"
            />
          </div>
        </div>

        {/* 여행지 추천 */}
        <div
          ref={recommendationRef}
          className={`min-h-screen flex flex-col justify-center items-center gap-y-8 py-20 transition-opacity duration-[2000ms] ease-in-out ${
            isRecommendationVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <div className="flex flex-col items-center gap-y-8">
            <span className="text-2xl lg:text-5xl leading-snug text-center">
              다양한 여행지 <br /> 최적의 경로로 이동해요
            </span>
            <span>최적의 여행 경로를 안내받아 일정 지도를 만들 수 있어요</span>
          </div>
          <div className="relative flex justify-center items-center gap-x-0 pb-20">
            <Image
              src={recommend1.src}
              alt="recommend1"
              width={300}
              height={0}
              className="w-[150px] lg:w-[300px] relative"
            />
            <Image
              src={recommend2.src}
              alt="recommend2"
              width={300}
              height={0}
              className="w-[150px] lg:w-[300px] z-10 absolute transform translate-x-[60%] translate-y-[15%]"
            />
          </div>
        </div>
      </main>
    </>
  );
}
