export default function FestivalSkeleton() {
  return (
    <div className="flex flex-col lg:flex-row gap-12 justify-center mb-20 lg:mb-0">
      <div className="relative lg:w-1/2 aspect-[9/14] mt-5 lg:my-10">
        <div className="w-full h-full bg-gray-300 rounded-2xl animate-pulse"></div>
      </div>
      <div className="lg:w-1/2 text-3xl lg:pt-10 pb-10">
        <div className="flex flex-col gap-5">
          <div className="w-3/4 h-10 bg-gray-300 rounded-lg animate-pulse"></div>
          <div className="flex justify-between items-start mb-10">
            <div className="w-24 h-8 bg-gray-300 rounded-lg animate-pulse"></div>
            <div className="w-48 h-8 bg-gray-300 rounded-lg animate-pulse"></div>
          </div>
          <div className="relative w-full h-[400px]">
            <div className="absolute inset-0">
              <div className="w-full h-full bg-gray-300 rounded-lg animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
