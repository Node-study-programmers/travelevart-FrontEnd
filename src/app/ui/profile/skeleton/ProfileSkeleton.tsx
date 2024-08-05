// prefetch 적용전까지 사용할 스켈레톤
export function ProfileSkeleton() {
  return (
    <div className="relative flex flex-col items-start w-full md:w-[30%] md:justify-center bg-white rounded-xl shadow-md p-6 lg:mt-5 md:mt-0 animate-pulse">
      <div className="w-20 h-20 rounded-full bg-skeleton mb-4"></div>
      <div className="w-1/3 h-6 bg-skeleton rounded mb-2"></div>
      <div className="w-2/3 h-4 bg-skeleton rounded"></div>
      <div className="mt-4 w-full">
        <div className="h-10 bg-skeleton rounded-lg"></div>
      </div>
    </div>
  );
}
