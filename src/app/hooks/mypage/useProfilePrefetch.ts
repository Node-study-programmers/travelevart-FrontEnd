// 🔥 hooks/useProfile.ts

import { get } from "@/lib/api";

export interface IUserInfo {
  userId: number;
  userName: string;
  email: string;
  profileImg: string;
}

export async function getUserInfo(userId: number) {
  if (!userId) throw new Error("Unauthorized!!!");
  return await get<IUserInfo>(`/users/${userId}`);
}
