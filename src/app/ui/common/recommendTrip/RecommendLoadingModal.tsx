import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { VscLoading } from "react-icons/vsc";
import { TRAVEL_REGION_GROUP } from "@/constant";

export default function RecommendLoadingModal() {
  const [currentImage, setCurrentImage] = useState(0);
  const representativeRegionImages = TRAVEL_REGION_GROUP.slice(1).map(
    (item) => item.imageUrl,
  );
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImage(
        (prevIndex) => (prevIndex + 1) % representativeRegionImages.length,
      );
    }, 2000);

    return () => clearInterval(intervalId);
  }, []);

  return createPortal(
    <div className="fixed inset-0 flex items-center justify-center z-[9999]">
      <div className="absolute inset-0">
        <Image
          src={representativeRegionImages[currentImage]}
          alt="Background Image"
          fill
          className="transition-opacity duration-1000 ease-in-out object-cover"
          priority
        />
      </div>
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
        <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
          <VscLoading className="animate-spin text-primary text-4xl mb-4" />
          <p className="text-gray-700 text-xl animate-pulse">
            추천 일정 만드는 중...
          </p>
        </div>
      </div>
    </div>,
    document.body,
  );
}
