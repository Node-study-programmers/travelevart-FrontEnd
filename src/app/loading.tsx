import React from "react";
import { logoFont } from "./asset/fonts/fonts";

export default function Loading() {
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div
        className={`${logoFont.className} animate-shake`}
        style={{
          fontSize: "15vw", // 텍스트 크기를 화면 너비에 따라 조정
          backgroundImage:
            'url("https://cdn.pixabay.com/photo/2020/09/01/06/00/sky-5534319_1280.jpg")',
          WebkitMaskImage:
            "radial-gradient(circle, rgba(0, 0, 0, 1) 50%, rgba(0, 0, 0, 0) 100%)",
          maskImage:
            "radial-gradient(circle, rgba(0, 0, 0, 1) 50%, rgba(0, 0, 0, 0) 100%)",
          WebkitMaskSize: "cover",
          maskSize: "cover",
          WebkitMaskPosition: "center",
          maskPosition: "center",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundColor: "transparent",
          textAlign: "center",
          width: "100%",
          maxWidth: "1000px",
          fontWeight: "bold",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
          position: "relative",
          boxSizing: "border-box",
        }}
      >
        Loading
      </div>
    </div>
  );
}
