import { post } from "@/lib/api";

export default async function sendFeedback(text: string) {
  const accessToken = localStorage.getItem("accessToken");

  const response = await post<{ message: string }>(
    "/mail",
    { text },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  return response;
}
