"use client";

import useLogin from "@/app/hooks/auth/useLogin";
import { useProfile } from "@/app/hooks/useProfile";
import { useRouter } from "next/navigation";
import { ProfileSkeleton } from "./skeleton/ProfileSkeleton";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function UserProfile({ userId }: { userId: number }) {
  const { userData } = useLogin();
  const { isLoading, data } = useProfile(userId);
  const [profileImg, setProfileImg] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [isMyProfile, setIsMyProfile] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (userData && userData.user.userId === Number(userId)) {
      setIsMyProfile(true);
    }
  }, [userData, userId]);

  useEffect(() => {
    if (data) {
      setProfileImg(data.profileImg);
      setUserName(data.userName);
    }
  }, [data]);

  if (isLoading) {
    return <ProfileSkeleton />;
  }

  return (
    <div className="relative flex flex-col items-center w-full md:w-[30%] md:justify-center bg-white rounded-xl shadow-md p-6 lg:mt-5 md:mt-0">
      {profileImg && (
        <Image
          src={profileImg}
          alt={userName || "Profile Image"}
          className="w-20 h-20 rounded-full object-cover mb-4"
          width={80}
          height={80}
        />
      )}
      {/* <p className="text-base font-semibold">닉네임</p> */}
      <p className="text-base text-black font-semibold">{userName}</p>
      {isMyProfile && (
        <button
          className="cursor-pointer bg-primary text-white rounded-lg py-2 px-4 mt-4 w-full md:text-sm"
          onClick={() => {
            router.push("/mypage/edit-profile");
          }}
        >
          프로필 수정하기
        </button>
      )}
    </div>
  );
}
