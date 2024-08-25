"use client";

import useLogin from "@/app/hooks/auth/useLogin";
import CategoryTabs from "@/app/ui/common/CategoryTabs";
import MyPageSave from "@/app/ui/common/myPage/MypageSave";
import MyPageTravelRoute from "@/app/ui/common/myPage/MypageTravelRoute";
import MypageWritePost from "@/app/ui/common/myPage/MypageWritePost";
import PageContainer from "@/app/ui/common/PageContainer";
import UserProfile from "@/app/ui/profile/UserProfile";
import { useState } from "react";

const categories = [
  { id: 0, title: "찜" },
  { id: 1, title: "travel route" },
  { id: 2, title: "작성글" },
];

export default function UserPage({
  params: { userId },
}: {
  params: { userId: number };
}) {
  const [focusTab, setFocusTab] = useState<number>(0);

  return (
    <PageContainer>
      <div className="flex flex-col items-start md:flex-row md:gap-x-12">
        <UserProfile userId={userId} />
        <div className="flex flex-col flex-grow w-full">
          <CategoryTabs
            categories={categories}
            focusTab={focusTab}
            setFocusTab={setFocusTab}
          />
          {focusTab === 0 && <MyPageSave userId={userId} />}
          <div className="mt-4 flex justify-end">
            {focusTab === 1 && (
              <MyPageTravelRoute userId={userId} isNotMypage />
            )}
          </div>
          {focusTab === 2 && <MypageWritePost userId={userId} />}
        </div>
      </div>
    </PageContainer>
  );
}
