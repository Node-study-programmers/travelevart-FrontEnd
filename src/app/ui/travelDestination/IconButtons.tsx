"use client";
import { FaRegHeart, FaShareAlt } from "react-icons/fa";
import { PiEyesFill } from "react-icons/pi";
import Tooltip from "../common/Tooltip";
import useCartTravelDestination from "@/app/hooks/searchTrip/useCartTravelDestination";
import { MouseEvent, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import useGetCartTravelDestintaion, {
  ICartTravelDestinationResponse,
} from "@/app/hooks/searchTrip/useGetCartTravelDestination";
import { useSession } from "next-auth/react";

interface IconButtonsProps {
  likeNum: number;
  view: number;
  isSaved: boolean;
  placeId: number;
  refetch: () => void;
}

export default function IconButtons({
  likeNum,
  view,
  isSaved,
  placeId,
  refetch,
}: IconButtonsProps) {
  const router = useRouter();
  const { addCartMutation, deleteCartMutation } = useCartTravelDestination();
  const [totalSaveCount, setTotalSaveCount] = useState(likeNum);
  const [isAddedCart, setIsAddedCart] = useState(isSaved);
  const isLogin = Boolean(localStorage.getItem("accessToken"));
  const { data: userData } = useSession();
  const { data: myCartData } = useGetCartTravelDestintaion(
    isLogin,
    userData?.user?.userId,
  );

  useEffect(() => {
    if (myCartData) {
      const cartItem = myCartData.find(
        (item: ICartTravelDestinationResponse) =>
          item.place.placeId === placeId,
      );

      setIsAddedCart(!!cartItem);
      setTotalSaveCount(cartItem ? cartItem.place.totalSaveCount : likeNum);
    }
  }, [myCartData, placeId, likeNum]);

  useEffect(() => {
    if (myCartData) {
      const cartItem = myCartData.find(
        (item: ICartTravelDestinationResponse) =>
          item.place.placeId === placeId,
      );

      setIsAddedCart(!!cartItem);
      setTotalSaveCount(cartItem ? cartItem.place.totalSaveCount : likeNum);
    }
  }, [myCartData, placeId, likeNum]);

  const handleAddCartTravelDestination = async (
    e: MouseEvent<HTMLOrSVGElement>,
  ) => {
    if (!isLogin) {
      toast.info("로그인 후 이용 가능합니다.", { autoClose: 1500 });
      await new Promise((resolve) => setTimeout(resolve, 1000));
      router.replace("/auth/login");
      return;
    }

    // optimistic update
    if (isAddedCart) {
      deleteCartMutation.mutate(placeId, {
        onSuccess: () => {
          setIsAddedCart(false);
          setTotalSaveCount((prev) => prev - 1);
        },
        onError: () => {
          toast.error("찜 삭제에 실패했습니다.");
        },
      });
    } else {
      addCartMutation.mutate(placeId, {
        onSuccess: () => {
          setIsAddedCart(true);
          setTotalSaveCount((prev) => prev + 1);
        },
        onError: () => {
          toast.error("찜 추가에 실패했습니다.");
        },
      });
    }
  };

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

  return (
    <div className="flex justify-center items-start gap-6 mb-4">
      <Tooltip content="공유하기" direction="top">
        <button
          className="flex items-center justify-center w-8 h-8 rounded-full bg-primary border-2 border-primary text-white transition-transform duration-500 hover:rotate-[360deg] hover:bg-white hover:text-primary"
          aria-label="Share"
          onClick={handleShareLink}
        >
          <FaShareAlt className="text-lg" />
        </button>
      </Tooltip>
      <Tooltip content="찜하기" direction="top">
        <div className="text-center">
          <button
            className={`flex items-center justify-center w-8 h-8 rounded-full ${
              isAddedCart
                ? "bg-red-500 hover:bg-white hover:text-red-500 border-red-500"
                : "bg-primary hover:bg-white hover:text-primary border-primary"
            } border-2 text-white transition-transform duration-500 hover:rotate-[360deg]`}
            aria-label="Like"
            onClick={handleAddCartTravelDestination}
          >
            <FaRegHeart className="text-lg" />
          </button>
          <span
            className={`text-lg ${isAddedCart ? "text-red-500" : "text-primary"}`}
          >
            {totalSaveCount}
          </span>
        </div>
      </Tooltip>
      <Tooltip content="조회수" direction="top">
        <div className="text-center">
          <button
            className="flex items-center justify-center w-8 h-8 rounded-full bg-primary border-2 border-primary text-white transition-transform duration-500 hover:rotate-[360deg] hover:bg-white hover:text-primary"
            aria-label="View"
          >
            <PiEyesFill className="text-lg" />
          </button>
          <span className="text-lg text-primary">{view}</span>
        </div>
      </Tooltip>
    </div>
  );
}
