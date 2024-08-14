"use client";

import React, { useState, useEffect, useRef } from "react";
import PageContainer from "@/app/ui/common/PageContainer";
import IconButtons from "@/app/ui/travelDestination/IconButtons";
import Image from "next/image";
import StarRating from "@/app/ui/travelDestination/StarRating";
import { IoMdArrowRoundBack, IoMdClose } from "react-icons/io";
import CategoryTabs from "@/app/ui/common/CategoryTabs";
import DetailContents from "@/app/ui/community/DetailContents";
import { IoLocationSharp } from "react-icons/io5";
import { DetailTravelPageSkeleton } from "@/app/ui/travelDestination/skeleton/DetailPageSkeleton";
import useGetDetailTravelPage from "@/app/hooks/searchTrip/useGetDetailTravelPage";

const categories = [
  { id: 0, title: "전체" },
  { id: 1, title: "상세정보" },
  { id: 2, title: "리뷰" },
];

interface DetailModalProps {
  id: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function DetailModal({ id, isOpen, onClose }: DetailModalProps) {
  const [focusTab, setFocusTab] = useState<number>(0);
  const detailContentsRef = useRef<HTMLDivElement>(null);
  const { data: detailPageData, isLoading } = useGetDetailTravelPage(id);

  useEffect(() => {
    if (detailContentsRef.current) {
      detailContentsRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [focusTab]);

  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
      onClick={handleOutsideClick}
    >
      <button className="absolute top-2 right-2 text-white" onClick={onClose}>
        <IoMdClose className="text-2xl" />
      </button>
      <div className="bg-white p-6 rounded-lg max-w-4xl w-full h-3/4 overflow-auto relative">
        {isLoading ? (
          <PageContainer>
            <DetailTravelPageSkeleton />
          </PageContainer>
        ) : !detailPageData ? (
          <div>No data</div>
        ) : (
          <div className="flex flex-col gap-3 relative">
            <div
              className="w-full h-16 items-center flex gap-3 cursor-pointer lg:hidden"
              onClick={onClose}
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
                  detailPageData.item.image
                    ? detailPageData.item.image
                    : "https://cdn.pixabay.com/photo/2024/02/21/08/44/woman-8587090_1280.png"
                }
              />
            </div>
            <div className="w-full text-3xl pt-10 pb-10 lg:pb-0 flex justify-between">
              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                  <div className="text-2xl">{detailPageData.item.title}</div>
                  <div className="text-base text-gray-500 flex items-center gap-2">
                    <IoLocationSharp />
                    {detailPageData.item.address}
                  </div>
                </div>
                <div className="flex text-base items-center gap-3">
                  <StarRating rating={detailPageData.averageRating} />{" "}
                  {detailPageData.averageRating}
                </div>
              </div>
            </div>
            <div className="relative" ref={detailContentsRef}>
              <div className="z-10 bg-white">
                <CategoryTabs
                  categories={categories}
                  focusTab={focusTab}
                  setFocusTab={setFocusTab}
                />
              </div>
              <div className="py-20 h-auto">
                <DetailContents
                  idx={focusTab}
                  data={detailPageData.item}
                  isModal
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
