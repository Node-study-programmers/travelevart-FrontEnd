"use client";

import React from "react";
import Image from "next/image";
import { useForm, Controller } from "react-hook-form";
import StarRating from "./StarRating"; // 위치에 맞게 수정
import StarInput from "./StarInput";
import useLogin from "@/app/hooks/auth/useLogin";
import { ReviewWithStarSkeleton } from "./skeleton/DetailPageSkeleton";
import useAddReview from "@/app/hooks/searchTrip/useAddReview";
import { signIn } from "next-auth/react";

interface FormValues {
  rating: number;
  review: string;
}

export default function ReviewWithStar({
  detailId,
  refetch,
}: {
  detailId: number;
  refetch: () => void;
}) {
  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      rating: 0,
      review: "",
    },
  });
  const { userData, status } = useLogin();
  const rating = watch("rating");
  const review = watch("review");
  const { mutate } = useAddReview(detailId);

  const onSubmit = (data: FormValues) => {
    mutate(
      { ratingValue: data.rating, review: data.review },
      {
        onSuccess: (res) => {
          reset();
          window.alert(res.message);
          refetch();
        },
      },
    );
  };

  const isSubmitDisabled = rating === 0 || review.trim() === "";

  if (status === "loading") {
    return <ReviewWithStarSkeleton />;
  }

  if (!userData) {
    return (
      <div
        className="flex justify-center items-center text-gray-600 w-full h-36 cursor-pointer"
        onClick={() => signIn()}
      >
        로그인 후 리뷰를 작성해주세요.
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`p-4 flex gap-3 ${status === "unauthenticated" && "cursor-pointer"} items-start w-full`}
    >
      <Image
        src={
          status === "unauthenticated"
            ? "http://t1.kakaocdn.net/account_images/default_profile.jpeg.twg.thumb.R640x640"
            : userData?.user?.profileImg
        }
        alt="profile"
        width={40}
        height={40}
        className="rounded-full border-[1px] border-transparent w-10 h-10"
      />
      <div className="w-full flex flex-col gap-2">
        {/* 별점 선택 UI */}
        <div className="flex gap-5 pl-2">
          <div className="max-w-24 overflow-hidden text-ellipsis">
            {userData.user.name}
          </div>
          <Controller
            name="rating"
            control={control}
            render={({ field }) => (
              <StarInput rating={field.value} onRatingChange={field.onChange} />
            )}
          />
        </div>

        {/* 리뷰 입력 */}
        <Controller
          name="review"
          control={control}
          render={({ field }) => (
            <textarea
              {...field}
              autoComplete="off"
              placeholder="리뷰를 작성해주세요"
              className={`w-full outline-none border border-gray-300 rounded-md py-4 px-3 resize-none ${status === "unauthenticated" && "cursor-pointer"}`}
              rows={4}
            />
          )}
        />
        <button
          type="submit"
          disabled={isSubmitDisabled || isSubmitting}
          className={`bg-primary text-white px-4 py-2 rounded-lg whitespace-nowrap ${isSubmitDisabled ? "bg-gray-300 cursor-not-allowed" : "hover:bg-secondary"}`}
        >
          등록
        </button>
      </div>
    </form>
  );
}
