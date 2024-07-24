import { ChangeEvent, useState } from "react";
import "@/app/globals.css";

export default function RangeSlider() {
  const [minExpense, setMinExpense] = useState(0);
  const [maxExpense, setMaxExpense] = useState(500000);

  const minRange = (minExpense / 500000) * 100;
  const maxRange = (maxExpense / 500000) * 100;

  const handleMinExpense = (e: ChangeEvent<HTMLInputElement>) => {
    const currentMinExpense = Number(e.target.value);

    if (currentMinExpense > maxExpense - 50000) {
      setMinExpense(maxExpense - 50000);
    } else {
      setMinExpense(currentMinExpense);
    }
  };

  const handleMaxExpense = (e: ChangeEvent<HTMLInputElement>) => {
    const currentMaxExpense = Number(e.target.value);

    // Ensure maxExpense does not go below minExpense
    if (currentMaxExpense < minExpense + 50000) {
      setMaxExpense(minExpense + 50000);
    } else {
      setMaxExpense(currentMaxExpense);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-8 p-4 md:p-8">
      <div className="relative w-3/4 md:w-full max-w-3xl h-[5px] rounded-2xl bg-slate-200">
        <div
          className={`absolute h-[5px] rounded-2xl bg-fourth`}
          style={{
            left: `${minRange}%`,
            width: `${maxRange - minRange}%`,
          }}
        />
        <div className="relative z-10">
          <input
            type="range"
            className="range-thumb absolute w-full"
            min="0"
            max="500000"
            value={minExpense}
            onChange={handleMinExpense}
          />
          <input
            type="range"
            className="range-thumb absolute w-full"
            min="0"
            max="500000"
            value={maxExpense}
            onChange={handleMaxExpense}
          />
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-between items-center w-3/4 md:w-full  max-w-3xl space-y-4 md:space-y-0 md:space-x-4">
        <div className="w-full md:w-2/5 border border-fourth rounded-xl p-2">
          <div>
            <p className="text-sm text-fourth">최저 경비</p>
          </div>
          <div>
            <p>{`₩ ${minExpense.toLocaleString()}`}</p>
          </div>
        </div>
        <div className="w-full md:w-1/5 flex justify-center">
          <p className="font-bold text-2xl">ㅡ</p>
        </div>
        <div className="w-full md:w-2/5 border border-fourth rounded-xl p-2">
          <div>
            <p className="text-sm text-fourth">최대 경비</p>
          </div>
          <div>
            <p>{`₩ ${maxExpense.toLocaleString()}`}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
