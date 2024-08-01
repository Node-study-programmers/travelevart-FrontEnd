"use client";

import Profile from "@/app/ui/common/myPage/Profile";
import CategoryTabs from "../ui/common/CategoryTabs";
import { useState } from "react";
import useLogin from "../hooks/auth/useLogin";

const categories = [
  { id: 0, title: "찜" },
  { id: 1, title: "travel route" },
  { id: 2, title: "작성글" },
];

export default function MyPage() {
  const { status, userData } = useLogin();
  const [focusTab, setFocusTab] = useState<number>(0);

  return (
    <div className="max-w-screen-lg h-auto w-auto mx-auto my-8 p-4">
      <div className="flex flex-col items-start md:flex-row md:gap-x-12">
        <Profile />
        <CategoryTabs
          categories={categories}
          focusTab={focusTab}
          setFocusTab={setFocusTab}
        />
      </div>
    </div>
  );
}
