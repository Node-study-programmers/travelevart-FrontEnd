"use client";

import Profile from "@/app/ui/common/myPage/Profile";
import CategoryTabs from "../ui/common/CategoryTabs";
import { useState } from "react";
import PageContainer from "../ui/common/PageContainer";

const categories = [
  { id: 0, title: "찜" },
  { id: 1, title: "travel route" },
  { id: 2, title: "작성글" },
];

export default function MyPage() {
  const [focusTab, setFocusTab] = useState<number>(0);

  return (
    <PageContainer>
      <div className="flex flex-col items-start md:flex-row md:gap-x-12">
        <Profile />
        <CategoryTabs
          categories={categories}
          focusTab={focusTab}
          setFocusTab={setFocusTab}
        />
      </div>
    </PageContainer>
  );
}
