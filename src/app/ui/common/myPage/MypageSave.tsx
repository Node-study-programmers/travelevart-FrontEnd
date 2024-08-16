import useGetSaves from "@/app/hooks/mypage/useGetSave";

export default function MyPageSave() {
  const { data, isLoading, isError } = useGetSaves();

  if (isLoading) return <div>로딩중...</div>;

  if (isError) return <div>에러발생 띠용</div>;

  if (!data) return <div>에러발생 띠용</div>;

  return (
    <div>
      {data.map((save) => {
        return (
          <div>
            {save.place.title}
            <div>{save.place.address}</div>
            <img src={save.place.image ? save.place.image : ""} />
          </div>
        );
      })}
    </div>
  );
}
