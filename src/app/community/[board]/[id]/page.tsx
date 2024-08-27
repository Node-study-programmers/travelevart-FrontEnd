"use client";

import useLogin from "@/app/hooks/auth/useLogin";
import useDetailPost from "@/app/hooks/community/useDetailPost";
import useGetCommentsInfinite, {
  CommentsResponseData,
} from "@/app/hooks/community/useGetComments";
import useIntersectionObserver from "@/app/hooks/useIntersectionObserver";
import PageContainer from "@/app/ui/common/PageContainer";
import CommentForm from "@/app/ui/community/CommentForm";
import CommunityFreeDetailPage from "@/app/ui/community/CommunityFreeDetailPage";
import { IContent } from "@/app/ui/community/CommunityPopularPost";
import CommunityTravelDetailPage from "@/app/ui/community/CommunityTravelDetailPage";
import PopularPosts from "@/app/ui/community/PopularPosts";
import { PostBottomsInPost } from "@/app/ui/community/PostBottoms";
import {
  CommentsSkeleton,
  DetailPageSkeleton,
} from "@/app/ui/community/skeleton/CommunityPostSkeleton";
import { del, post } from "@/lib/api";
import { TFocusBoard } from "@/lib/types";
import { convertTimeAgo } from "@/util/convertTimeAgo";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

export interface CommentFormValues {
  contents: IContent[];
}

