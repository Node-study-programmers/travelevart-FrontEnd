function TravelDestinationSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="bg-skeleton h-56 w-full rounded-2xl"></div>
      <div className="py-2">
        <div className="flex justify-between">
          <div className="bg-skeleton h-4 rounded w-3/5 mb-2"></div>
          <div className="bg-skeleton h-4 rounded w-1/5 mb-2"></div>
        </div>
        <div className="bg-skeleton h-4 rounded w-full"></div>
      </div>
    </div>
  );
}

export default function TravelDestinationSkeletons() {
  return (
    <>
      <TravelDestinationSkeleton />
      <TravelDestinationSkeleton />
      <TravelDestinationSkeleton />
      <TravelDestinationSkeleton />
      <TravelDestinationSkeleton />
      <TravelDestinationSkeleton />
      <TravelDestinationSkeleton />
      <TravelDestinationSkeleton />
      <TravelDestinationSkeleton />
      <TravelDestinationSkeleton />
      <TravelDestinationSkeleton />
      <TravelDestinationSkeleton />
    </>
  );
}
