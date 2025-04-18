// app/mypage/page.tsx (서버 컴포넌트)
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { queryClient } from "@/app/api/queryClient";
import getCurrentUser from "@/util/getCurrentUser";
import ClientMyPage from "../ui/common/myPage/ClientMyPage";
import { getUserInfo } from "../hooks/mypage/useProfilePrefetch";

export default async function MyPage() {
  const user = await getCurrentUser();
  if (!user) return <div>로그인이 필요합니다.</div>;

  await queryClient.prefetchQuery({
    queryKey: ["userProfile", user.userId],
    queryFn: () => getUserInfo(user.userId),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ClientMyPage userId={user.userId} />
    </HydrationBoundary>
  );
}