export default function CommunityDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id: postId } = params;
  const { data, isLoading } = useDetailPost(postId);
  const { status, userData } = useLogin();
  const pathname = usePathname();
  const router = useRouter();

  const {
    comments,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status: commentsStatus,
    refetch,
  } = useGetCommentsInfinite(postId);

  const moreRef = useIntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        loadMore();
      }
    },
    { threshold: 1 },
  );

  const loadMore = () => {
    if (!hasNextPage) return;
    fetchNextPage();
  };

  const handleCommentSubmit = async (
    data: CommentFormValues,
    reset: () => void,
  ) => {
    await post<CommentsResponseData>(
      `${process.env.NEXT_PUBLIC_BASE_URL}/comments/${postId}`,
      data,
    );
    refetch();
    reset();
  };

  const handleInputClick = () => {
    if (status === "unauthenticated") {
      signIn();
    }
  };

  const handleDeleteComments = async (commentId: number) => {
    if (window.confirm("댓글을 삭제하시겠습니까?")) {
      await del(`${process.env.NEXT_PUBLIC_BASE_URL}/comments/${commentId}`, {
        headers: {
          "ngrok-skip-browser-warning": "true",
        },
      });
      refetch();
    }
  };

  const handleDeletePost = async () => {
    if (window.confirm("게시글을 삭제하시겠습니까?")) {
      await del(`${process.env.NEXT_PUBLIC_BASE_URL}/posts/${postId}`, {
        headers: {
          "ngrok-skip-browser-warning": "true",
        },
      });
      router.push("/community/travel");
    }
  };

  let focusBoard: TFocusBoard = "Questions";
  if (pathname.includes("/community/travel")) {
    focusBoard = "Stories";
  }

  const handleNavigateToList = () => {
    const basePath =
      focusBoard === "Questions" ? "/community/free" : "/community/travel";
    router.push(`${basePath}`);
  };

  if (isLoading) {
    return (
      <PageContainer>
        <DetailPageSkeleton />
      </PageContainer>
    );
  }

  if (!data) {
    return <div>No data available</div>;
  }

  const {
    author,
    commentCount,
    contents,
    created_at,
    authorId,
    id,
    like,
    profileImg,
    title,
    travelRoute_id,
    detailTravels,
    views,
    isLiked,
  } = data;

  return (
    <PageContainer>
      <div className="grid grid-cols-1 lg:grid-cols-[7fr_3fr] mt-5 scroll-none">
        {/* 상세페이지부분 */}
        <div className="lg:pr-10 max-w-full">
          <div className="flex justify-between p-4">
            <div className="flex items-center gap-3">
              <Image
                src={profileImg}
                alt="profile"
                width={40}
                loading="lazy"
                height={40}
                className="rounded-full border-[1px] border-transparent w-10 h-10"
              />
              <div>
                <div className="text-sm font-bold">{author}</div>
                <span className="text-xs text-gray-500">
                  {convertTimeAgo(created_at)}
                </span>
              </div>
            </div>
            {userData?.user.userId === authorId ? (
              <div
                className="bg-red-500 text-white rounded-lg flex justify-center text-xs items-center px-2 py-0.5 cursor-pointer hover:bg-red-600 h-8"
                onClick={handleDeletePost}
              >
                삭제
              </div>
            ) : (
              <div className="bg-primary text-white rounded-lg flex justify-center text-sm items-center px-2 py-0.5 cursor-pointer hover:bg-secondary">
                <Link href={`/mypage/${authorId}`}>유저 정보</Link>
              </div>
            )}
          </div>
          {/* 본문,제목 */}
          <div className="p-4 w-full">
            <div className="mb-6 w-full h-auto text-xl font-bold">{title}</div>
            <div>
              {travelRoute_id ? (
                <CommunityTravelDetailPage
                  isMyPost={userData?.user.userId === authorId}
                  contents={contents}
                  travelRoute_id={travelRoute_id}
                />
              ) : (
                <CommunityFreeDetailPage contents={contents[0]} />
              )}
            </div>
          </div>
          {/* 좋아요, 조회수 ,댓글수 */}
          <div className="w-full py-5 shadow-lg mb-7">
            <PostBottomsInPost
              postId={postId}
              commentCount={commentCount}
              like={like}
              isPostLiked={isLiked}
              views={views}
            />
          </div>
          {/* 댓글입력 */}
          <CommentForm
            onSubmit={handleCommentSubmit}
            handleInputClick={handleInputClick}
            status={status}
            userData={userData}
          />
          {/* 댓글 */}
          <div className="space-y-4 mb-10 h-auto overflow-scroll scroll-none">
            {comments.length > 0 ? (
              comments.map(
                ({ author, comment, created_at, id, profileImg, authorId }) => (
                  <div
                    key={id}
                    className="w-full max-w-[calc(100%-1.5rem)] pb-5"
                  >
                    <div className="flex gap-3 mb-3">
                      <Image
                        src={profileImg}
                        alt="profile"
                        width={40}
                        loading="lazy"
                        height={40}
                        className="rounded-full border-[1px] border-transparent w-10 h-10"
                      />
                      <div className="flex flex-col gap-1 relative w-full">
                        <div className="flex gap-3 items-center">
                          <span className="font-semibold text-sm">
                            {author}
                          </span>
                          <span className="text-xs text-gray-500">
                            {convertTimeAgo(created_at)}
                          </span>
                        </div>
                        {userData?.user.userId === authorId && (
                          <span
                            className="absolute top-0 right-0 text-xs cursor-pointer"
                            onClick={() => handleDeleteComments(id)}
                          >
                            삭제
                          </span>
                        )}
                        <div className="text-gray-800 break-words">
                          {comment}
                        </div>
                      </div>
                    </div>
                  </div>
                ),
              )
            ) : (
              <div className="text-gray-500 p-4">댓글이 없습니다.</div>
            )}

            {/* 마지막 댓글의 아래에 위치할 ref */}
            <div ref={moreRef}></div>
            {(commentsStatus === "pending" || isFetchingNextPage) && (
              <CommentsSkeleton />
            )}
          </div>
        </div>
        {/* 인기 게시물 부분 */}
        <div className="hidden lg:flex flex-col gap-2 h-full relative pl-12 border-l-[1px] border-gray-300 mb-5">
          <PopularPosts
            focusBoard={focusBoard}
            handleNavigateToList={handleNavigateToList}
          />
        </div>
      </div>
    </PageContainer>
  );
}
