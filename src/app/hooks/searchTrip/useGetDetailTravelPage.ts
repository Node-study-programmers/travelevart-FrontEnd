import { get } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

// 여행지 아이템 정보를 포함하는 인터페이스
export interface TravelItem {
  id: number; // 여행지 ID
  address: string; // 주소
  image: string | ""; // 이미지 URL (빈 문자열일 수도 있음)
  title: string; // 제목
  descreiption: string; // 설명
  viewCount: number; // 조회수
  mapx: number; // 위도
  mapy: number; // 경도
}

// 전체 응답 구조를 나타내는 인터페이스
interface TravelDetailResponse {
  item: TravelItem; // 여행지 아이템
  totalSaveCount: number; // 전체 저장 수
  averageRating: number; // 평균 별점
  isSaved: boolean; // 저장 여부
}

export default function useGetDetailTravelPage(id: string) {
  return useQuery<TravelDetailResponse>({
    queryKey: ["detailPost", id],
    queryFn: () =>
      get<TravelDetailResponse>(
        `${process.env.NEXT_PUBLIC_BASE_URL}/places/${id}`,
        {
          headers: {
            "ngrok-skip-browser-warning": "true",
          },
        },
      ),
  });
}
