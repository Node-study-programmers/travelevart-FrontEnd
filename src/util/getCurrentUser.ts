import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";

export async function getSession() {
  return await getServerSession(authOptions);
}

export default async function getCurrentUser() {
  try {
    const session = await getSession();
    if (session) {
      const currentUser = session.user;
      console.log(currentUser);
      return currentUser;
    }
    return null;
  } catch (error) {
    return null;
  }
}
