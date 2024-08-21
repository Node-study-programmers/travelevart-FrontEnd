import useGetSaves from "@/app/hooks/mypage/useGetSave";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Router import 추가
import MyPageNotfound from "./MyPageNotfound";

export default function MyPageSave() {
  const { data, isLoading, isError } = useGetSaves();

  if (isLoading) return <div>로딩중...</div>;

  if (isError || !data) return <div>에러발생 띠용</div>;

  if (!data.length) {
    return <MyPageNotfound categoryTabs={"찜"} />;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full py-10">
      {data.map((save) => (
        <Link
          href={`/search-trip/${save.place.placeId}`}
          key={save.cart_id}
          className="relative h-96 bg-white border rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-xl transition-shadow"
        >
          <Image
            src={
              save.place.image ||
              `https://cdn.pixabay.com/photo/2019/06/24/16/43/mountain-4296464_640.jpg`
            }
            alt={save.place.title}
            width={640}
            height={320}
            className="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-125"
          />
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="text-2xl font-bold text-white mb-1">
              {save.place.title}
            </h3>
            <p className="text-white text-sm">{save.place.address}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
