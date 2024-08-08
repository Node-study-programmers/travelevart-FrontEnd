"use client";

import React from "react";
import { IoLocationSharp } from "react-icons/io5";
import { IoMdArrowRoundBack } from "react-icons/io";

function SkeletonImage() {
  return (
    <div className="relative w-full aspect-video bg-skeleton rounded-2xl animate-pulse">
      {/* Placeholder for image */}
    </div>
  );
}

function SkeletonBackButton() {
  return (
    <div className="w-full h-16 items-center flex gap-3 cursor-pointer lg:hidden bg-skeleton rounded animate-pulse">
      <IoMdArrowRoundBack className="text-xl font-bold text-gray-400" />
    </div>
  );
}

function SkeletonOverview() {
  return (
    <div className="w-full text-3xl pt-10 pb-10 lg:pb-0 flex justify-between animate-pulse">
      <div className="flex flex-col gap-5 w-3/4">
        <div className="flex flex-col gap-2">
          <div className="h-8 bg-skeleton rounded w-1/2" /> {/* Title */}
          <div className="text-base text-gray-500 flex items-center gap-2">
            <IoLocationSharp className="text-gray-400" />
            <div className="h-4 bg-skeleton rounded w-3/4" /> {/* Address */}
          </div>
        </div>
        <div className="flex text-base items-center gap-3">
          <div className="h-6 bg-skeleton rounded w-24" /> {/* Rating */}
          <div className="h-6 bg-skeleton rounded w-12" /> {/* Rating number */}
        </div>
      </div>
      <div className="flex gap-2 w-1/4">
        <div className="h-8 bg-skeleton rounded-full w-24" />
        {/* Like Button */}
        <div className="h-8 bg-skeleton rounded-full w-24" />
        <div className="h-8 bg-skeleton rounded-full w-24" />
        {/* View Count Button */}
      </div>
    </div>
  );
}

function SkeletonCategoryTabs() {
  return (
    <div className="flex gap-4 p-4 animate-pulse">
      <div className="h-8 bg-skeleton rounded w-1/3" /> {/* Tab 1 */}
      <div className="h-8 bg-skeleton rounded w-1/3" /> {/* Tab 2 */}
      <div className="h-8 bg-skeleton rounded w-1/3" /> {/* Tab 3 */}
    </div>
  );
}

function SkeletonDetailContents() {
  return (
    <div className="p-6 rounded-xl h-auto w-full animate-pulse">
      <div className="h-8 bg-skeleton rounded w-48 mb-5"></div>
      <div className="h-4 bg-skeleton rounded w-full mb-2"></div>
      <div className="h-4 bg-skeleton rounded w-full mb-2"></div>
      <div className="h-4 bg-skeleton rounded w-full mb-2"></div>
      <div className="h-4 bg-skeleton rounded w-full mb-2"></div>
      <div className="h-4 bg-skeleton rounded w-3/4"></div>
    </div>
  );
}

export function DetailTravelPageSkeleton() {
  return (
    <div className="flex flex-col gap-3 relative animate-pulse">
      <SkeletonBackButton />
      <SkeletonImage />
      <SkeletonOverview />
      <div className="relative">
        <div className="sticky top-16 z-10 bg-white">
          <SkeletonCategoryTabs />
        </div>
        <div className="py-20 h-auto">
          <SkeletonDetailContents />
        </div>
      </div>
    </div>
  );
}

function SkeletonProfileImage() {
  return (
    <div className="w-10 h-10 rounded-full border-[1px] border-gray-200 bg-gray-300 animate-pulse"></div>
  );
}

function SkeletonStarInput() {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, index) => (
        <div
          key={index}
          className="w-6 h-6 bg-gray-300 rounded-full animate-pulse"
        />
      ))}
    </div>
  );
}

function SkeletonTextarea() {
  return <div className="w-full bg-gray-300 h-24 rounded-md animate-pulse" />;
}

function SkeletonButton() {
  return (
    <div className="bg-gray-300 text-white px-4 py-2 rounded-lg w-full h-10 animate-pulse" />
  );
}

export function ReviewWithStarSkeleton() {
  return (
    <form className={`p-4 flex gap-3 items-start w-full`}>
      <SkeletonProfileImage />
      <div className="w-full flex flex-col gap-2">
        {/* 별점 선택 UI */}
        <SkeletonStarInput />

        {/* 리뷰 입력 */}
        <SkeletonTextarea />

        {/* 버튼 */}
        <SkeletonButton />
      </div>
    </form>
  );
}

function ReviewContainerSkeleton() {
  return (
    <div className="p-4 mb-4 bg-white shadow-sm animate-pulse">
      <div className="flex items-start gap-3">
        {/* 프로필 이미지 스켈레톤 */}
        <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
        <div className="flex flex-col w-full">
          <div className="flex items-center justify-between mb-2">
            {/* 사용자 이름 스켈레톤 */}
            <div className="w-24 h-4 bg-gray-300 rounded"></div>
            {/* 날짜 스켈레톤 */}
            <div className="w-16 h-4 bg-gray-300 rounded"></div>
          </div>
          {/* 별점 스켈레톤 */}
          <div className="mb-2 flex items-center gap-1">
            <div className="w-20 h-4 bg-gray-300 rounded"></div>
          </div>
          {/* 리뷰 텍스트 스켈레톤 */}
          <div className="w-full h-16 bg-gray-300 rounded"></div>
        </div>
      </div>
    </div>
  );
}

export function ReviewContainerSkeletons() {
  return (
    <>
      <ReviewContainerSkeleton />
      <ReviewContainerSkeleton />
      <ReviewContainerSkeleton />
    </>
  );
}
