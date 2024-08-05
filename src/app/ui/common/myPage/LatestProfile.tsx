"use client";

import useLogin from "@/app/hooks/auth/useLogin";
import { useProfile } from "@/app/hooks/useProfile";
import { convertImgFormat } from "@/util/convertImgFormat";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { MdEdit } from "react-icons/md";
import Tooltip from "../Tooltip";

export default function NewProfile() {
  const { userData } = useLogin();
  const router = useRouter();
  const { data, updateProfileMutation } = useProfile(
    userData?.user.userId as number,
  );
  const [userName, setUserName] = useState<string>("");
  const [profileImg, setProfileImg] = useState<string>("");
  const profileImgRef = useRef<HTMLInputElement>(null);
  const isDisabled =
    userName === data?.userName && profileImg === data?.profileImg;

  useEffect(() => {
    if (data) {
      setProfileImg(data?.profileImg);
      setUserName(data.userName);
    }
  }, [data]);
  const handleFileUpload = () => {
    profileImgRef.current?.click();
  };

  const handlePreviewUploadImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (profileImgRef.current && profileImgRef.current.files) {
      const uploadImg = profileImgRef.current.files[0];

      // 미리보기
      const reader = new FileReader();

      reader.readAsDataURL(uploadImg);
      reader.onload = () => {
        if (typeof reader.result === "string") {
          setProfileImg(reader.result);
        }
      };
    }
  };

  const handleEditUserName = (e: ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  };

  const handleCancelUpdateProfile = () => {
    if (confirm("프로필 수정을 취소하시겠어요?")) {
      router.back();
    } else {
      return;
    }
  };

  const handleUpdateProfile = () => {
    const formData = new FormData();

    if (profileImg && profileImg !== data?.profileImg) {
      const profileImgFile = convertImgFormat(profileImg, "profile-image.jpg");
      formData.append("profileImg", profileImgFile);
    }

    if (userName !== data?.userName) {
      formData.append("userName", userName);
    }

    updateProfileMutation.mutate(formData);
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center mt-20">
        <div className="w-[60%] flex flex-col items-start border-b border-gray-200 gap-2">
          <p className="text-xl font-semibold">프로필</p>
          <p className="text-sm text-rgb-sec`on`dary mb-4">
            프로필을 수정해보세요
          </p>
        </div>
        <div className="relative">
          <img
            src={profileImg}
            alt=""
            className={`w-32 h-32 rounded-full object-cover mt-8 mb-4`}
          />
          <div className="absolute bottom-6 right-1 flex justify-center items-center w-6 h-6 rounded-full bg-gray-200 cursor-pointer">
            <MdEdit className="text-white" onClick={handleFileUpload} />
          </div>
        </div>
        <input
          type="file"
          hidden
          accept="image/*"
          ref={profileImgRef}
          onChange={handlePreviewUploadImage}
        />
        <div className="flex items-center gap-2">
          <p className="text-base font-semibold">{userName}</p>
          <p className="text-sm text-rgb-secondary">님의 프로필</p>
        </div>
      </div>
      <div className="w-[60%] mx-auto mt-12 flex flex-col gap-y-4">
        <p className="border-l-4 border-primary px-2">닉네임</p>
        <input
          type="text"
          className="border-b border-rgb-secondary focus:border-primary outline-none pb-2"
          value={userName}
          onChange={handleEditUserName}
        />
      </div>
      <div className="w-[60%] mx-auto flex justify-center gap-8 md:gap-16  text-sm md:text-base my-12 rounded-full">
        <button
          className="bg-primary rounded-full text-white py-4 px-4 md:px-8 shadow-sm transition-transform duration-300"
          onClick={handleCancelUpdateProfile}
        >
          취소하기
        </button>
        {isDisabled ? (
          <Tooltip direction="top" content="프로필 수정 이후 저장 가능합니다.">
            <button
              className={`bg-secondary rounded-full text-white py-4 px-4 md:px-8`}
              onClick={handleUpdateProfile}
              disabled={isDisabled}
            >
              저장하기
            </button>
          </Tooltip>
        ) : (
          <button
            className={`bg-primary rounded-full text-white py-4 px-4 md:px-8  shadow-sm transition-transform duration-300`}
            onClick={handleUpdateProfile}
            disabled={isDisabled}
          >
            저장하기
          </button>
        )}
      </div>
    </>
  );
}
