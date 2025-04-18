// 🔥 hooks/useProfile.ts

import { useQuery, useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { patch } from "@/lib/api";
import { getUserInfo, IUserInfo } from "./mypage/useProfilePrefetch";

interface IUpdateProfileResponse {
  message: string;
  userName?: string;
  profileImg?: string;
}

export function useProfile(userId: number) {
  const router = useRouter();

  async function updateProfile(formData: FormData) {
    try {
      return await patch<IUpdateProfileResponse>("/users", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (err) {
      throw err;
    }
  }

  const { isLoading, data } = useQuery<
    Pick<IUserInfo, "profileImg" | "userName" | "userId">
  >({
    queryKey: ["userProfile", userId],
    queryFn: () => getUserInfo(userId),
    staleTime: 60 * 5 * 1000,
  });

  const updateProfileMutation = useMutation({
    mutationFn: (formData: FormData) => updateProfile(formData),
    onSuccess: () => {
      toast.info("프로필이 수정되었습니다.");
      router.push("/mypage");
    },
  });

  return { isLoading, data, updateProfileMutation };
}
