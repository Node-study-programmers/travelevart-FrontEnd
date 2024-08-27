import React, { useEffect, useRef, useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { GiCheckMark } from "react-icons/gi";

interface ISelectProps {
  items: string[] | number[];
  label: string;
  defaultValue?: string | number;
  className?: string;
  placeholder: string;
  onChange: React.Dispatch<React.SetStateAction<string | number>>;
}

export default function Select({
  items,
  label,
  defaultValue,
  className,
  placeholder,
  onChange,
}: ISelectProps) {
  const [listOpen, setListOpen] = useState<boolean>(false);
  const [selectValue, setSelectValue] = useState<string | number>(
    defaultValue || "",
  );
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOverlay = (e: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(e.target as Node) // Ref 영역 밖 부분
      ) {
        setListOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOverlay);

    return () => {
      document.removeEventListener("mousedown", handleClickOverlay);
    };
  }, [selectRef]);

  const handleChange = (item: string | number) => {
    setSelectValue(item);
    setListOpen(false);
    onChange(item);
  };

  const handleToggleList = () => {
    setListOpen(!listOpen);
  };

  return (
    <div
      ref={selectRef}
      className={`${className} bg-white flex w-full max-w-80 z-50 shadow-lg rounded-l-full relative`}
    >
      <div className="w-full flex flex-col relative pb-1 pl-2 lg:pb-0 lg:py-1">
        <button
          className="relative pl-5 px-3 w-full inline-flex flex-col items-start justify-center gap-0 outline-none min-h-14 py-2"
          type="button"
          onClick={handleToggleList}
        >
          <label
            className={`absolute top-1/2 -translate-y-1/2  left-5 text-xs max-w-full overflow-hidden text-ellipsis whitespace-nowrap text-primary transition-transform duration-200 ${selectValue ? "transform -translate-y-4 scale-75" : ""}`}
          >
            {label}
          </label>

          <div
            className={`inline-flex h-full items-end text-xs gap-1.5 box-border lg:text-base ${!selectValue && "hidden lg:inline-flex"} text-primary overflow-hidden text-ellipsis whitespace-nowrap font-bold`}
          >
            {selectValue}
          </div>
          <div
            className={`hidden lg:block lg:absolute right-3 w-4 h-4 text-primary transition-transform duration-200 ${listOpen ? "rotate-180" : ""}`}
          >
            <MdKeyboardArrowDown />
          </div>
        </button>
        {listOpen && (
          <div
            className={`absolute w-full top-full mt-1 p-2 bg-primary rounded-xl max-h-64 overflow-auto transition-all duration-100 ${listOpen ? "animate-fade-in" : "animate-fade-out"}`}
          >
            <ul className="w-full text-white">
              {items.map((item, index) => (
                <li
                  key={index}
                  onClick={() => handleChange(item)}
                  className={`text-left mb-1 hover:bg-secondary rounded-xl py-2 cursor-pointer pl-2 relative ${item === selectValue ? "bg-secondary" : ""}`}
                >
                  <div className="w-[90%] overflow-hidden text-ellipsis whitespace-nowrap">
                    {item}
                  </div>
                  {item === selectValue && (
                    <span className="absolute right-1 flex top-1/2 -translate-y-1/2">
                      <GiCheckMark />
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
