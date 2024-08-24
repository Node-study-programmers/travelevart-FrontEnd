import Image from "next/image";
import { useRouter } from "next/navigation";
import { PostBottoms, PostBottomsInPost } from "./PostBottoms";
import Carousel from "../common/carousel/Carousel";
import useGetDetailTravelData from "@/app/hooks/custom/useGetDetailTravelData";

export interface PostContent {
  id: number;
  postId: number;
  order: number;
  text: string;
  image: string;
  detailtravel_id: number;
}

export interface ICommunityTravelPostProps {
  id: number;
  author: string;
  commentCount: number;
  created_at: string;
  like: number;
  profileImg: string;
  title: string;
  travelRoute_id: number;
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
  const { data, isLoading } = useGetDetailTravelData(travelRoute_id);
  // 클릭 시 디테일 페이지로 이동
  const handleClick = () => {
    router.push(`/community/travel/${id}`);
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    };
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("ko-KR", options).format(date);
  };

  return (
    <div
      className="p-6 rounded-xl h-auto w-full bg-white shadow-lg cursor-pointer"
      onClick={handleClick}
    >
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
        <div className="ml-4 w-full">
          <div className="flex justify-between text-sm text-gray-500">
            <div>{author}</div>
            <div>{formatDate(created_at)}</div>
          </div>
          <div className="text-xl font-bold text-gray-800">{title}</div>
        </div>
      </div>

      <div className="cursor-pointer mt-4">
        <Carousel contents={contents} />
      </div>
      <div className="w-full my-5">
        <PostBottoms
          postId={String(id)}
          commentCount={commentCount}
          like={like}
          isPostLiked={isLiked}
          views={views}
        />
      </div>
    </div>
  );
}
