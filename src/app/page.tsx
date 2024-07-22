"use client";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import mainBg from "@/app/asset/img/mainBackground.jpg";
import mainObj from "@/app/asset/img/mainSun.jpg";
import { logoFont } from "@/font";
import Tooltip from "./ui/common/Tooltip";
import ScrollShadow from "./ui/common/ScrollShadow";

export default function Home() {
  const { data: session } = useSession();
  const [imagesLoaded, setImagesLoaded] = useState(false);

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
            onLoadingComplete={handleImageLoad}
          />
        </div>
      </div>
      <div className="h-screen w-full mt-[10rem]">
        <div>qwe</div>
        <ScrollShadow className="w-[350px] h-[500px]">
          <div>
            <p>
              Nostrud ullamco deserunt aute id consequat veniam incididunt duis
              in sint irure nisi. Mollit officia cillum Lorem ullamco minim
              nostrud elit officia tempor esse quis. Sunt ad dolore quis aute
              consequat. Magna exercitation reprehenderit magna aute tempor
              cupidatat consequat elit dolor adipisicing. Mollit dolor eiusmod
              sunt ex incididunt cillum quis. Velit duis sit officia eiusmod
              Lorem aliqua enim laboris do dolor eiusmod. Et mollit incididunt
              nisi consectetur esse laborum eiusmod pariatur proident Lorem
              eiusmod et. Culpa deserunt nostrud ad veniam. Est velit labore
              esse esse cupidatat. Velit id elit consequat minim. Mollit enim
              excepteur ea laboris adipisicing aliqua proident occaecat do do
              adipisicing adipisicing ut fugiat. Consequat pariatur ullamco aute
              sunt esse. Irure excepteur eu non eiusmod. Commodo commodo et ad
              ipsum elit esse pariatur sit adipisicing sunt excepteur enim.
              Incididunt duis commodo mollit esse veniam non exercitation dolore
              occaecat ea nostrud laboris. Adipisicing occaecat fugiat fugiat
              irure fugiat in magna non consectetur proident fugiat. Commodo
              magna et aliqua elit sint cupidatat. Sint aute ullamco enim cillum
              anim ex. Est eiusmod commodo occaecat consequat laboris est do
              duis. Enim incididunt non culpa velit quis aute in elit magna
              ullamco in consequat ex proident. Dolore incididunt mollit fugiat
              pariatur cupidatat ipsum laborum cillum. Commodo consequat velit
              cupidatat duis ex nisi non aliquip ad ea pariatur do culpa.
              Eiusmod proident adipisicing tempor tempor qui pariatur voluptate
              dolor do ea commodo. Veniam voluptate cupidatat ex nisi do ullamco
              in quis elit. Cillum proident veniam cupidatat pariatur laborum
              tempor cupidatat anim eiusmod id nostrud pariatur tempor
              reprehenderit. Do esse ullamco laboris sunt proident est ea
              exercitation cupidatat. Do Lorem eiusmod aliqua culpa ullamco
              consectetur veniam voluptate cillum. Dolor consequat cillum tempor
              laboris mollit laborum reprehenderit reprehenderit veniam aliqua
              deserunt cupidatat consequat id. Est id tempor excepteur enim
              labore sint aliquip consequat duis minim tempor proident. Dolor
              incididunt aliquip minim elit ea. Exercitation non officia eu id.
              Ipsum ipsum consequat incididunt do aliquip pariatur nostrud. Qui
              ut sint culpa labore Lorem. Magna deserunt aliquip aute duis
              consectetur magna amet anim. Magna fugiat est nostrud veniam.
              Officia duis ea sunt aliqua. Ipsum minim officia aute anim minim
              aute aliquip aute non in non. Ipsum aliquip proident ut dolore
              eiusmod ad fugiat fugiat ut ex. Ea velit Lorem ut et commodo nulla
              voluptate veniam ea et aliqua esse id. Pariatur dolor et
              adipisicing ea mollit. Ipsum non irure proident ipsum dolore
              aliquip adipisicing laborum irure dolor nostrud occaecat
              exercitation. Culpa qui reprehenderit nostrud aliqua reprehenderit
              et ullamco proident nisi commodo non ut. Ipsum quis irure nisi
              sint do qui velit nisi. Sunt voluptate eu reprehenderit tempor
              consequat eiusmod Lorem irure velit duis Lorem laboris ipsum
              cupidatat. Pariatur excepteur tempor veniam cillum et nulla ipsum
              veniam ad ipsum ad aute. Est officia duis pariatur ad eiusmod id
              voluptate.
            </p>
          </div>
        </ScrollShadow>
      </div>
    </main>
  );
}
