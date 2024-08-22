"use client";

import { RootState } from "@/redux";
import { useSelector } from "react-redux";

export default function RecommendTripSchedulePage() {
  const recommendTrip = useSelector((state: RootState) => state.recommendTrip);

  console.log(recommendTrip); // recommendTrip 데이터 출력

  return <div>추천 일정 보여줄 페이지</div>;
}
