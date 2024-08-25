"use client";

import { useRouter } from "next/navigation";
import { logoFont } from "./asset/fonts/fonts";

export default function Error() {
  const router = useRouter();
  const currentUrl = window.location.href;
  const baseUrl = `${window.location.origin}/`;

  const handlePreviousPage = () => {
    currentUrl === baseUrl ? router.push("/") : router.back();
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
