export default function TravelSearchBarSkeleton() {
  return (
    <div
      className="absolute left-1/2 w-full max-w-3xl bg-gray-200 h-16 shadow-xl rounded-xl -bottom-8 -translate-x-1/2
      flex animate-pulse"
    >
      <div className="flex-grow bg-gray-300 h-full rounded-xl mx-4"></div>

      <div
        className="bg-gray-300 h-full w-16 rounded-xl flex items-center justify-center
        text-gray-400 text-3xl"
      >
        <div className="w-8 h-8 bg-gray-400 rounded-full"></div>
      </div>
    </div>
  );
}
