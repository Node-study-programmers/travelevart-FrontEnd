import useLogin from "@/app/hooks/auth/useLogin";
import useGetCartTravelDestintaion from "@/app/hooks/searchTrip/useGetCartTravelDestination";
import Image from "next/image";
import { MouseEvent } from "react";
import { FaHeart, FaStar } from "react-icons/fa";
import TravelDestinationSkeletons from "./skeleton/TravelDestinationSkeleton";
import useCartTravelDestination from "@/app/hooks/searchTrip/useCartTravelDestination";
import PageContainer from "../common/PageContainer";
import { useRouter } from "next/navigation";

interface IAllTravelDestinationProps {
  representativeImg: string;
  address: string;
  title: string;
  placeId: number;
  rating: string | null;
  isInCustom?: boolean;
}

export default function AllTravelDestination({
  representativeImg,
  address,
  title,
  placeId,
  rating,
  isInCustom = false,
}: IAllTravelDestinationProps) {
  const router = useRouter();
  const isLogin = localStorage.getItem("accessToken");
  const { data, isLoading, refetch } = useGetCartTravelDestintaion(
    Boolean(isLogin),
  );
  const { addCartMutation, deleteCartMutation } = useCartTravelDestination();

  const cartItems = data?.map((item) => item.place.placeId);

  const handleAddCartTravelDestination = async (e: MouseEvent<SVGElement>) => {
    e.preventDefault();

    if (!localStorage.getItem("accessToken")) {
      alert("로그인이 필요합니다.");
      router.replace("/auth/login");
      return;
    }

    if (cartItems?.includes(placeId)) {
      await deleteCartMutation.mutateAsync(placeId);
    } else {
      await addCartMutation.mutateAsync(placeId);
    }
    // 변경 내역 리패치
    refetch();
  };

  if (isLoading) {
    return (
      <PageContainer>
        <TravelDestinationSkeletons />
      </PageContainer>
    );
  }

  return (
    <>
      {!isInCustom ? (
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
              className={`absolute top-4 right-4 text-xl stroke-[25px] stroke-white hover:scale-110 ${
                cartItems?.includes(placeId) ? "fill-red-500" : "fill-cart"
              } hover:fill-red-500 transition-transform duration-300 ease-in-out`}
              onClick={handleAddCartTravelDestination}
            />
          </div>
          <div className="flex flex-col py-2 gap-y-1">
            {/* 여행지 & 별점 */}
            <div className="flex justify-between items-center sm text-sm">
              <div className="w-3/5">{title.split("(")[0]}</div>
              <div className="flex items-center gap-x-2">
                <FaStar className="fill-yellow-400" />
                {rating ? rating : ["0", "0"].join(".")}
              </div>
            </div>
            {/* 주소 */}
            <p className="text-rgb-primary text-xs">{address.split("(")[0]}</p>
          </div>
        </div>
      ) : (
        <div className="h-full border-b-[1px] border-gray-300">
          <div className="relative">
            <Image
              src={
                representativeImg ||
                "https://cdn.pixabay.com/photo/2024/02/21/08/44/woman-8587090_1280.png"
              }
              alt={title}
              width={50}
              height={50}
              className="rounded-full object-cover w-12 h-12"
            />
          </div>
          <div className="flex flex-col py-2 gap-y-1">
            {/* 여행지 & 별점 */}
            <div className="flex justify-between items-center sm text-sm">
              <div className="w-3/5">{title.split("(")[0]}</div>
              <div className="flex items-center gap-x-2">
                <FaStar className="fill-yellow-400" />
                {rating ? rating : ["0", "0"].join(".")}
              </div>
            </div>
            {/* 주소 */}
            <p className="text-rgb-primary text-xs">{address.split("(")[0]}</p>
          </div>
        </div>
      )}
    </>
  );
}
