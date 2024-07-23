"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import mainBg from "@/app/asset/img/mainBackground.jpg";
import mainObj from "@/app/asset/img/mainSun.jpg";
import { logoFont } from "@/font";
import DropDown from "../ui/common/DropDown";
import Select from "../ui/common/Select";

const names = [
  "김지수",
  "이민호",
  "박소연",
  "최강석",
  "홍진아",
  "오세훈",
  "정유진",
  "강태현",
  "서하늘",
  "윤아영",
  "김지수",
  "이민호",
  "박소연",
  "최강석",
  "홍진아",
  "오세훈",
  "정유진",
  "강태현",
  "서하늘dasdasdasadsdasdasadsdasadsadsdas",
  "윤아영",
  "김지수",
  "이민호",
  "박소연",
  "최강석",
  "홍진아",
  "오세훈",
  "정유진",
  "강태현",
  "서하늘",
  "윤아영",
];

export default function Home() {
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [name, setName] = useState<string | number>("");

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const translateScene = Math.min(scrollY, 160);
      const translateYH1 = Math.min(scrollY, 250);
      const translateYDiv = Math.min(scrollY, 270);

      const h1Element = document.getElementById("h1Element");
      const divElement = document.getElementById("divElement");
      const sunsetScene = document.getElementById("sunsetScene");
      if (h1Element) {
        h1Element.style.transform = `translate3d(0, ${translateYH1}px, 0)`;
      }
      if (divElement) {
        divElement.style.transform = `translate3d(0, ${translateYDiv}px, 0)`;
      }
      if (sunsetScene) {
        sunsetScene.style.transform = `translate3d(0, ${translateScene}px, 0)`;
      }
    };

    if (imagesLoaded) {
      handleScroll();
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [imagesLoaded]);

  const handleImageLoad = () => {
    setImagesLoaded(true);
  };

  return (
    <main className="min-h-screen m-0">
      <div>
        <div className="flex flex-col justify-center items-center relative">
          <Image
            id="mainImage"
            width={0}
            height={0}
            sizes="100vw"
            alt="MainBg"
            src={mainBg.src}
            className="max-w-full inline-block pointer-events-none w-full h-screen object-cover"
            onLoadingComplete={handleImageLoad}
          />
          <h1
            id="h1Element"
            className="absolute top-[40%] bottom-auto left-[10%] right-auto leading-[0.8em] text-white will-change-transform transition-transform duration-200 ease-linear"
            style={{ transformStyle: "preserve-3d" }}
          >
            여행을 떠나고 싶은 P들을 위한
          </h1>
          <div
            id="divElement"
            className="absolute top-[50%] bottom-auto left-[10%] text-center leading-[0.8em] text-white will-change-transform transition-transform duration-200 ease-linear"
            style={{ transformStyle: "preserve-3d" }}
          >
            <h1 className={`${logoFont.className} tracking-wider text-[9.3vw]`}>
              TravelevarT
            </h1>
          </div>
          <Image
            id="sunsetScene"
            alt="Sunset Scene"
            src={mainObj.src}
            fill
            style={{ transformStyle: "preserve-3d" }}
            className="pointer-events-none absolute top-0 bottom-auto left-0 right-0 object-cover max-w-full inline-block will-change-transform transition-transform duration-200 ease-linear"
            onLoadingComplete={handleImageLoad}
          />
        </div>
      </div>
      <div className="h-screen w-screen mt-40 text-center justify-center">
        qwe
        <div className="flex justify-center">
          <Select
            items={names}
            label={"최고의 학생"}
            defaultValue={"kokokoko"}
            placeholder={"학생을 선택하세요"}
            onChange={setName}
          />
        </div>
      </div>
    </main>
  );
}
