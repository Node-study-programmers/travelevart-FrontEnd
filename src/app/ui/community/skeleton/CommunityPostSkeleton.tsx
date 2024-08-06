import React from "react";

function CommunityFreePostSkeleton() {
  return (
    <div className="p-6 rounded-xl shadow-md h-auto w-full animate-pulse">
      <div className="flex items-center w-full">
        <div className="rounded-full bg-skeleton w-10 h-10"></div>
        <div className="ml-4 flex flex-col w-full">
          <div className="h-4 bg-skeleton rounded w-1/4 mb-2"></div>
          <div className="h-4 bg-skeleton rounded w-1/2 mb-2"></div>
          <div className="h-4 bg-skeleton rounded w-full mb-2"></div>
          <div className="h-4 bg-skeleton rounded w-full mb-2"></div>
          <div className="h-4 bg-skeleton rounded w-3/4 mb-2"></div>
        </div>
      </div>
    </div>
  );
}

export function CommunityFreePostSkeletons() {
  return (
    <>
      <CommunityFreePostSkeleton />
      <CommunityFreePostSkeleton />
      <CommunityFreePostSkeleton />
      <CommunityFreePostSkeleton />
      <CommunityFreePostSkeleton />
    </>
  );
}

function CommunityTravelPostSkeleton() {
  return (
    <div className="p-6 rounded-xl shadow-md h-auto w-full animate-pulse">
      <div className="flex items-center w-full">
        <div className="rounded-full bg-skeleton w-10 h-10" />
        <div className="ml-4 w-full">
          <div className="h-4 bg-skeleton rounded w-1/4 mb-2" />
          <div className="h-6 bg-skeleton rounded w-1/2 mb-2" />
          <div className="h-4 bg-skeleton rounded w-3/4" />
          <div className="h-4 bg-skeleton rounded w-1/2 mt-2" />
        </div>
      </div>
    </div>
  );
}

export function CommunityTravelPostSkeletons() {
  return (
    <>
      <CommunityTravelPostSkeleton />
      <CommunityTravelPostSkeleton />
      <CommunityTravelPostSkeleton />
      <CommunityTravelPostSkeleton />
      <CommunityTravelPostSkeleton />
    </>
  );
}

function CommentSkeleton() {
  return (
    <div className="p-4 flex gap-4 items-start border-b border-gray-200 animate-pulse">
      <div className="w-12 h-12 rounded-full bg-skeleton"></div>
      <div className="flex flex-col flex-1">
        <div className="h-4 bg-skeleton rounded w-1/4 mb-2"></div>
        <div className="h-4 bg-skeleton rounded w-full mb-2"></div>
        <div className="h-4 bg-skeleton rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-skeleton rounded w-1/2 mb-2"></div>
      </div>
    </div>
  );
}

export function CommentsSkeleton() {
  return (
    <div className="space-y-4">
      <CommentSkeleton />
      <CommentSkeleton />
      <CommentSkeleton />
      <CommentSkeleton />
      <CommentSkeleton />
    </div>
  );
}

function PopularPostSkeleton() {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md mb-4 animate-pulse">
      <div className="h-6 bg-skeleton rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-skeleton rounded w-full mb-2"></div>
      <div className="h-4 bg-skeleton rounded w-5/6 mb-2"></div>
      <div className="h-4 bg-skeleton rounded w-3/4 mb-2"></div>
    </div>
  );
}

export function PopularPostsSkeleton() {
  return (
    <div className="space-y-4">
      <PopularPostSkeleton />
      <PopularPostSkeleton />
      <PopularPostSkeleton />
      <PopularPostSkeleton />
      <PopularPostSkeleton />
    </div>
  );
}

export function DetailPageSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[7fr_3fr] mt-5 scroll-none">
      {/* 상세페이지부분 */}
      <div className="lg:pr-10 max-w-full">
        {/* 사용자 정보 */}
        <div className="flex justify-between p-4 animate-pulse">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-skeleton rounded-full border-[1px] border-transparent" />
            <div>
              <div className="h-4 bg-skeleton rounded w-24 mb-2" />
              <div className="h-3 bg-skeleton rounded w-20" />
            </div>
          </div>
          <div className="bg-skeleton rounded-lg flex justify-center items-center text-sm px-2 py-0.5 w-24">
            <div className="h-3 bg-skeleton rounded w-full" />
          </div>
        </div>

        {/* 제목과 본문 */}
        <div className="p-4 w-full">
          <div className="mb-6 w-full h-6 bg-skeleton rounded" />
          <div>
            <div className="h-4 bg-skeleton rounded w-full mb-3" />
            <div className="h-4 bg-skeleton rounded w-full mb-3" />
            <div className="h-4 bg-skeleton rounded w-full mb-3" />
          </div>
        </div>

        {/* 좋아요, 조회수, 댓글수 */}
        <div className="w-full py-5 shadow-xl mb-7">
          <div className="flex justify-between items-center mb-2">
            <div className="h-4 bg-skeleton rounded w-1/4" />
            <div className="h-4 bg-skeleton rounded w-1/4" />
            <div className="h-4 bg-skeleton rounded w-1/4" />
          </div>
        </div>

        {/* 댓글 입력 */}
        <div className="p-4 mb-6 bg-skeleton rounded">
          <div className="h-6 bg-skeleton rounded w-full mb-3" />
        </div>

        {/* 댓글 목록 */}
        <div className="space-y-4 mb-10 h-auto overflow-scroll">
          <div className="flex gap-3 mb-3 animate-pulse">
            <div className="w-10 h-10 bg-skeleton rounded-full" />
            <div className="flex flex-col gap-1 relative w-full">
              <div className="flex gap-3 items-center">
                <div className="h-4 bg-skeleton rounded w-24 mb-2" />
                <div className="h-3 bg-skeleton rounded w-20" />
              </div>
              <div className="h-4 bg-skeleton rounded w-full mb-2" />
              <div className="h-4 bg-skeleton rounded w-full" />
            </div>
          </div>

          {/* 스켈레톤 반복 */}
          <div className="flex gap-3 mb-3 animate-pulse">
            <div className="w-10 h-10 bg-skeleton rounded-full" />
            <div className="flex flex-col gap-1 relative w-full">
              <div className="flex gap-3 items-center">
                <div className="h-4 bg-skeleton rounded w-24 mb-2" />
                <div className="h-3 bg-skeleton rounded w-20" />
              </div>
              <div className="h-4 bg-skeleton rounded w-full mb-2" />
              <div className="h-4 bg-skeleton rounded w-full" />
            </div>
          </div>
        </div>
      </div>

      {/* 인기 게시물 부분 */}
      <PopularPostsSkeleton />
    </div>
  );
}
