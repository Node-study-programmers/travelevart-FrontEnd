import { FaSearch } from "react-icons/fa";
import Select from "../common/Select";
import useGetRegionCode from "@/app/hooks/searchTrip/useGetRegionCode";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface Region {
  id: number;
  region: string;
}

interface ITravelSearchBarProps {
  setRegionCode: Dispatch<SetStateAction<number>>;
  setSearchName: Dispatch<SetStateAction<string>>;
}

export default function TravelSearchBar({
  setRegionCode,
}: ITravelSearchBarProps) {
  const { data, isLoading } = useGetRegionCode();
  const [region, setRegion] = useState<string | number>("");

  useEffect(() => {
    if (data) {
      const regionId = data?.regions.find((item) => item.region === region)?.id;
      setRegionCode(regionId);
    }
  }, [region, data?.regions, data]);

  if (isLoading) return null;

  const regionOptions: string[] =
    data?.regions.map((item: Region) => item.region) || [];

  return (
    
  );
}
