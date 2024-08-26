import { get } from "@/lib/api";
import { IUserSaveData } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";

export default function useGetSaves(userId: number) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["key"],
    queryFn: () => get<IUserSaveData>(`carts/${userId}`),
  });

  return { data, isLoading, isError };
}
