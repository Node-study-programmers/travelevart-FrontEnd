"use client";

import Profile from "@/app/ui/common/myPage/Profile";
import CategoryTabs from "../ui/common/CategoryTabs";
import { useState } from "react";
import PageContainer from "../ui/common/PageContainer";
import { useRouter } from "next/navigation";
import MyPageTravelRoute from "../ui/common/myPage/MypageTravelRoute";
import { useSession } from "next-auth/react";
import MyPageSave from "../ui/common/myPage/MypageSave";


const categories = [
  { id: 0, title: "찜" },
  { id: 1, title: "travel route" },
  { id: 2, title: "작성글" },
];

export default function MyPage() {
  const [focusTab, setFocusTab] = useState<number>(0);
  const { data } = useSession();
  const router = useRouter();

  const handleCreateTravelRoute = () => {
    router.push("/travel-route/setup");
  };


  return (
    <PageContainer>
      <div className="flex flex-col items-start md:flex-row md:gap-x-12">
        <Profile />
        <div className="flex flex-col flex-grow w-full">
          <CategoryTabs
            categories={categories}
            focusTab={focusTab}
            setFocusTab={setFocusTab}
          />
          {focusTab === 0 && <MyPageSave />}
          <div className="mt-4 flex justify-end">
            {focusTab === 1 && <MyPageTravelRoute userId={data?.user.userId} />}
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
