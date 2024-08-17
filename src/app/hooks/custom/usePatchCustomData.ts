import { patch } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";

interface IPatchCustomData {
  travelName: string;
  travelrouteRange: number;
}

export default function usePatchCustomData(id: string) {
  return useMutation({
    mutationFn: ({ reqData }: { reqData: IPatchCustomData }) => {
      const res = patch(`/travelroutes/${id}`, reqData);
      return res;
    },
  });
}
