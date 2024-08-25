import { useEffect, useRef, useState } from "react";

interface IDropDownProps {
  children: React.ReactNode | string;
  openStatus?: boolean;
  contents: string[];
  handleClickValue: (value: string) => void; // 값을 전달할 함수 타입 정의
}

export default function DropDown({
  children,
  openStatus = false,
  contents,
  handleClickValue,
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
      className="flex flex-col justify-center items-center flex-wrap relative"
      ref={dropdownRef}
    >
      <button
        onClick={handleDropDown}
        className="bg-transparent border-none cursor-pointer outline-none z-10"
      >
        {children}
      </button>
      {isOpen && (
        <div
          className={`z-[100] absolute top-8 p-2 bg-primary shadow-md rounded-xl flex flex-col items-start max-w-xs transition-all duration-100 ${
            isOpen ? "animate-fade-in" : "animate-fade-out"
          }`}
          style={{ minWidth: "max-content" }}
        >
          <ul className="w-full list-none p-0 m-0">
            {contents.map((content, index) => (
              <li
                key={content}
                className="hover:bg-secondary rounded-xl p-2 cursor-pointer whitespace-nowrap text-white"
              >
                {/* 화살표 함수로 클릭한 값을 전달 */}
                <div
                  onClick={() => {
                    handleClickValue(content);
                    setIsOpen(false);
                  }}
                >
                  {index + 1} 일차
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
