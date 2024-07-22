import { useState } from "react";

interface ISwitchProps {
  title?: string; // 모바일도 텍스트를 보여줘야할까?
}

export default function Switch({ title }: ISwitchProps) {
  const [isSwitched, setIsSwitched] = useState(false);

  const handleToggle = () => {
    setIsSwitched((prevSwitched) => !prevSwitched);
  };

  return (
    <div className="flex gap-2 items-center">
      <label className="relative inline-block w-16 h-8 cursor-pointer">
        <input type="checkbox" className="opacity-0" />
        <span
          onClick={handleToggle}
          className={`absolute top-0 left-0 right-0 bottom-0 ${isSwitched ? "bg-primary" : "bg-fourth"} rounded-full transition-colors duration-300 ease-in-out`}
        >
          <span
            className={`block w-8 h-8 bg-white rounded-full transform transition-transform duration-300 ease-in-out ${isSwitched ? "translate-x-8" : "translate-x-0"}`}
          ></span>
        </span>
      </label>
      <p className="font-medium">{title}</p>
    </div>
  );
}
