interface INotFoundTravelDestiantionProps {
  reloadTravelDestination: () => void;
}

export default function NotFoundTravelDestiantion({
  reloadTravelDestination,
}: INotFoundTravelDestiantionProps) {
  return (
    <div className="h-[30vh] flex flex-col justify-center items-center gap-y-8">
      <p className="text-3xl text-rgb-primary">여행지가 존재하지 않습니다.</p>
      <button
        className="bg-primary px-4 py-2 rounded-xl text-white"
        onClick={reloadTravelDestination}
      >
        다른 여행지 보러가기
      </button>
    </div>
  );
}
