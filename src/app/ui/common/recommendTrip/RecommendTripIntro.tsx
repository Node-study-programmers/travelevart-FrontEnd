"use client";

import useLogin from "@/app/hooks/auth/useLogin";
import { logoFont } from "@/font";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiShare } from "react-icons/fi";
import { toast } from "react-toastify";

export default function RecommendTripIntro() {
  const { userData } = useLogin();
  const router = useRouter();

  const handleShareLink = () => {
    const currentUrl = window.location.href;

    navigator.clipboard
      .writeText(currentUrl)
      .then(() => {
        toast.info("링크가 클립보드에 복사되었습니다!");
      })
      .catch(() => {
        toast.error("링크 복사에 실패했습니다.");
      });
  };

  const handlerSetupRecommendTrip = async () => {
    if (!userData) {
      toast.info("로그인 후 이용 가능합니다.", { autoClose: 1500 });
      await new Promise((resolve) => setTimeout(resolve, 1000));
      router.replace("/auth/login");
      return;
    }

    router.push("/recommend-trip/setup");
  };

  return (
    <div className="flex flex-col justify-between min-h-screen">
      <div className="flex justify-between py-4">
        <div className="flex items-center gap-x-2">
          <Link href="/">
            <p className={`${logoFont.className}`}>TravelevarT</p>
          </Link>
          <p className={`${logoFont.className} text-xs`}>여행지 추천</p>
        </div>
        <FiShare
          className="text-2xl hover:cursor-pointer"
          onClick={handleShareLink}
        />
      </div>
      <div className="flex flex-col items-center justify-start flex-grow py-8">
        <div className="flex flex-col gap-y-2">
          <p className="text-2xl font-semibold text-center">
            사용자 취향에 맞는 여행지 일정을
            <br /> 생성해 드려요!
          </p>
          <p className="text-sm text-rgb-secondary text-center">
            여행 일정 고민을 해결해보세요!
          </p>
        </div>
        <div className="mt-20">
          <Image
            src="https://cdn.pixabay.com/photo/2024/02/21/08/44/woman-8587090_1280.png"
            alt="dummy image"
            width={500}
            height={500}
          />
        </div>
      </div>
      <button
        className="bg-primary text-white px-4 py-2 rounded-lg mb-8 hover:cursor-pointer"
        onClick={handlerSetupRecommendTrip}
      >
        추천받기
      </button>
    </div>
  );
}
