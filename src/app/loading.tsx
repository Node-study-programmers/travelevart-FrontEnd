import React from "react";
import { logoFont } from "./asset/fonts/fonts";

export default function Loading() {
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div
        className={`${logoFont.className} animate-shake`} // 애니메이션 클래스 적용
        style={{
          fontSize: "16rem", // 텍스트 크기
          backgroundImage:
            'url("https://cdn.pixabay.com/photo/2020/09/01/06/00/sky-5534319_1280.jpg")', // 배경 이미지
          WebkitMaskImage:
            "radial-gradient(circle, rgba(0, 0, 0, 1) 50%, rgba(0, 0, 0, 0) 100%)", // Radial gradient 마스크
          maskImage:
            "radial-gradient(circle, rgba(0, 0, 0, 1) 50%, rgba(0, 0, 0, 0) 100%)", // Radial gradient 마스크
          WebkitMaskSize: "cover",
          maskSize: "cover",
          WebkitMaskPosition: "center", // 마스크 이미지 위치
          maskPosition: "center",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundColor: "transparent", // 텍스트 내부 배경색을 투명하게 설정
          textAlign: "center", // 텍스트 가운데 정렬
          height: "800px", // 텍스트 높이
          width: "100%", // 너비를 100%로 설정하여 화면에 맞게 조정
          maxWidth: "1000px", // 최대 너비 설정
          fontWeight: "bold",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden", // 넘치는 부분을 숨기기
          position: "relative",
          boxSizing: "border-box",
        }}
      >
        Loading
      </div>
    </div>
  );
}
