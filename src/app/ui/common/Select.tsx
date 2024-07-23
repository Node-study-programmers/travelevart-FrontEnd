import React, { useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
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
  const [selectValue, setSelectValue] = useState<string | number>();

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
      className={`${className} bg-primary flex w-full max-w-80 rounded-md shadow-lg`}
    >
      <div className="w-full flex flex-col relative">
        <button
          className="relative px-3 w-full inline-flex shadow-sm rounded-md flex-col items-start justify-center gap-0 outline-none h-14 min-h-14 py-2"
          type="button"
          onClick={handleToggleList}
        >
          <label className="absolute z-10 pointer-events-none cursor-pointer will-change-auto top-2 left-3 text-xs max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
            {label}
          </label>
          <div
            className={`inline-flex h-full min-h-4 items-end gap-1.5 box-border text-sm ${selectValue || defaultValue ? "text-black" : "text-gray-500"} overflow-hidden text-ellipsis whitespace-nowrap`}
          >
            {selectValue
              ? selectValue
              : defaultValue
                ? defaultValue
                : placeholder}
          </div>
          <div
            className={`absolute right-3 w-4 h-4 text-black transition-transform duration-200 ${
              listOpen ? "rotate-180" : ""
            }`}
          >
            <MdKeyboardArrowDown />
          </div>
        </button>
        {listOpen && (
          <div
            className={`absolute w-full top-16 p-2 bg-primary shadow-md rounded-xl flex items-center max-h-64 overflow-auto transition-all duration-100 ${
              listOpen ? "animate-fade-in" : "animate-fade-out"
            }`}
          >
            <ul className="w-full">
              {items.map((item, index) => (
                <li
                  key={index}
                  onClick={() => handleChange(item)}
                  className={`text-left hover:bg-secondary rounded-xl py-2 cursor-pointer pl-2 relative ${item === selectValue && "bg-secondary"}`}
                >
                  <div
                    className={`w-[90%] overflow-hidden text-ellipsis whitespace-nowrap`}
                  >
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
