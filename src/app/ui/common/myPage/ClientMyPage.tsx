"use client";

import Profile from "@/app/ui/common/myPage/Profile";
import { useState } from "react";
import PageContainer from "../PageContainer";
import CategoryTabs from "../CategoryTabs";
import MyPageSave from "./MypageSave";
import MyPageTravelRoute from "./MypageTravelRoute";
import MypageWritePost from "./MypageWritePost";

const categories = [
  { id: 0, title: "찜" },
  { id: 1, title: "travel route" },
  { id: 2, title: "작성글" },
];

export default function ClientMyPage({ userId }: { userId: number }) {
  const [focusTab, setFocusTab] = useState<number>(0);

  return (
    <PageContainer>
      <div className="flex flex-col items-start md:flex-row md:gap-x-12">
        <Profile userId={userId} />
        <div className="flex flex-col flex-grow w-full">
          <CategoryTabs
            categories={categories}
            focusTab={focusTab}
            setFocusTab={setFocusTab}
          />
          {focusTab === 0 && <MyPageSave userId={userId} />}
          {focusTab === 1 && (
            <div className="mt-4 flex justify-end">
              <MyPageTravelRoute userId={userId} isNotMypage={false} />
            </div>
          )}
          {focusTab === 2 && <MypageWritePost userId={userId} />}
        </div>
      </div>
    </PageContainer>
  );
}
