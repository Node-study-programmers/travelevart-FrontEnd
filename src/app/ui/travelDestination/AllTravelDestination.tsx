import useGetCartTravelDestintaion, {
  ICartPlace,
  ICartTravelDestinationResponse,
} from "@/app/hooks/searchTrip/useGetCartTravelDestination";
import Image from "next/image";
import { MouseEvent, useEffect, useState } from "react";
import { FaHeart, FaStar } from "react-icons/fa";
import DetailModal from "../customTravel/Modal/DetailModal";
import { CiSquareMore } from "react-icons/ci";
import { FiPlusSquare } from "react-icons/fi";
import Tooltip from "../common/Tooltip";
import DropDown from "../common/DropDown";
import { ITravelItems } from "@/app/travel-route/custom/[id]/page";
import { ITravelDestination } from "@/app/hooks/searchTrip/useTravelDestinationInfiniteQuery";
import { TravelItem } from "@/app/hooks/searchTrip/useGetDetailTravelPage";
import useCartTravelDestination from "@/app/hooks/searchTrip/useCartTravelDestination";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

interface IAllTravelDestinationProps {
  representativeImg: string;
  address: string;
  title: string;
  placeId: number;
  rating: string | null;
  isInCustom?: boolean;
  items?: ITravelItems;
  destination?: ITravelDestination;
  handleAddPlan?: (value: string, item: TravelItem | ICartPlace) => void;
}

export default function AllTravelDestination({
  representativeImg,
  address,
  title,
  placeId,
  rating,
  isInCustom = false,
  items,
  destination,
  handleAddPlan,
}: IAllTravelDestinationProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const isLogin = Boolean(localStorage.getItem("accessToken"));
  const [isAdded, setIsAdded] = useState(false); // 찜 여부
  const { addCartMutation, deleteCartMutation } = useCartTravelDestination();
  const { data: myCartData } = useGetCartTravelDestintaion(isLogin);
  const router = useRouter();

  // 여행지 애니메이션
  useEffect(() => {
    setTimeout(() => {
      setIsVisible(true);
    }, 100);
  }, []);

  useEffect(() => {
    if (myCartData) {
      const isSaved = myCartData.some(
        (item: ICartTravelDestinationResponse) =>
          item.place.placeId === placeId,
      );
      setIsAdded(isSaved);
    }
  }, [myCartData, placeId]);

  const handleOpenModal = (id: string) => {
    setSelectedId(id);
    setIsModalOpen(true);
  };

  // optimistic update
  const handleToggleLike = async (e: MouseEvent<SVGElement>) => {
    e.preventDefault();

    if (!isLogin) {
      toast.info("로그인 후 이용 가능합니다.", { autoClose: 1500 });
      await new Promise((resolve) => setTimeout(resolve, 1000));
      router.replace("/auth/login");
      return;
    }

    if (isAdded) {
      setIsAdded(false);
      deleteCartMutation.mutate(placeId, {
        onError: () => {
          setIsAdded(true);
        },
      });
    } else {
      setIsAdded(true);
      addCartMutation.mutate(placeId, {
        onError: () => {
          setIsAdded(false);
        },
      });
    }
  };

  return (
    <div
      className={`transition-opacity transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      } duration-700 ease-in-out w-full h-80`}
    >
      {!isInCustom ? (
        <div className="relative w-full h-full bg-white rounded-lg shadow-lg overflow-hidden">
          <Image
            src={
              representativeImg ||
              "https://cdn.pixabay.com/photo/2024/02/21/08/44/woman-8587090_1280.png"
            }
            alt={title}
            width={500}
            height={300}
            className="object-cover w-full h-3/5"
          />
          <FaHeart
            className={`absolute top-4 right-4 text-xl stroke-[25px] stroke-white hover:scale-110 transition-transform duration-300 ease-in-out ${isAdded ? "fill-red-500" : "fill-cart"}`}
            onClick={handleToggleLike}
          />
          <div className="p-4 flex flex-col h-2/5">
            {/* 여행지 & 별점 */}
            <div className="flex justify-between items-center mb-2">
              <div className="text-lg font-semibold">{title.split("(")[0]}</div>
              <div className="flex items-center gap-x-2">
                {/* 별점 있는 여행지만 별점 노출 */}
                {rating ? (
                  <>
                    <FaStar className="text-black" />
                    <p>{rating}</p>
                  </>
                ) : null}
              </div>
            </div>
            {/* 주소 */}
            <p className="text-rgb-primary text-sm">{address.split("(")[0]}</p>
          </div>
        </div>
      ) : (
        <div className="h-full border-b border-gray-300 flex justify-between items-center py-4 px-2">
          <div className="flex items-center flex-grow gap-3">
            <Image
              src={
                representativeImg ||
                "https://cdn.pixabay.com/photo/2024/02/21/08/44/woman-8587090_1280.png"
              }
              alt={title}
              width={80}
              height={80}
              className="rounded-xl object-cover"
            />
            <div className="flex flex-col text-sm w-full overflow-hidden">
              {/* 여행지 & 별점 */}
              <p className="font-semibold truncate">{title.split("(")[0]}</p>
              <p className="text-rgb-primary text-xs truncate">
                {address.split("(")[0]}
              </p>
              {/* 별점 있는 여행지만 별점 노출 */}
              <div className="flex items-center gap-x-2 mt-1">
                {rating ? (
                  <>
                    <FaStar className="text-black" />
                    <p>{rating}</p>
                  </>
                ) : null}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-1 ml-2">
            <Tooltip content="상세보기" direction="bottom">
              <button
                onClick={() => handleOpenModal(String(placeId))}
                className="text-secondary text-2xl"
              >
                <CiSquareMore />
              </button>
            </Tooltip>
            <DropDown
              contents={Object.keys(items!)}
              handleClickValue={(selectedValue) =>
                handleAddPlan(selectedValue, destination)
              }
            >
              <div className="text-primary text-2xl cursor-pointer">
                <FiPlusSquare />
              </div>
            </DropDown>
          </div>
          {selectedId && (
            <DetailModal
              id={selectedId}
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
            />
          )}
        </div>
      )}
    </div>
  );
}
