import { FaCommentAlt } from "react-icons/fa";
import { GrLike } from "react-icons/gr";
import { PiEyesFill } from "react-icons/pi";
import Tooltip from "../common/Tooltip";
import useLikePost from "@/app/hooks/community/useLikePost";
import { useState } from "react";
import useLogin from "@/app/hooks/auth/useLogin";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

interface IPostBottomsProps {
  commentCount: number;
  like: number;
  views: number;
  isPostLiked?: boolean;
  postId?: string;
}

export function PostBottoms({
  commentCount,
  like,
  views,
  isPostLiked,
}: IPostBottomsProps) {
  return (
    <div className="flex justify-end gap-3 text-xs">
      <div className="flex gap-1 items-center text-gray-500">
        <FaCommentAlt /> {commentCount}
      </div>
      <div
        className={`flex gap-1 items-center ${isPostLiked ? "text-primary" : "text-gray-500"}`}
      >
        <GrLike /> {like}
      </div>
      <div className="flex gap-1 items-center text-gray-500">
        <PiEyesFill /> {views}
      </div>
    </div>
  );
}

export function PostBottomsInPost({
  commentCount,
  isPostLiked,
  like,
  views,
  postId,
}: IPostBottomsProps) {
  const [localIsPostLiked, setLocalIsPostLiked] = useState(isPostLiked);
  const [localLikeCount, setLocalLikeCount] = useState(like);
  const { likeMutation, unlikeMutation } = useLikePost(postId!);
  const { userData } = useLogin();
  const router = useRouter();
  const handleLikeClick = () => {
    if (!userData) {
      toast.info("로그인 후 이용 가능 합니다.");

      return;
    }
    if (localIsPostLiked) {
      unlikeMutation.mutate(undefined, {
        onSuccess: () => {
          setLocalIsPostLiked(false);
          setLocalLikeCount((prev) => prev - 1);
        },
      });
    } else {
      likeMutation.mutate(undefined, {
        onSuccess: () => {
          setLocalIsPostLiked(true);
          setLocalLikeCount((prev) => prev + 1);
        },
      });
    }
  };

  return (
    <div className="flex justify-around gap-3 text-base lg:text-lg w-full h-10">
      <Tooltip direction="top" content="댓글">
        <div className="flex gap-2 items-center text-gray-500 cursor-pointer">
          <FaCommentAlt /> {commentCount}
        </div>
      </Tooltip>
      <Tooltip direction="top" content="좋아요">
        <div
          className={`flex gap-2 items-center cursor-pointer ${localIsPostLiked ? "text-primary" : "text-gray-500"}`}
          onClick={handleLikeClick}
        >
          <GrLike />{" "}
          {likeMutation.status === "pending" ||
          unlikeMutation.status === "pending"
            ? localLikeCount
            : localLikeCount}
        </div>
      </Tooltip>
      <Tooltip direction="top" content="조회수">
        <div className="flex gap-2 items-center text-gray-500">
          <PiEyesFill /> {views}
        </div>
      </Tooltip>
    </div>
  );
}
