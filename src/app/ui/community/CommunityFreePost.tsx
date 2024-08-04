import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";
import Image from "next/image";
import { FaCommentAlt } from "react-icons/fa";
import { GrLike } from "react-icons/gr";
import { PiEyesFill } from "react-icons/pi";

export interface ICommunityFreePostProps {
  id: number;
  author: string;
  commentCount: number;
  created_at: string;
  like: number;
  profileImg: string;
  title: string;
  views: number;
  contents: string;
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
  const formattedDate = formatDistanceToNow(new Date(created_at), {
    addSuffix: true,
    locale: ko,
  });

  return (
    <div className="p-6 rounded-xl shadow-md h-auto w-full cursor-pointer">
      <div className="flex items-start w-full">
        <Image
          src={profileImg}
          alt="profile"
          width={40}
          loading="lazy"
          height={40}
          className="rounded-full border-[1px] border-transparent w-10 h-10"
        />
        <div className="ml-4 w-full">
          <div className="text-sm text-gray-500 mb-1.5">
            {author}
            <span className="ml-2 text-xs text-gray-400">{formattedDate}</span>
          </div>
          <div className="text-xl font-semibold mb-3">{title}</div>
          <div className="text-left text-sm line-clamp-2 mb-3">{contents}</div>
          <div className="flex justify-end gap-3 text-xs">
            <div className="flex gap-1 items-center text-gray-500">
              <FaCommentAlt /> {commentCount}
            </div>
            <div className="flex gap-1 items-center text-gray-500">
              <GrLike /> {like}
            </div>
            <div className="flex gap-1 items-center text-gray-500">
              <PiEyesFill /> {views}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
