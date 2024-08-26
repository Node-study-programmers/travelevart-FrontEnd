import { logoFont } from "@/app/asset/fonts/fonts";
import { TRAVEL_REGION_GROUP } from "@/constant";
import Image from "next/image";

export default function TravelRegionBanner({
  regionCode,
}: {
  regionCode: number;
}) {
  return (
    <div className="relative w-full group overflow-hidden h-[50vh]">
      <Image
        src={TRAVEL_REGION_GROUP[regionCode].imageUrl}
        alt={TRAVEL_REGION_GROUP[regionCode].region}
        layout="fill"
        objectFit="cover"
        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
        priority={true}
        placeholder="blur"
        blurDataURL="data:image/svg+xml;base64,...base64-encoded-data..."
        className="absolute inset-0"
      />
      <h1
        className={`absolute font-bold inset-0 flex items-center justify-center text-white text-5xl lg:text-7xl ${logoFont.className}`}
      >
        {TRAVEL_REGION_GROUP[regionCode].region}
      </h1>
    </div>
  );
}
