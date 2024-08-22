import { IRecommendTripRequest } from "@/app/ui/common/recommendTrip/RecommendTripSetupForm";
import { get } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export interface IRecommendTripResponse {
  transportOption: "대중교통" | "자차";
  routes: {
    day: string; // 여행 날짜 (형식: 'xxxx-xx-xx')
    detail: {
      placeId: number; // 장소 ID
      address: string; // 장소 주소
      placeTitle: string; // 장소 제목
      routeIndex: number; // 경로 인덱스
      placeImage: string; // 장소 이미지 URL
      mapx: number; // 장소 X 좌표
      mapy: number; // 장소 Y 좌표
      day: number; // 여행 날짜의 몇 번째 날
      distance: string | null; // '약 10Km'; 마지막 여행지면 null
      estimatedTime: string | null; // '약 10분'; 마지막 여행지면 null
      playTime: string; // 체류 시간 (예: '2시간')
      mapLink: string | null; // 지도 링크 (마지막 여행지면 null)
    }[];
  }[];
}

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
        concept: requestQuery.concept || "",
      });

      return get<IRecommendTripResponse>(
        `/places/recommendations?${query.toString()}`,
      );
    },
    enabled: isReadyRecommend, // request query는 항상 존재 (필수 옵션)
  });
}
