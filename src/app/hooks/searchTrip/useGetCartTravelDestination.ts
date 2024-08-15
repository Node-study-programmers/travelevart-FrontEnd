import { get } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export interface ICartPlace {
  placeId: number;
  address: string;
  image: string;
  title: string;
  event: number;
  region: string;
}

interface ICartTravelDestinationResponse {
  cart_id: number;
  place: ICartPlace;
}

export default function useGetCartTravelDestintaion(enabled: boolean) {
  return useQuery<ICartTravelDestinationResponse[]>({
    queryKey: ["cartTravelDestinationList"],
    queryFn: () =>
      get(`${process.env.NEXT_PUBLIC_BASE_URL}/carts`, {
        headers: {
          "ngrok-skip-browser-warning": "true",
        },
      }),
    enabled,
  });
}
