"use client";

import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import useGetDetailTravelData from "@/app/hooks/custom/useGetDetailTravelData";
import { TravelRoutes } from "@/app/hooks/mypage/useGetTravelRoute";
import { FiUpload } from "react-icons/fi";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import usePostNewPost from "@/app/hooks/community/usePostNewPost";

export interface ITravelPostForm {
  title: string; // Add title to form data
  items: {
    date: string;
    details: {
      placeId: number;
      routeIndex: number;
      contents: string;
      image: File | null;
    }[];
  }[];
}

function logFormData(formData: FormData) {
  for (let pair of formData.entries()) {
    console.log(pair[0] + ": " + (pair[1] instanceof File ? "File" : pair[1]));
  }
}

export default function WriteTravelPostSecondStep({
  selectedRoute,
  onBack,
}: {
  selectedRoute: TravelRoutes["routes"][number];
  onBack: () => void;
}) {
  const { data, isLoading, isError } = useGetDetailTravelData(
    selectedRoute?.id ?? -1,
  );
  const router = useRouter();
  const { mutate } = usePostNewPost();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<ITravelPostForm>({
    defaultValues: { title: "", items: [] },
  });

  const { fields, append } = useFieldArray({
    control,
    name: "items",
  });

  const [imagePreviews, setImagePreviews] = useState<{
    [key: string]: string | null;
  }>({});

  useEffect(() => {
    if (data && Array.isArray(data.items)) {
      const formattedItems = data.items.map((travelDay: any) => ({
        date: travelDay.date || "",
        details:
          travelDay.details?.map((detail: any) => ({
            detailtravelId: detail.detailtravelId,
            placeId: detail.placeId ?? -1,
            routeIndex: detail.routeIndex ?? 0,
            contents: "",
            image: null,
          })) || [],
      }));
      setValue("items", formattedItems);
    }
  }, [data, setValue]);

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldIndex: number,
    detailIndex: number,
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviews((prev) => ({
          ...prev,
          [`${fieldIndex}-${detailIndex}`]: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
      setValue(`items.${fieldIndex}.details.${detailIndex}.image`, file);
    }
  };

  const onSubmit = (data: ITravelPostForm) => {
    const formData = new FormData();
    formData.append("title", data.title);

    const contents = data.items.flatMap((item) =>
      item.details.map((detail) => ({
        text: detail.contents,
        detailtravel_id: detail.detailtravelId,
      })),
    );
    formData.append("contents", JSON.stringify(contents));

    formData.append("travelRoute_id", String(selectedRoute.id ?? null));

    data.items.forEach((item, itemIndex) => {
      item.details.forEach((detail, detailIndex) => {
        if (detail.image) {
          formData.append(`image`, detail.image);
        }
      });
    });

    mutate(formData, {
      onSuccess: () => {
        toast.info("게시물 등록이 완료되었습니다.");
        router.push("/community/travel");
      },
      onError: (error) => {
        toast.error("게시글 등록에 실패했습니다.");
        console.error(error);
      },
    });
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading data.</div>;

  if (!data || !Array.isArray(data.items)) {
    return <div>데이터가 없습니다.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 bg-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">
          {selectedRoute?.travelName || "선택된 경로 정보"}
        </h2>
        <button
          onClick={onBack}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          뒤로 가기
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Title Input */}
        <div className="mb-6">
          <label
            htmlFor="title"
            className="block text-lg font-semibold text-gray-700 mb-2"
          >
            제목
          </label>
          <input
            id="title"
            {...register("title", { required: "제목을 입력해주세요" })}
            type="text"
            className={`block w-full border border-gray-300 rounded-lg shadow-sm py-3 px-4 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-md text-gray-900 ${errors.title ? "border-red-500" : ""}`}
            placeholder="제목을 입력하세요"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-2">{errors.title.message}</p>
          )}
        </div>

        {fields.map((field, index) => (
          <div key={field.id} className="p-6 bg-white shadow-lg rounded-lg">
            <h4 className="text-xl font-semibold mb-4 text-gray-800">
              {field.date} 일정
            </h4>

            {field.details.map((detail, detailIndex) => (
              <div key={detailIndex} className="space-y-6 mb-6">
                <div className="flex items-center space-x-4">
                  {data.items[index]?.details[detailIndex]?.placeImage && (
                    <Image
                      src={data.items[index]?.details[detailIndex]?.placeImage}
                      alt={
                        data.items[index]?.details[detailIndex]?.placeTitle ||
                        "Place Image"
                      }
                      width={120}
                      height={120}
                      className="rounded-lg border border-gray-300"
                    />
                  )}
                  <div>
                    <h5 className="font-semibold text-lg text-gray-900">
                      {data.items[index]?.details[detailIndex]?.placeTitle ||
                        "장소"}
                    </h5>
                    <p className="text-gray-600">
                      {data.items[index]?.details[detailIndex]?.address ||
                        "주소"}
                    </p>
                  </div>
                </div>

                {/* Image Upload */}
                <div className="space-y-4 mb-4">
                  <label className="block text-sm font-medium text-gray-600">
                    이미지 업로드
                  </label>
                  <div className="flex items-center space-x-4">
                    <label
                      htmlFor={`image-${index}-${detailIndex}`}
                      className="cursor-pointer text-blue-600 hover:text-blue-700 flex items-center space-x-2"
                    >
                      <FiUpload className="text-xl" />
                      <span>이미지 선택</span>
                    </label>
                    <input
                      id={`image-${index}-${detailIndex}`}
                      type="file"
                      {...register(
                        `items.${index}.details.${detailIndex}.image`,
                      )}
                      className="hidden"
                      accept="image/*"
                      onChange={(e) => handleImageChange(e, index, detailIndex)}
                    />
                  </div>
                  {imagePreviews[`${index}-${detailIndex}`] && (
                    <div className="mt-4 flex items-center">
                      <Image
                        src={imagePreviews[`${index}-${detailIndex}`] as string}
                        alt="미리보기"
                        width={120}
                        height={120}
                        className="w-32 h-32 object-cover rounded-lg border border-gray-200 shadow-sm"
                      />
                    </div>
                  )}
                </div>

                {/* Contents Input */}
                <textarea
                  {...register(
                    `items.${index}.details.${detailIndex}.contents`,
                    { required: "내용을 입력해주세요" },
                  )}
                  className={`mt-2 block w-full border border-gray-300 rounded-lg shadow-sm py-3 px-4 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-md text-gray-900 ${errors.items?.[index]?.details?.[detailIndex]?.contents ? "border-red-500" : ""}`}
                  placeholder="공유할 내용을 입력해주세요"
                />
                {errors.items?.[index]?.details?.[detailIndex]?.contents && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.items[index].details[detailIndex].contents.message}
                  </p>
                )}
              </div>
            ))}
          </div>
        ))}

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-6 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            작성 완료
          </button>
        </div>
      </form>
    </div>
  );
}
