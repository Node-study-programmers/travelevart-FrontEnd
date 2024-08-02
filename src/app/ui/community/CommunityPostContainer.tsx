import Image from "next/image";

export interface ICommunityPostContainerProps {
  id: number;
  author: string;
  commentCount: number;
  created_at: string;
  like: number;
  profileImg: string;
  title: string;
  travelRoute_id: number;
  views: number;
}

export default function CommunityPostContainer({
  id,
  author,
  commentCount,
  created_at,
  like,
  profileImg,
  title,
  travelRoute_id,
  views,
}: ICommunityPostContainerProps) {
  const formattedDate = new Date(created_at).toLocaleString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="p-6 rounded-xl shadow-md h-96 w-full">
      <div className="flex items-center">
        {/* <Image
          src={profileImg}
          alt="profile"
          fill
          className="w-10 h-10 rounded-full border-[1px] border-transparent"
        /> */}
        <div className="ml-4">
          <div className="text-sm text-gray-500">
            {author}
            <span className="ml-2 text-xs text-gray-400">{formattedDate}</span>
          </div>
          <div className="text-xl font-bold text-gray-800">{title}</div>
        </div>
      </div>
    </div>
  );
}
