import useGetUserPost from "@/app/hooks/mypage/useGetUserPost";
import MyPageNotfound from "./MyPageNotfound";
import Link from "next/link";
import { PostBottoms } from "../../community/PostBottoms";

export default function MypageWritePost({
  userId,
}: {
  userId: number | undefined;
}) {
  const { data, isLoading } = useGetUserPost(userId!);

  if (isLoading) {
    return <div>Loading...</div>; // 로딩 중일 때 표시할 내용
  }

  if (!data || data.length === 0) {
    return <MyPageNotfound categoryTabs={"작성글"} />;
  }

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    };
    return new Date(dateString).toLocaleDateString("ko-KR", options);
  };

  return (
    <div className="flex flex-col gap-5 py-10">
      {data.map((post) => (
        <Link
          key={post.id}
          href={
            post.travelRoute_id
              ? `/community/travel/${post.id}`
              : `/community/free/${post.id}`
          }
          className="border p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 bg-white"
        >
          <div>
            <div className="text-xl font-semibold text-primary">
              {post.title}
            </div>
            <div className="text-gray-500 text-sm mt-1">
              {post.travelRoute_id ? "여행 게시물" : "Q&A 게시물"} |{" "}
              {formatDate(post.created_at)}
            </div>
            <div className="mt-2">
              <PostBottoms
                commentCount={post.commentCount}
                like={post.likeCount}
                views={post.view_count}
              />
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
