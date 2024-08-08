import useLogin from "@/app/hooks/auth/useLogin";
import Image from "next/image";
import { MouseEvent } from "react";
import { FaHeart, FaStar } from "react-icons/fa";

interface IAllTravelDestinationProps {
  representativeImg: string;
  address: string;
  title: string;
  placeId: number;
}

export default function AllTravelDestination({
  representativeImg,
  address,
  title,
  placeId,
}: IAllTravelDestinationProps) {
  const { userData } = useLogin();

  const handleAddCartTravelDestination = (e: MouseEvent<SVGElement>) => {
    e.preventDefault();

    // 찜 API 호출
    console.log(`${placeId} 장소 찜하기 버튼 클릭!`);
  };

  return (
    <div>
      <div className="relative">
        <Image
          src={
            representativeImg ||
            "https://cdn.pixabay.com/photo/2024/02/21/08/44/woman-8587090_1280.png"
          }
          alt={title}
          width={1000}
          height={1000}
          className="rounded-2xl"
        />
        <FaHeart
          className={`absolute top-4 right-4 text-xl cursor-pointer stroke-[25px] stroke-white hover:scale-110 hover:fill-red-400 transition-transform duration-300 ease-in-out`}
          onClick={handleAddCartTravelDestination}
        />
      </div>
      <div className="flex flex-col py-2 gap-y-1">
        {/* 여행지 & 별점 */}
        <div className="flex justify-between items-center sm text-sm">
          <div className="w-3/5">{title.split("(")[0]}</div>
          <div className="flex items-center gap-x-2">
            <FaStar />
            별점
          </div>
        </div>
        {/* 주소 */}
        <p className="text-rgb-primary text-xs">{address.split("(")[0]}</p>
      </div>
    </div>
  );
}
