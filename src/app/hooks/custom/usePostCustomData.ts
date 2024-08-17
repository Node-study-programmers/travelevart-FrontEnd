import { post } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";

export interface IDetail {
  placeId: number;
  routeIndex: number;
  contents: string | null;
  mapLink: string | null;
}

export interface ITravelDay {
  date: string;
  details: IDetail[];
}

export interface ITravelCustomPostData {
  transportOption: "public" | "car";
  items: ITravelDay[];
}

export default function usePostCustomData(detailId: string) {
  return useMutation({
    mutationFn: ({ reqData }: { reqData: ITravelCustomPostData }) => {
      const res = post(`/travelroutes/${detailId}`, reqData);
      return res;
    },
  });
}
