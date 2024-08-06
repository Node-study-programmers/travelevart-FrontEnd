import { CommentFormValues } from "@/app/community/[board]/[id]/page";
import { Session } from "next-auth";
import Image from "next/image";
import { useForm } from "react-hook-form";

interface ICommentFormProps {
  onSubmit: (data: CommentFormValues, reset: () => void) => void;
  userData?: Session | null;
  handleInputClick: () => void;
  status: "authenticated" | "unauthenticated" | "loading";
}

export default function CommentForm({
  onSubmit,
  userData,
  handleInputClick,
  status,
}: ICommentFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CommentFormValues>();

  const handleFormSubmit = (data: CommentFormValues) => {
    onSubmit(data, reset);
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      onClick={handleInputClick}
      className={`mb-6 p-4 flex gap-3 ${status === "unauthenticated" && "cursor-pointer"}`}
    >
      <Image
        src={
          status !== "authenticated"
            ? "http://t1.kakaocdn.net/account_images/default_profile.jpeg.twg.thumb.R640x640"
            : userData?.user?.profileImg
        }
        alt="profile"
        width={40}
        loading="lazy"
        height={40}
        className="rounded-full border-[1px] border-transparent w-10 h-10"
      />
      <div className="flex w-full">
        <input
          type="text"
          autoComplete="off"
          placeholder="댓글을 입력해주세요"
          className={`w-full border-b-[1px] border-gray-300 outline-none ${status === "unauthenticated" && "cursor-pointer"}`}
          disabled={status === "unauthenticated"}
          {...register("contents", { required: true })}
        />
        {errors.contents && (
          <span className="text-red-500 text-sm">댓글을 입력해주세요.</span>
        )}
        <button
          type="submit"
          className="bg-primary text-white px-4 py-2 ml-2 rounded-lg whitespace-nowrap hover:bg-secondary"
        >
          등록
        </button>
      </div>
    </form>
  );
}
