"use client";

import { useEffect, useRef, useState } from "react";
import { logoFont } from "@/app/asset/fonts/fonts";
import thumbnail from "@/app/asset/img/video/thumbnail.webp";

export default function MainVideo() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isLoading, setIsLoading] = useState(true); // 비디오 로드 상태
  const [showLogo, setShowLogo] = useState(false); // 비디오 로고 표시 상태

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const handleLoadedData = () => {
      setIsLoading(false); // 비디오 로드 완료 시 로딩 상태 false
    };

    const handleTimeUpdate = () => {
      if (videoElement.currentTime >= videoElement.duration - 14) {
        setShowLogo(true);
      } else {
        setShowLogo(false);
      }
    };

    videoElement.addEventListener("loadeddata", handleLoadedData);
    videoElement.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      videoElement.removeEventListener("loadeddata", handleLoadedData);
      videoElement.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, []);

  return (
    <div className="relative h-screen">
      {/* 비디오 */}
      <video
        autoPlay
        loop
        muted
        playsInline
        ref={videoRef}
        className={`absolute inset-0 object-cover h-screen w-screen`}
        poster={thumbnail.src} // 썸네일 이미지로 비디오 로드 전 대체
      >
        <source
          src="https://dlgoj4bmj43ab.cloudfront.net/travelevart/mainVideo-.webm"
          type="video/webm"
        />
        <source
          src="https://dlgoj4bmj43ab.cloudfront.net/travelevart/mainVideo.mp4"
          type="video/mp4"
        />
      </video>

      {/* 비디오 로고 표시 */}
      {showLogo && (
        <div
          className={`text-7xl sm:text-8xl md:text-9xl absolute top-1/3 left-0 right-0 text-center text-white transition-opacity duration-500 ${showLogo ? "opacity-100" : "opacity-0"} ${logoFont.className}`}
        >
          TravelevarT
        </div>
      )}
    </div>
  );
}
