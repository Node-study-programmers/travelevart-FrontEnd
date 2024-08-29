"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { logoFont } from "@/app/asset/fonts/fonts";

export default function MainVideo() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const thumbnailRef = useRef<HTMLDivElement | null>(null); // 썸네일을 관리할 ref
  const [showLogo, setShowLogo] = useState(false); // 비디오에 보여줄 로고
  const [isLoading, setIsLoading] = useState(true); // 비디오 로드 상태

  useEffect(() => {
    const videoElement = videoRef.current;
    const thumbnailElement = thumbnailRef.current;
    if (!videoElement || !thumbnailElement) return;

    const handleLoadedMetadata = () => {
      videoElement.addEventListener("timeupdate", handleTimeUpdate);
    };

    const handleTimeUpdate = () => {
      if (videoElement.currentTime >= videoElement.duration - 14) {
        setShowLogo(true);
      } else {
        setShowLogo(false);
      }
    };

    const handleLoadedData = () => {
      setIsLoading(false); // 비디오 로드가 완료되면 로딩 상태 false
      thumbnailElement.style.opacity = "0"; // 비디오가 로드되면 썸네일 숨김
    };

    const handlePlay = () => {
      // 비디오가 시작되면 상태 변경
    };

    const handleEnded = () => {
      videoElement.play(); // 비디오가 끝난 후 다시 재생
    };

    videoElement.addEventListener("loadedmetadata", handleLoadedMetadata);
    videoElement.addEventListener("loadeddata", handleLoadedData);
    videoElement.addEventListener("ended", handleEnded);
    videoElement.addEventListener("play", handlePlay);

    return () => {
      videoElement.removeEventListener("timeupdate", handleTimeUpdate);
      videoElement.removeEventListener("loadedmetadata", handleLoadedMetadata);
      videoElement.removeEventListener("loadeddata", handleLoadedData);
      videoElement.removeEventListener("ended", handleEnded);
      videoElement.removeEventListener("play", handlePlay);
    };
  }, []);

  return (
    <div className="relative h-screen">
      {/* 비디오 로드 전 썸네일 이미지 */}
      <div
        ref={thumbnailRef} // ref로 썸네일 관리
        className="absolute inset-0 flex items-center justify-center transition-opacity duration-500"
      >
        <Image
          src="/videos/thumbnail.png"
          alt="Video Thumbnail"
          layout="fill"
          objectFit="cover"
          quality={100}
          priority
        />
      </div>

      {/* 비디오 */}
      <video
        autoPlay
        loop
        muted
        playsInline
        ref={videoRef}
        className={`absolute inset-0 object-cover h-screen w-screen transition-opacity duration-500 ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
        onCanPlay={() => setIsLoading(false)}
      >
        <source src="videos/mainVideo.webm" type="video/webm" />
        <source src="videos/mainVideo.mp4" type="video/mp4" />
      </video>

      {/* 비디오 중앙에 로고 표시 */}
      {showLogo && (
        <div
          className={`text-7xl sm:text-8xl md:text-9xl absolute top-1/3 left-0 right-0 text-center text-white ${showLogo ? "animate-fade-in" : "animate-fade-out"} ${logoFont.className}`}
        >
          TravelevarT
        </div>
      )}
    </div>
  );
}
