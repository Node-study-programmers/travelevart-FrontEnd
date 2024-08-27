import { get } from "@/lib/api";
import { ICarouselContents } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";

export interface Event {
  id: number;
  startDay: string;
  endDay: string;
  title: string;
  region: string;
  image: string;
}

// 전체 응답을 정의하는 인터페이스
export interface EventsResponse {
  events: Event[];
}

export default function useBannerContents() {
  return useQuery<EventsResponse>({
    queryKey: ["bannerContents"],
    queryFn: () => {
      return get<EventsResponse>(`${process.env.NEXT_PUBLIC_BASE_URL}/events/`);
    },
  });
}
