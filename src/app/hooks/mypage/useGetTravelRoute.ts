import { get } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export interface TravelRoute {
  id: number;
  userId: number;
  travelName: string;
  travelrouteRange: number; // TINYINT
  startDate: string; // DATE
  endDate: string; // DATE
  detailtravelImage?: string | null; // Optional field
}

export interface TravelRoutes {
  totalPage: number;
  currentPage: number;
  routes: TravelRoute[];
}

interface UseUserGetTravelRouteOptions {
  userId: number | undefined; //
  page: number;
  pageSize: number;
}

export default function useUserGetTravelRoute({
  userId,
  page,
  pageSize,
}: UseUserGetTravelRouteOptions) {
  return useQuery({
    queryKey: ["userTravelRoute", userId, page, pageSize],
    queryFn: () =>
      get<TravelRoutes>(
        `${process.env.NEXT_PUBLIC_BASE_URL}/travelroutes/${userId}?page=${page}&pageSize=${pageSize}`,
      ),
    retry: 0,
  });
}
