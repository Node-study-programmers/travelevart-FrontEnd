import Image from "next/image";
import Link from "next/link";
import { convertTimeAgo } from "@/util/convertTimeAgo";
import { PostBottoms } from "./PostBottoms";
import { IContent } from "./CommunityPopularPost";

export interface ICommunityFreePostProps {
  id: number;
  author: string;
  commentCount: number;
  created_at: string;
  like: number;
  profileImg: string;
  title: string;
  views: number;
  contents: IContent[];
}

export default function CommunityFreePost({
  id,
  author,
  commentCount,
  created_at,
  like,
  profileImg,
  title,
  views,
  contents,
}: ICommunityFreePostProps) {
  const formattedCreatedAt = convertTimeAgo(created_at);

  return (
    <div className="p-6 rounded-xl h-auto w-full cursor-pointer">
      <Link className="flex items-start w-full" href={`/community/free/${id}`}>
        <Image
          src={profileImg}
          alt="profile"
          width={40}
          loading="lazy"
          height={40}
          className="rounded-full border-[1px] border-transparent w-10 h-10"
        />
        <div className="ml-4 w-full">
          <div className="text-sm text-gray-500 mb-1.5 flex justify-between">
            {author}
            <span className="ml-2 text-xs text-gray-400">
              {formattedCreatedAt}
            </span>
          </div>
          <div className="text-xl font-semibold mb-3">{title}</div>
          <div className="text-left text-sm line-clamp-2 mb-4">
            {contents[0]?.text}
          </div>
          <PostBottoms commentCount={commentCount} like={like} views={views} />
        </div>
      </Link>
    </div>
  );
}
