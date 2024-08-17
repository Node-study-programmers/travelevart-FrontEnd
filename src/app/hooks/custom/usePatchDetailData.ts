import { patch } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";
import { ITravelCustomPostData } from "./usePostCustomData";

export default function usePatchDetailData(id: string) {
  return useMutation({
    mutationFn: ({ reqData }: { reqData: ITravelCustomPostData }) => {
      const res = patch(`/travelroutes/${id}/details`, reqData);
      return res;
    },
  });
}
