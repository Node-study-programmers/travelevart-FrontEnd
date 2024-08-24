import Image from "next/image";
import { PostContent } from "../../community/CommunityTravelPost";

export default function CommunityCarousel({
  content,
}: {
  content: PostContent;
}) {
  return (
    <div className="relative w-full h-auto flex-shrink-0 bg-white border border-gray-300 rounded-lg overflow-hidden">
      {/* 이미지 */}
      <div className="relative w-full h-[60vh] bg-gray-200">
        <Image
          src={
            content?.image ||
            `https://cdn.pixabay.com/photo/2019/06/24/16/43/mountain-4296464_640.jpg`
          }
          alt={content?.text}
          layout="fill"
          objectFit="cover"
          className="absolute inset-0"
        />
        {/* 텍스트 오버레이 */}
        <div className="absolute bottom-[20%] left-0 w-full py-4 bg-black bg-opacity-10 text-white text-center line-clamp-2">
          <p className="text-base">{content?.text}</p>
        </div>
      </div>
    </div>
  );
}
