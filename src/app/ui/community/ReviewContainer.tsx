import React from "react";
import Image from "next/image";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import StarRating from "@/app/ui/travelDestination/StarRating";

interface ReviewContainerProps {
  review: {
    createdAt: string;
    id: number;
    placeId: number;
    ratingValue: number;
    review: string;
    user: {
      id: number;
      profileImg: string;
      userName: string;
    };
  };
}

export default function ReviewContainer({ review }: ReviewContainerProps) {
  const { createdAt, ratingValue, review: reviewText, user } = review;

  const formattedDate = format(new Date(createdAt), "yyyy년 MM월 dd일", {
    locale: ko,
  });

  return (
    <div className="p-4 mb-4 bg-white shadow-sm">
      <div className="flex items-start gap-3">
        <Image
          src={user.profileImg || "https://via.placeholder.com/40"}
          alt={user.userName}
          width={40}
          height={40}
          className="rounded-full"
        />
        <div className="flex flex-col w-full">
          <div className="flex items-center justify-between mb-2">
            <div className="text-lg font-semibold">{user.userName}</div>
            <div className="text-sm text-gray-500">{formattedDate}</div>
          </div>
          <div className="mb-2">
            <StarRating rating={ratingValue} />
          </div>
          <p className="text-base text-gray-700">{reviewText}</p>
        </div>
      </div>
    </div>
  );
}
