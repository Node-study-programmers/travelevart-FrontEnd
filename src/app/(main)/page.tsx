"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import test1 from "@/app/asset/img/test1.png";

import useIntersectionObserver from "../hooks/useIntersectionObserver";
import BackgroundVideo from "next-video/background-video";
import mainVideo from "../../../public/_next-video/mainVideo.mp4";
import { logoFont } from "../asset/fonts/fonts";

export default function Home() {
  // const [imagesLoaded, setImagesLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [showLogo, setShowLogo] = useState(false);
  const [isIntroVisible, setIsIntroVisible] = useState(false);
  const [isTravelRouteVisible, setIsTravelRouteVisible] = useState(false);
  const [isRecommendationVisible, setIsRecommendationVisible] = useState(false);
  const [isDiaryVisible, setIsDiaryVisible] = useState(false);

  // 각 목업 감지
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

  const diaryRef = useIntersectionObserver(
    (entries) => {
      const [entry] = entries;
      setIsDiaryVisible(entry.isIntersecting);
    },
    { threshold: 0.2 },
  );

  useEffect(() => {
    const videoElement = videoRef.current;

    if (!videoElement) return;

    const handleLoadedMetadata = () => {
      // 비디오의 메타데이터 로드된 후 이벤트 리스너 추가
      videoElement.addEventListener("timeupdate", handleTimeUpdate);
    };

    const handleTimeUpdate = () => {
      if (videoElement.currentTime >= videoElement.duration - 5) {
        setShowLogo(true); // 비디오 끝나기 5초 전 로고 표시
      } else {
        setShowLogo(false);
      }
    };

    // 비디오 메타데이터 로드되었을 때 이벤트 처리
    videoElement.addEventListener("loadedmetadata", handleLoadedMetadata);

    return () => {
      videoElement.removeEventListener("timeupdate", handleTimeUpdate);
      videoElement.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, []);

  return (
    <main className="min-h-screen m-0">
      <div className="relative">
        {/* mux 워터마크 제거 필요 */}
        <BackgroundVideo
          src={mainVideo}
          autoPlay
          loop
          muted
          controls={false}
          className={`absolute inset-0 object-cover h-screen`}
          ref={videoRef}
        />
        {showLogo && (
          <div
            className={`text-7xl sm:text-8xl md:text-9xl ${logoFont.className} absolute top-1/3 left-0 right-0 text-center text-white ${showLogo ? "animate-fade-in" : "animate-fade-out"}`}
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
        {/* travelroute 개요 GIF로 보여주기 */}
        <Image
          src={test1.src}
          alt="test1"
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
          {/* travelroute 과정 이미지로 보여주기 */}
          <Image
            src={test1.src}
            alt="test1"
            width={300}
            height={0}
            className="w-[150px] lg:w-[300px] lg:relative lg:left-auto absolute transform -translate-x-[60%] lg:translate-x-0 "
          />
          <Image
            src={test1.src}
            alt="test1"
            width={300}
            height={0}
            className="w-[150px] lg:w-[300px] z-10 -translate-y-2 lg:translate-y-0"
          />
          <Image
            src={test1.src}
            alt="test1"
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
        {/* travelroute 과정 이미지로 보여주기 */}
        <div className="relative flex justify-center items-center gap-x-0 pb-20">
          <Image
            src={test1.src}
            alt="test1"
            width={300}
            height={0}
            className="w-[150px] lg:w-[300px] relative"
          />
          <Image
            src={test1.src}
            alt="test1"
            width={300}
            height={0}
            className="w-[150px] lg:w-[300px] z-10 absolute transform translate-x-[60%] translate-y-[15%]"
          />
        </div>
      </div>

      {/* 일기 */}
      <div
        ref={diaryRef}
        className={`min-h-screen bg-[whitesmoke] flex flex-col gap-y-4 md:flex-row justify-center items-center gap-x-32 py-20 transition-opacity duration-[2000ms] ease-in-out ${
          isDiaryVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }`}
      >
        <div className="flex flex-col items-start gap-y-8">
          <div className="flex justify-center text-center md:justify-start md:text-start w-full">
            <span className={`text-3xl lg:text-5xl leading-snug`}>
              다녀온 여행지 <br /> 일기로 기록해보세요
            </span>
          </div>
          <span className="text-sm lg:text-base">
            먼저 다녀온 여행자의 일기에서 다양한 꿀팁을 확인해보세요
          </span>
        </div>
        {/* 여행 일기 과정 이미지로 보여주기 */}
        <Image
          src={test1.src}
          alt="test1"
          width={300}
          height={0}
          className="w-[150px] lg:w-[300px]"
        />
      </div>
    </main>
  );
}
