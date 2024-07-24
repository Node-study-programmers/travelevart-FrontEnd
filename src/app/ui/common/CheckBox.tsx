import { TCheckBoxGroupDirecion } from "@/lib/types";
import React, { ChangeEvent, FormEvent, useState } from "react";

interface ICheckBoxProps {
  representativeTitle: string;
  direction: TCheckBoxGroupDirecion;
  items: string[] | number[];
}

export default function CheckBox({
  representativeTitle,
  direction,
  items,
}: ICheckBoxProps) {
  const [isChecked, setIsChecked] = useState(false);
  const [checkedItems, setCheckedItems] = useState<(string | number)[]>([]);

  const handleCheckItem = (
    e: ChangeEvent<HTMLInputElement>,
    item: string | number,
  ) => {
    setIsChecked(!isChecked);

    handleFormChekcedItem(item, e.target.checked);
  };

  // 체크 항목 확인
  const handleFormChekcedItem = (item: string | number, checked: boolean) => {
    if (checked) {
      setCheckedItems((prevCheckedItems) => {
        return [...prevCheckedItems, item];
      });
    } else {
      setCheckedItems((prevCheckedItems) => {
        return prevCheckedItems.filter((checkedItem) => checkedItem !== item);
      });
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="w-full max-w-80 ">
      <h1>{representativeTitle}</h1>
      <form
        onSubmit={handleSubmit}
        className={`flex ${direction === "vertical" ? "flex-col" : "flex-row"} gap-4 flex-wrap justify-center rounded-md p-2 mt-4 bg-white shadow-lg overflow-hidden`}
      >
        {items.map((item) => (
          <div key={item} className="flex gap-0.5">
            <input
              type="checkbox"
              id={item as string}
              onChange={(e) => handleCheckItem(e, item)}
              className="accent-primary"
            />
            <label
              htmlFor={item as string}
              className={`mr-4 cursor-pointer hover:text-primary`}
            >
              {item}
            </label>
          </div>
        ))}
        <div>
          <button type="submit">submit</button>
        </div>
      </form>
    </div>
  );
}
