import { get } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export type TregionResponse = {
  id: number;
  region: string;
};

interface RegionResponse {
  regions: TregionResponse[];
}

export default function useGetRegionCode() {
  return useQuery<RegionResponse>({
    queryKey: ["regionCode"],
    queryFn: () => get(`${process.env.NEXT_PUBLIC_BASE_URL}/places/region`),
  });
}
