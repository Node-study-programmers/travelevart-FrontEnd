import { TTooltipDirection } from "@/lib/types";
import { useState } from "react";

interface ITooltipProps {
  children: React.ReactNode;
  content: string;
  direction: TTooltipDirection;
}

const getTooltipStyles = (direction: TTooltipDirection) => {
  switch (direction) {
    case "top":
      return "bottom-full left-1/2 transform -translate-x-1/2 mb-2";
    case "right":
      return "top-1/2 left-full transform -translate-y-1/2 ml-2";
    case "bottom":
      return "top-full left-1/2 transform -translate-x-1/2 mt-2";
    case "left":
      return "top-1/2 right-full transform -translate-y-1/2 mr-2";
    default:
      return "";
  }
};

export default function Tooltip({
  children,
  content,
  direction,
}: ITooltipProps) {
  const [hover, setHover] = useState(false);

  const toggleHover = (state: boolean) => () => setHover(state);

  // 줄바꿈 기능 추가
  const formattedContent = content.replace(/\n/g, "<br/>");

  return (
    <div
      className="relative cursor-pointer"
      onMouseEnter={toggleHover(true)}
      onMouseLeave={toggleHover(false)}
    >
      {children}
      <div
        className={`absolute whitespace-nowrap bg-primary text-white text-sm py-1 px-2 rounded transition-opacity duration-500 ${getTooltipStyles(direction)} ${hover ? "opacity-100" : "opacity-0"}`}
        // HTML 렌더링
        dangerouslySetInnerHTML={{ __html: formattedContent }}
      />
    </div>
  );
}
