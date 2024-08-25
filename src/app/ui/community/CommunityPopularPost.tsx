import { TFocusBoard } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";

export interface IContent {
  id: number;
  postId: number;
  order: number;
  text: string;
  image: string;
  detailtravel_id: number;
}

export interface ICommunityPopularPostProps {
  focusBoard: TFocusBoard;
  index: number;
  id: number;
  author: string;
  title: string;
  profileImg: string;
  contents: IContent[];
}

export default function CommunityPopularPost({
  focusBoard,
  index,
  id,
  author,
  title,
  profileImg,
  contents,
}: ICommunityPopularPostProps) {
  const getLinkPath = () => {
    switch (focusBoard) {
      case "자유게시판":
        return `/community/free/${id}`;
      case "여행게시판":
        return `/community/travel/${id}`;
      default:
        return "/";
    }
  };

  return (
    <Link
      href={getLinkPath()}
      className={`flex gap-4 py-3 w-full ${
        index !== 5 ? "border-b-[1px] border-gray-300" : ""
      }`}
    >
      <h2>{index}</h2>
      <div className="flex flex-col">
        <div className="items-center gap-2 flex max-w-full">
          <Image
            src={profileImg}
            alt="profile"
            width={20}
            loading="lazy"
            height={20}
            className="rounded-full border-[1px] border-transparent w-7 h-7"
          />
          <div className="text-sm text-gray-500 line-clamp-1">{author}</div>
        </div>
        <div className="flex-grow max-w-full">
          <div className="text-sm font-semibold line-clamp-1 my-1.5">
            {title}
          </div>
          {contents.length > 0 && (
            <div className="text-sm line-clamp-2">{contents[0].text}</div>
          )}
        </div>
      </div>
    </Link>
  );
}
