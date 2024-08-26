import { useRouter } from "next/navigation";

export default function MyPageNotfound({
  categoryTabs,
}: {
  categoryTabs: string;
}) {
  const router = useRouter();

  return (
    <div className="h-[700px] mb-10 flex flex-col justify-center items-center gap-y-8">
      <h1 className="text-3xl text-rgb-secondary">
        {categoryTabs} 목록이 비어있습니다.
      </h1>
      {/* <button
        className="bg-primary text-white px-4 py-2 rounded-xl"
        onClick={() => router.push("/search-trip")}
      >
        찜 추가하러 가기
      </button> */}
    </div>
  );
}
