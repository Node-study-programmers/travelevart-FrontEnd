import Image from "next/image";
import { useRouter } from "next/navigation";

export interface PostContent {
  id: number;
  postId: number;
  order: number;
  text: string;
  image: string;
}

export interface ICommunityTravelPostProps {
  id: number;
  author: string;
  commentCount: number;
  created_at: string;
  like: number;
  profileImg: string;
  title: string;
  travelRoute_id?: number;
  views: number;
  contents: PostContent[];
  isLiked: boolean;
}

export default function CommunityTravelPost({
  id,
  author,
  commentCount,
  created_at,
  like,
  profileImg,
  title,
  travelRoute_id,
  views,
  contents,
  isLiked,
}: ICommunityTravelPostProps) {
  const router = useRouter();

  // 첫 번째 사진 가져오기
  const firstContent = contents[0];

  // 클릭 시 디테일 페이지로 이동
  const handleClick = () => {
    router.push(`/community/travel/${id}`);
  };

  return (
    <div className="p-6 rounded-xl h-auto w-full bg-white shadow-lg">
      <div className="flex items-center w-full mb-4">
        {profileImg && (
          <Image
            src={profileImg}
            alt="profile"
            width={40}
            height={40}
            className="rounded-full border border-gray-300"
          />
        )}
        <div className="ml-4">
          <div className="text-sm text-gray-500">
            {author}
            {/* 날짜를 표시할 때 포맷팅 */}
          </div>
          <div className="text-xl font-bold text-gray-800">{title}</div>
          <div className="text-sm text-gray-600 mt-1">
            {views} views · {commentCount} comments · {like} likes
          </div>
        </div>
      </div>

      <div className="cursor-pointer mt-4" onClick={handleClick}>
        <Image
          src={
            firstContent?.image ||
            `https://cdn.pixabay.com/photo/2019/06/24/16/43/mountain-4296464_640.jpg`
          }
          alt={firstContent?.text || "Post Image"}
          width={800}
          height={400}
          className="rounded-lg object-cover"
        />
      </div>
    </div>
  );
}
