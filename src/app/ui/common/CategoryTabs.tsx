import { Dispatch, SetStateAction } from "react";

interface ICategoryTabsProps {
  categories: { id: number; title: string }[];
  focusTab: number;
  setFocusTab: Dispatch<SetStateAction<number>>;
}

export default function CategoryTabs({
  categories,
  focusTab,
  setFocusTab,
}: ICategoryTabsProps) {
  return (
    <div className="flex flex-col w-full md:justify-center lg:mt-5 md:mt-0">
      <div className="relative border-b border-gray-200">
        <div className="flex justify-around">
          {categories.map((category, idx) => (
            <div
              key={category.id}
              className={`flex-1 text-center py-4 cursor-pointer ${
                focusTab === idx ? "text-primary" : "text-gray-500"
              } hover:text-primary`}
              onClick={() => setFocusTab(idx)}
            >
              {category.title}
            </div>
          ))}
        </div>
        <div
          className="absolute bottom-0 left-0 h-[2px] bg-primary transition-transform duration-300 ease-out"
          style={{
            width: `${100 / categories.length}%`,
            transform: `translateX(${100 * focusTab}%)`,
          }}
        />
      </div>
    </div>
  );
}
