import Image from "next/image";

export interface ICommunityPopularPostProps {
  index: number;
  id: number;
  author: string;
  title: string;
  profileImg: string;
  contents: string;
}

export default function CommunityPopularPost({
  index,
  id,
  author,
  title,
  profileImg,
  contents,
}: ICommunityPopularPostProps) {
  return (
    <div
      className={`flex gap-4 py-3 rounded-xl w-full ${index !== 5 ? "border-b-[1px] border-gray-300" : ""}`}
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
            className="rounded-full border-[1px] border-transparent w-5 h-5 inline-flex"
          />
          <div className="text-sm text-gray-500 font-black line-clamp-1">
            {author}
          </div>
        </div>
        <div className="flex-grow max-w-full">
          <div className="text-sm font-bold text-gray-800 line-clamp-1 my-1.5">
            {title}
          </div>
          <div className="text-sm text-gray-500 line-clamp-2">{contents}</div>
        </div>
      </div>
    </div>
  );
}
