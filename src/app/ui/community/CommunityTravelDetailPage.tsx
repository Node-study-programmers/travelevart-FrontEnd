import React, { useState } from "react";
import useGetDetailTravelData from "@/app/hooks/custom/useGetDetailTravelData";
import Image from "next/image";
import { PostContent } from "./CommunityTravelPost";
import { HiLocationMarker } from "react-icons/hi";
import Link from "next/link";
import { CiMemoPad } from "react-icons/ci";
import Loading from "@/app/loading";
import { BiFork } from "react-icons/bi";
import useForkPost from "@/app/hooks/community/useForkPost";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface ICommunityTravelDetailProps {
  contents: PostContent[];
  travelRoute_id: number;
}

export default function CommunityTravelDetailPage({
  contents,
  travelRoute_id,
}: ICommunityTravelDetailProps) {
  const { data, isLoading } = useGetDetailTravelData(travelRoute_id);
  const forkPostMutation = useForkPost(contents[0].postId);
  const [showMore, setShowMore] = useState<boolean[]>([]);

  if (isLoading) {
    return <Loading />;
  }

  if (!data) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
        No data found
      </div>
    );
  }

  const handleShowMoreClick = (index: number) => {
    setShowMore((prevState) => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      return newState;
    });
  };

  const handleForkPost = async () => {
    try {
      await forkPostMutation.mutateAsync();
      toast.success("포크 되었습니다!");
    } catch (error) {
      toast.error("포크 중 에러가 발생했습니다.");
    }
  };

  return (
    <div className="bg-white text-gray-900 font-sans relative sm:px-8">
      <div className="flex flex-col gap-8">
        {data.items.map((item, itemIndex) => (
          <div key={itemIndex} className="relative flex flex-col py-8">
            <div className="flex items-center justify-center bg-primary text-white py-2 mb-6 relative z-10 rounded-2xl">
              <h1 className="text-xl sm:text-2xl font-semibold">
                Day {itemIndex + 1}
              </h1>
            </div>

            {item.details.map((detail, detailIndex) => {
              const matchingContent = contents.find(
                (content) => content.detailtravel_id === detail.detailtravelId,
              );

              return (
                <div
                  key={detailIndex}
                  className="relative flex flex-col lg:mb-20"
                >
                  <div className="absolute top-4 right-4 bg-gray-800 text-white text-xs px-2 py-1 rounded-lg shadow-md">
                    {detailIndex + 1}
                  </div>

                  <div className="bg-gray-50 shadow-lg rounded-t-lg overflow-hidden flex flex-col sm:flex-row lg:pb-10">
                    <div className="relative w-full sm:w-1/2 h-0 pb-[56.25%]">
                      <Image
                        src={
                          detail.placeImage ||
                          `https://cdn.pixabay.com/photo/2019/11/23/03/08/valley-4646114_1280.jpg`
                        }
                        alt={`Image for ${detail.placeTitle}`}
                        layout="fill"
                        objectFit="cover"
                        className="brightness-75 rounded-t-lg sm:rounded-l-lg"
                      />
                    </div>

                    <div className="w-full sm:w-1/2 p-6 flex flex-col lg:justify-around gap-4">
                      <Link href={`/search-trip/${detail.placeId}`}>
                        <h3 className="text-xl font-bold mb-4 text-primary cursor-pointer hover:underline">
                          {detail.placeTitle}
                        </h3>
                      </Link>
                      <div className="flex items-center text-gray-700 pb-4">
                        <HiLocationMarker className="mr-2 text-2xl text-primary" />
                        <p className="italic">{detail.address}</p>
                      </div>
                    </div>
                  </div>

                  {/* Content section */}
                  {matchingContent && (
                    <div className="bg-gray-50 shadow-lg rounded-b-lg p-6">
                      <h2 className="text-xl font-semibold mb-4">여행 기록</h2>
                      {matchingContent.image && (
                        <div className="relative w-full h-0 pb-[56.25%] mb-4 rounded-lg overflow-hidden">
                          <Image
                            priority
                            src={
                              matchingContent.image ||
                              `https://cdn.pixabay.com/photo/2019/11/23/03/08/valley-4646114_1280.jpg`
                            }
                            alt={`Content for ${detail.placeTitle}`}
                            layout="fill"
                            objectFit="cover"
                          />
                        </div>
                      )}
                      <p className="text-base leading-relaxed mb-4 flex items-center gap-3 p-4 bg-gray-100 border border-gray-300 rounded-lg shadow-md">
                        <CiMemoPad className="text-primary text-xl" />
                        <span className="text-gray-800">{detail.contents}</span>
                      </p>
                      <div className="relative">
                        <p
                          className={`text-sm lg:text-base transition-all duration-300 ${
                            showMore[detailIndex]
                              ? "line-clamp-none"
                              : "line-clamp-4"
                          }`}
                        >
                          {matchingContent.text}
                        </p>
                        {matchingContent.text.length > 100 && (
                          <button
                            onClick={() => handleShowMoreClick(detailIndex)}
                            className="text-primary mt-2 text-sm"
                          >
                            {showMore[detailIndex] ? "Show Less" : "Show More"}
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Fork Button */}
      <div
        className="bg-primary text-white p-3 rounded-full shadow-lg gap-2 cursor-pointer mt-8 flex items-center justify-center hover:opacity-80 transition-opacity duration-300"
        onClick={handleForkPost}
      >
        <BiFork className="text-lg sm:text-xl" />
        <span className="text-xs sm:text-sm ml-2">Fork</span>
      </div>
    </div>
  );
}
