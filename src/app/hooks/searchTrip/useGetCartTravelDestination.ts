import { get } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export interface ICartPlace {
  placeId: number;
  address: string;
  image: string;
  title: string;
  event: number;
  totalSaveCount: number;
  isSaved: boolean;
}

export interface ICartTravelDestinationResponse {
  cartId: number;
  place: ICartPlace;
}

export default function useGetCartTravelDestintaion(
  enabled: boolean,
  userId: number | undefined,
) {
  return useQuery<ICartTravelDestinationResponse[]>({
    queryKey: ["cartTravelDestination"],
    queryFn: () => get(`${process.env.NEXT_PUBLIC_BASE_URL}/carts/${userId}`),
    enabled,
  });
}
