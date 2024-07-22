"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import mainBg from "@/app/asset/img/mainBackground.jpg";
import mainObj from "@/app/asset/img/mainSun.jpg";
import { logoFont } from "@/font";
import { NotifyDrawer } from "./ui/common/Drawer";

// 더미 데이터
const notifications = [
  {
    id: 1,
    title: "알림 1",
    content: "이것은 첫 번째 알림의 내용입니다. 중요하니 확인해주세요.",
    timeAgo: "5분 전",
  },
  {
    id: 2,
    title: "알림 2",
    content: "두 번째 알림이 도착했습니다. 이 알림은 덜 중요할 수 있습니다.",
    timeAgo: "15분 전",
  },
  {
    id: 3,
    title: "알림 3",
    content: "새로운 업데이트가 있습니다. 내용을 확인하세요.",
    timeAgo: "1시간 전",
  },
  {
    id: 4,
    title: "알림 4",
    content: "알림이 추가되었습니다. 추가 정보를 확인하세요.",
    timeAgo: "2시간 전",
  },
  {
    id: 5,
    title: "알림 5",
    content: "중요한 메시지가 도착했습니다. 지금 확인하세요!",
    timeAgo: "5시간 전",
  },
  {
    id: 6,
    title: "알림 6",
    content: "새로운 기능이 추가되었습니다. 확인해보세요!",
    timeAgo: "10분 전",
  },
  {
    id: 7,
    title: "알림 7",
    content: "서비스 점검 안내입니다. 서비스가 잠시 중단됩니다.",
    timeAgo: "30분 전",
  },
  {
    id: 8,
    title: "알림 8",
    content: "계정 보안 업데이트가 있습니다. 즉시 확인하세요.",
    timeAgo: "45분 전",
  },
  {
    id: 9,
    title: "알림 9",
    content: "이벤트가 시작되었습니다. 참여해보세요!",
    timeAgo: "1시간 전",
  },
  {
    id: 10,
    title: "알림 10",
    content: "시스템 오류가 발생했습니다. 문제를 확인 중입니다.",
    timeAgo: "2시간 전",
  },
  {
    id: 11,
    title: "알림 11",
    content: "회원님을 위한 특별 할인 쿠폰이 도착했습니다.",
    timeAgo: "3시간 전",
  },
  {
    id: 12,
    title: "알림 12",
    content: "새로운 콘텐츠가 업데이트되었습니다. 확인해보세요.",
    timeAgo: "4시간 전",
  },
  {
    id: 13,
    title: "알림 13",
    content: "시스템 유지보수가 예정되어 있습니다. 참고해 주세요.",
    timeAgo: "5시간 전",
  },
  {
    id: 14,
    title: "알림 14",
    content: "신규 기능 출시 안내입니다. 자세한 내용을 확인하세요.",
    timeAgo: "6시간 전",
  },
  {
    id: 15,
    title: "알림 15",
    content: "사용자 리뷰가 도착했습니다. 확인해보세요.",
    timeAgo: "7시간 전",
  },
];

export default function Home() {
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [open, setOpen] = useState(false);

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
      <div className="h-screen w-screen">
        <div className="mt-40" onClick={() => setOpen(true)}>
          open btn
        </div>
        <NotifyDrawer
          open={open}
          onClose={() => setOpen(false)}
          notifications={notifications}
        />
      </div>
    </main>
  );
}
