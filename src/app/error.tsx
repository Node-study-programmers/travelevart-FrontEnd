"use client";

import { logoFont } from "@/font";
import { useRouter } from "next/navigation";

export default function Error() {
  const router = useRouter();

  const handlePreviousPage = () => {
    const previousUrl = document.referrer;

    previousUrl ? router.push(previousUrl) : router.back();
  };

  return (
    <div className="bg-black text-white flex justify-center items-center w-screen h-screen flex-col gap-10">
      <h2 className={`${logoFont.className} tracking-wider text-[5.3vw]`}>
        Error
      </h2>
      <button onClick={handlePreviousPage}>Previous Page</button>
    </div>
  );
}
