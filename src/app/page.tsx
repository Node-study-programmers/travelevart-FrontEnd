"use client";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect } from "react";
import mainBg from "@/app/asset/img/mainBackground.jpg";
import mainObj from "@/app/asset/img/mainSun.jpg";
import { logoFont } from "@/font";

export default function Home() {
  const { data: session } = useSession();

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const translateScene = Math.min(scrollY, 160); // 최대 160px까지 이동
      const translateYH1 = Math.min(scrollY, 250); // 최대 40rem (640px)까지 이동
      const translateYDiv = Math.min(scrollY, 270); // 최대 50rem (800px)까지 이동
      // const translateYMainImg = Math.min(scrollY, 100); // 최대 50rem (800px)까지 이동

      const h1Element = document.getElementById("h1Element");
      const divElement = document.getElementById("divElement");
      const mainImage = document.getElementById("mainImage");
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
      // if (mainImage) {
      //   mainImage.style.transform = `translate3d(0, ${translateYMainImg}px, 0)`;
      // }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
              Travelevart
            </h1>
          </div>
          <Image
            id="sunsetScene"
            alt="Sunset Scene"
            src={mainObj.src}
            fill
            style={{ transformStyle: "preserve-3d" }}
            className="pointer-events-none absolute top-0 bottom-auto left-0 right-0 object-cover max-w-full inline-block will-change-transform transition-transform duration-200 ease-linear"
          />
        </div>
      </div>
      <div className="h-screen w-full mt-[10rem]">qwe</div>
    </main>
  );
}
