"use client";

import useLogin from "@/app/hooks/auth/useLogin";
import CategoryTabs from "@/app/ui/common/CategoryTabs";
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
    <div className="max-w-screen-lg h-auto w-auto mx-auto my-8 p-4">
      <div className="flex flex-col items-start md:flex-row md:gap-x-12">
        <UserProfile userId={userId} />
        <CategoryTabs
          categories={categories}
          focusTab={focusTab}
          setFocusTab={setFocusTab}
        />
      </div>
    </div>
  );
}
