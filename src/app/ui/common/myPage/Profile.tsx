"use client";

import { useProfile } from "@/app/hooks/useProfile";
import { useRouter } from "next/navigation";
import { ProfileSkeleton } from "../../profile/skeleton/ProfileSkeleton";
import Image from "next/image";

export default function Profile({ userId }: { userId: number }) {
  const router = useRouter();
  const { isLoading, data } = useProfile(userId);

  if (isLoading) return <ProfileSkeleton />;
  if (!data) return null;

  const { profileImg, userName } = data;

  return (
    <div className="relative flex flex-col items-center w-full md:w-[30%] bg-white rounded-xl shadow-md p-6">
      {profileImg ? (
        <Image
          src={profileImg}
          alt={userName || "Profile"}
          width={80}
          height={80}
          className="w-20 h-20 rounded-full object-cover mb-4"
          priority
        />
      ) : (
        <div className="w-20 h-20 rounded-full bg-gray-200 mb-4" />
      )}
      <p className="text-base text-black font-semibold">{userName}</p>
      <button
        className="bg-primary text-white rounded-lg py-2 px-4 mt-4 w-full md:text-sm"
        onClick={() => router.push("/mypage/edit-profile")}
      >
        프로필 수정하기
      </button>
    </div>
  );
}
