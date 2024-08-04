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
