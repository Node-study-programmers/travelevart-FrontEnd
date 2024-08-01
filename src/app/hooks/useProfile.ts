import { useEffect, useState } from "react";
import { get, patch } from "@/lib/api";

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

export async function getUserInfo(userId: number) {
  const response = await get<IUserInfo>(`/users/${userId}`, {
    headers: {
      "ngrok-skip-browser-warning": "true",
    },
  });

  return response;
}

export async function updateProfile(formData: FormData) {
  try {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      throw new Error("Unauthorized!!!");
    }

    const response = await patch<IUpdateProfileResponse>("/users", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "ngrok-skip-browser-warning": "true",
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("프로필 업데이트 성공:", response);
    alert("프로필이 수정되었습니다.");
  } catch (err) {
    console.error("프로필 업데이트 실패:", err);
    throw err;
  }
}

export function useProfile(userId: number | undefined) {
  const [userInfo, setUserInfo] = useState<IUserInfo | undefined>(undefined);

  useEffect(() => {
    if (userId === undefined) return;

    const fetchUserInfo = async () => {
      try {
        const data = await getUserInfo(userId);
        setUserInfo(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUserInfo();
  }, [userId]);

  return { userInfo };
}
