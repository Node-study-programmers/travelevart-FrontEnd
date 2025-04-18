import Image from "next/image";
import { PostContent } from "../../community/CommunityTravelPost";
import useGetDetailTravelData from "@/app/hooks/custom/useGetDetailTravelData";

export default function CommunityCarousel({
  content,
}: {
  content: PostContent;
}) {
  return (
    <div className="relative w-full h-auto flex-shrink-0 bg-white border border-gray-300 rounded-lg overflow-hidden">
      <div className="relative w-full h-[60vh] bg-gray-200">
        <Image
          src={
            content?.image ||
            `https://cdn.pixabay.com/photo/2024/02/21/08/44/woman-8587090_1280.png`
          }
          alt={content?.text}
          fill
          className="absolute inset-0 object-cover"
          sizes="
            (max-width: 640px) 100vw, 
            (max-width: 768px) 75vw, 
            (max-width: 1024px) 50vw, 
            33vw"
        />
        {/* 제목 박스 */}
        {content?.title && (
          <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-4 py-2 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold">{content.title}</h2>
          </div>
        )}
        <div className="absolute bottom-[20%] left-0 w-full py-10 mb-5 bg-black bg-opacity-10 text-white text-center px-5 overflow-hidden">
          <p className="text-base line-clamp-4">{content?.text}</p>
        </div>
      </div>
    </div>
  );
}
