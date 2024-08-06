"use client";

import CommunityPage from "@/app/ui/community/CommunityPage";
import { useParams } from "next/navigation";
export default function BoardPage() {
  const params = useParams();
  const board = params.board;
  return <CommunityPage board={board as string} />;
}
