import { logoFont } from "@/font";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="bg-black text-white flex justify-center items-center h-screen w-screen flex-col gap-10">
      <h2 className={`${logoFont.className} tracking-wider text-[5.3vw]`}>
        Not Found
      </h2>
      <Link href="/" className="underline">
        Return Home
      </Link>
    </div>
  );
}
