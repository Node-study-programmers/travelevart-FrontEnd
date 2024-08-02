import Image from "next/image";

export interface ICommunityPopularPostProps {
  id: number;
  author: string;
  title: string;
  profileImg: string;
  contents: string;
}

export default function CommunityPopularPost({
  id,
  author,
  title,
  profileImg,
  contents,
}: ICommunityPopularPostProps) {
  return (
    <div className="flex items-center gap-4 p-6 rounded-xl shadow-md">
      {/* <Image
        src={profileImg}
        alt="profile"
        fill
        className="w-10 h-10 rounded-full border-[1px] border-transparent"
      /> */}
      <div className="flex-grow">
        <div className="text-sm text-gray-500">{author}</div>
        <div className="text-xl font-bold text-gray-800">{title}</div>
        <div className="text-sm text-gray-500">{contents}</div>
      </div>
    </div>
  );
}
