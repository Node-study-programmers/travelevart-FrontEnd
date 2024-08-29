import { get, patch } from "@/lib/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface IUserInfo {
  userId: number;
  userName: string;
  email: string;
  profileImg: string;
}

interface IUpdateProfileResponse {
  message: string;
  userName?: string;
  profileImg?: string;
}

export function useProfile(userId: number) {
  const router = useRouter();

  async function getUserInfo(userId: number) {
    try {
      if (!userId) {
        throw new Error("Unauthorized!!!");
      }

      const response = await get<IUserInfo>(`/users/${userId}`);

      return response;
    } catch (err) {
      throw new Error("Failed to get user profile");
    }
  }

  async function updateProfile(formData: FormData) {
    try {
      const response = await patch<IUpdateProfileResponse>("/users", formData, {
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
  });

  const updateProfileMutation = useMutation({
    mutationFn: (formData: FormData) => updateProfile(formData),
    onSuccess: () => {
      toast.info("프로필이 수정되었습니다.");
      router.push("/mypage");
    },
    onError: (err) => {},
  });

  return { isLoading, data, updateProfileMutation };
}
