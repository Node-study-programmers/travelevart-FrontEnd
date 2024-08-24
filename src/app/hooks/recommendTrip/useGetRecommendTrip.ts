import { get } from "@/lib/api";
import { IRecommendTripRequest, IRecommendTripResponse } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";

export default function useGetRecommendTrip(
  requestQuery: IRecommendTripRequest,
  isReadyRecommend: boolean,
) {
  return useQuery<IRecommendTripResponse>({
    queryKey: ["recommendations", requestQuery],
    queryFn: async () => {
      const query = new URLSearchParams({
        region1: requestQuery.region1.toString(),
        region2: requestQuery.region2?.toString() || "",
        region3: requestQuery.region3?.toString() || "",
        sdate: requestQuery.sdate,
        edate: requestQuery.edate,
        transportation: requestQuery.transportation,
        age: requestQuery.age ? requestQuery.age.toString() : "",
        people: requestQuery.people ? requestQuery.people.toString() : "",
      });

      return get<IRecommendTripResponse>(
        `/places/recommendations?${query.toString()}`,
      );
    },
    enabled: isReadyRecommend, // request query는 항상 존재 (필수 옵션)
  });
}
