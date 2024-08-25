"use client";
import { useForm } from "react-hook-form";
import { FiUpload } from "react-icons/fi";
import { useState } from "react";
import Image from "next/image";
import usePostNewPost from "@/app/hooks/community/usePostNewPost";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface FormData {
  title: string;
  content: string;
  image: FileList | null;
}

export default function WriteFreePost() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const router = useRouter();
  const { mutate } = usePostNewPost();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = (data: FormData) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("contents", JSON.stringify([{ text: data.content }])); // 수정된 부분
    formData.append("travelRoute_id", String(null)); // 여행 경로 ID 설정

    if (selectedFile) {
      formData.append("image[0]", selectedFile);
    }

    // 서버로 전송
    mutate(formData, {
      onSuccess: () => {
        toast.info("게시물 등록이 완료되었습니다.");
        router.push("/community/free");
      },
      onError: (error) => {
        toast.error("게시글 등록에 실패했습니다.");
        console.error(error);
      },
    });
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-700">
            새로운 자유게시글 작성하기
          </h2>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-500"
          >
            제목을 입력해주세요
          </label>
          <input
            id="title"
            {...register("title", {
              required: "제목을 입력해주세요.",
              minLength: {
                value: 5,
                message: "제목은 5자 이상이어야 합니다.",
              },
              maxLength: {
                value: 100,
                message: "제목은 100자 이하이어야 합니다.",
              },
            })}
            className="mt-1 block w-full border border-gray-200 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-secondary-500 focus:border-secondary-500 sm:text-sm text-gray-900"
            placeholder="제목을 입력하세요"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label
            htmlFor="content"
            className="block text-sm font-medium text-gray-500"
          >
            내용
          </label>
          <textarea
            id="content"
            {...register("content", { required: "내용을 입력해주세요." })}
            rows={4}
            className="mt-1 block w-full border border-gray-200 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-secondary-500 focus:border-secondary-500 sm:text-sm text-gray-900"
            placeholder="궁금한 내용을 작성해주세요..."
          />
          {errors.content && (
            <p className="text-red-500 text-sm mt-1">
              {errors.content.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-500">
            이미지 업로드
          </label>
          <div className="flex items-center space-x-4">
            <label
              htmlFor="image"
              className="cursor-pointer text-gray-500 hover:text-gray-600 flex items-center space-x-2"
            >
              <FiUpload className="text-xl" />
              <span>이미지 선택</span>
            </label>
            <input
              id="image"
              type="file"
              {...register("image")}
              className="hidden"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>
          {imagePreview && (
            <div className="mt-4 flex items-center">
              <Image
                src={imagePreview}
                alt="미리보기"
                width={100}
                height={100}
                className="w-32 h-32 object-cover rounded-md border border-gray-200 shadow-sm"
              />
            </div>
          )}
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-primary text-white py-2 px-4 rounded-md hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            완료
          </button>
        </div>
      </form>
    </div>
  );
}
