import Image from "next/image";

interface IAllTravelDestinationProps {
  representativeImg: string;
  title: string;
}

export default function AllTravelDestination({
  representativeImg,
  title,
}: IAllTravelDestinationProps) {
  return (
    <div>
      <Image
        src={representativeImg || ""}
        alt={title}
        width={1000}
        height={1000}
      />
      <p>{title}</p>
    </div>
  );
}
