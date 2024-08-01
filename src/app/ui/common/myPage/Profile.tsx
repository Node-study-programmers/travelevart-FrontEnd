import useLogin from "@/app/hooks/auth/useLogin";
import { useProfile } from "@/app/hooks/useProfile";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Profile() {
  const { status, userData } = useLogin();
  const router = useRouter();
  const { userInfo } = useProfile(userData?.user.userId);

  return (
    <div className="relative flex flex-col items-start w-full md:w-[30%] md:justify-center bg-white rounded-xl shadow-md p-6">
      <img
        src={userInfo?.profileImg || ""}
        alt={userInfo?.userName || ""}
        className="w-20 h-20 rounded-full object-cover mb-4"
      />
      <p className="text-base font-semibold">닉네임</p>
      <p className="text-sm text-rgb-secondary">{userInfo?.userName}</p>
      <button
        className="cursor-pointer bg-primary text-white rounded-lg py-2 px-4 mt-4 w-full md:text-sm"
        onClick={() => {
          router.push("/mypage/edit-profile");
        }}
      >
        프로필 수정하기
      </button>
    </div>
  );
}
