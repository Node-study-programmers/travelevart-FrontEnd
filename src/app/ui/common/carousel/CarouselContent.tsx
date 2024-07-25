import { ICarouselContents } from "@/lib/types";

interface ICarouselContentProps {
  content: ICarouselContents;
}

export default function CarouselContent({ content }: ICarouselContentProps) {
  return (
    <div className="flex flex-shrink-0 flex-grow-0 basis-full justify-center items-center text-center relative">
      <img
        src={content.imageUrl}
        alt={content.title}
        className="w-full max-w-full"
      />
      <div className="absolute top-0 left-8 w-2/5 h-full flex flex-col justify-center items-center">
        <h2 className="text-5xl font-semibold mb-4 text-white">
          {content.title}
        </h2>
        <p className="text-xl text-white">{content.description}</p>
      </div>
    </div>
  );
}
