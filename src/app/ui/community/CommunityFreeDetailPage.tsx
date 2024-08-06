import React from "react";
import ScrollShadow from "../common/ScrollShadow";
import { IContent } from "./CommunityPopularPost";
import Image from "next/image";

interface CommunityFreeDetailPageProps {
  contents: IContent;
}

export default function CommunityFreeDetailPage({
  contents,
}: CommunityFreeDetailPageProps) {
  return (
    <div className="w-full h-auto text-base whitespace-pre-wrap break-all">
      <div className="w-full flex justify-center items-center my-10">
        {contents?.image && (
          <Image src={contents?.image} alt="image" width={500} height={500} />
        )}
      </div>
      {contents?.text}
    </div>
  );
}
