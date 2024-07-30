import Link from "next/link";
import { useEffect, useRef, useState } from "react";

interface IDropDownProps {
  toggleTitle: React.ReactNode | string;
  openStatus?: boolean;
  contents: string[] | number[];
}

export default function DropDown({
  toggleTitle,
  openStatus = false,
  contents,
}: IDropDownProps) {
  const [isOpen, setIsOpen] = useState(openStatus);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOverlay = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) // Ref 영역 밖 클릭
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOverlay);

    return () => {
      document.removeEventListener("mousedown", handleClickOverlay);
    };
  }, [dropdownRef]);

  const handleDropDown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className="flex flex-col justify-center items-center flex-wrap mt-20 relative"
      ref={dropdownRef}
    >
      <button
        onClick={handleDropDown}
        className="bg-transparent border-none cursor-pointer outline-none"
      >
        {toggleTitle}
      </button>
      {isOpen && (
        <div
          className={`absolute top-8 p-2 bg-primary shadow-md rounded-xl flex flex-col items-start max-w-xs transition-all duration-100 ${
            isOpen ? "animate-fade-in" : "animate-fade-out"
          }`}
          style={{ minWidth: "max-content" }}
        >
          <ul className="w-full list-none p-0 m-0">
            {contents.map((content) => (
              <li
                key={content}
                className="hover:bg-secondary rounded-xl p-2 cursor-pointer whitespace-nowrap"
              >
                <Link href={`/`}>{content}</Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
