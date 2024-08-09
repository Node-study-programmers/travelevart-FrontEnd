"use client";

import React, { useState, useEffect, useRef } from "react";
import PageContainer from "@/app/ui/common/PageContainer";
import IconButtons from "@/app/ui/travelDestination/IconButtons";
import Image from "next/image";
import StarRating from "@/app/ui/travelDestination/StarRating";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { useRouter } from "next/navigation";
import CategoryTabs from "@/app/ui/common/CategoryTabs";
import { IoMdArrowRoundBack } from "react-icons/io";
import DetailContents from "@/app/ui/community/DetailContents";
import { IoLocationSharp } from "react-icons/io5";
import { DetailTravelPageSkeleton } from "@/app/ui/travelDestination/skeleton/DetailPageSkeleton";
import useGetDetailTravelPage from "@/app/hooks/searchTrip/useGetDetailTravelPage";

const categories = [
  { id: 0, title: "전체" },
  { id: 1, title: "상세정보" },
  { id: 2, title: "리뷰" },
];

export default function SearchTripDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const [focusTab, setFocusTab] = useState<number>(0);
  const detailContentsRef = useRef<HTMLDivElement>(null);
  const {
    data: detailPageData,
    isLoading,
    refetch,
  } = useGetDetailTravelPage(params.id);

  useEffect(() => {
    if (detailContentsRef.current) {
      detailContentsRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [focusTab]);

  if (isLoading) {
    return (
      <PageContainer>
        <DetailTravelPageSkeleton />
      </PageContainer>
    );
  }

  if (!detailPageData) {
    return <div>No data</div>;
  }

  const { averageRating, isSaved, item, totalSaveCount } = detailPageData;

  return (
    <PageContainer>
      <div className="flex flex-col gap-3 relative">
        <div
          className="w-full h-16 items-center flex gap-3 cursor-pointer lg:hidden"
          onClick={() => router.back()}
        >
          <IoMdArrowRoundBack className="text-xl font-bold" />
        </div>
        <div className="relative w-full aspect-video">
          <Image
            fill
            priority
            className="object-cover rounded-2xl"
            alt="detailImage"
            src={
              item.image
                ? item.image
                : "https://cdn.pixabay.com/photo/2024/02/21/08/44/woman-8587090_1280.png"
            }
          />
        </div>
        {/* overview */}
        <div className="w-full text-3xl pt-10 pb-10 lg:pb-0 flex justify-between">
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <div className="text-2xl">{item.title}</div>
              <div className="text-base text-gray-500 flex items-center gap-2">
                <IoLocationSharp />
                {item.address}
              </div>
            </div>
            <div className="flex text-base items-center gap-3">
              <StarRating rating={averageRating} /> {averageRating}
            </div>
          </div>
          <IconButtons
            likeNum={totalSaveCount}
            view={item.viewCount}
            isSaved={isSaved}
            placeId={Number(params.id)}
            refetch={refetch}
          />
        </div>
        {/* 상세정보 */}
        <div className="relative" ref={detailContentsRef}>
          <div className="sticky top-16 z-10 bg-white">
            <CategoryTabs
              categories={categories}
              focusTab={focusTab}
              setFocusTab={setFocusTab}
            />
          </div>
          <div className="py-20 h-auto">
            <DetailContents idx={focusTab} data={item} />
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
