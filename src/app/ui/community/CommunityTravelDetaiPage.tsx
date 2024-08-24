import React from "react";
import useGetDetailTravelData from "@/app/hooks/custom/useGetDetailTravelData";
import Image from "next/image"; // Next.js의 Image 컴포넌트
import { PostContent } from "./CommunityTravelPost";
import { HiLocationMarker } from "react-icons/hi";
import Link from "next/link";

interface ICommunityTravelDetailProps {
  contents: PostContent[];
  travelRoute_id: number;
}

export default function CommunityTravelDetailPage({
  contents,
  travelRoute_id,
}: ICommunityTravelDetailProps) {
  const { data, isLoading } = useGetDetailTravelData(travelRoute_id);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
        Loading...
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
        No data found
      </div>
    );
  }

  return (
    <div className="bg-gray-900 text-white font-sans">
      {data.items.map((item, itemIndex) => (
        <div key={itemIndex} className="relative min-h-screen flex flex-col">
          {/* Day Header */}
          <div className="bg-gray-800 text-white text-center py-4">
            <h1 className="text-3xl font-bold">Day {itemIndex + 1}</h1>
          </div>

          {/* 세부일정 목록 */}
          <div className="relative flex flex-col">
            {item.details.map((detail, detailIndex) => {
              const matchingContent = contents.find(
                (content) => content.detailtravel_id === detail.detailtravelId,
              );

              return (
                <div
                  key={detailIndex}
                  className="relative min-h-screen flex flex-col"
                >
                  {/* 세부일정 배경 이미지 */}
                  <div className="absolute inset-0 z-0">
                    <Image
                      src={
                        detail.placeImage ||
                        `https://cdn.pixabay.com/photo/2019/11/23/03/08/valley-4646114_1280.jpg`
                      }
                      alt={`Background for ${detail.placeTitle}`}
                      layout="fill"
                      objectFit="cover"
                      className="brightness-50"
                    />
                  </div>

                  <div className="relative z-10 px-4 py-16 lg:py-24">
                    {/* 텍스트 컨테이너 */}
                    <div className="bg-white bg-opacity-90 text-gray-900 p-6 lg:p-8 rounded-lg shadow-lg lg:mx-10">
                      <Link href={`/search-trip/${detail.detailtravelId}`}>
                        <h3 className="text-lg lg:text-xl font-semibold mb-2 cursor-pointer hover:underline">
                          {detail.placeTitle}
                        </h3>
                      </Link>
                      <div className="flex items-center text-gray-700 mb-2">
                        <HiLocationMarker className="mr-2 text-xl" />
                        <p className="italic">{detail.address}</p>
                      </div>
                      <p className="text-sm lg:text-base leading-relaxed mb-4">
                        {detail.contents}
                      </p>
                      {matchingContent && (
                        <>
                          {matchingContent.image && (
                            <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden">
                              <Image
                                priority
                                src={
                                  matchingContent.image ||
                                  `https://cdn.pixabay.com/photo/2019/11/23/03/08/valley-4646114_1280.jpg`
                                }
                                alt={`Content for ${detail.placeTitle}`}
                                layout="fill"
                                objectFit="cover"
                                className="absolute inset-0"
                              />
                            </div>
                          )}
                          <p className="text-gray-800 text-sm lg:text-base">
                            {matchingContent.text}
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
