import { logoFont } from "@/font";
import { IoEarthOutline } from "react-icons/io5";
import { RiNotionFill } from "react-icons/ri";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative w-full flex justify-center bg-slate-50 text-rgb-primary pt-6 pb-24">
      <div className="max-w-[1280px] w-full mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between border-b border-fourth mx-10 lg:mx-0">
          <div className="w-full max-w-80 text-4xl text-rgb-primary text-center lg:text-left">
            <div className="flex items-center gap-2 justify-center lg:justify-start">
              <IoEarthOutline />
              <h1 className={`${logoFont.className} tracking-wider`}>
                TravelevarT
              </h1>
            </div>
            <span className="text-[0.65rem] text-rgb-secondary">
              TravelevarT는 여행지 추천 기반 커뮤니티 서비스입니다.
            </span>
          </div>
          <div className="flex gap-8 mb-6 justify-around">
            <div className="font-bold">
              Back-end
              <div className="flex flex-col justify-center items-center text-rgb-secondary font-light text-[0.875rem]">
                <span>
                  <Link href="https://github.com/jacknafa" target="_blank">
                    김준서
                  </Link>
                </span>
                <span>
                  <Link href="https://github.com/nyh98" target="_blank">
                    남용환
                  </Link>
                </span>
                <span>
                  <Link href="https://github.com/chansik0504" target="_blank">
                    박성률
                  </Link>
                </span>
              </div>
            </div>
            <div className="font-bold">
              Front-end
              <div className="flex flex-col justify-center items-center text-rgb-secondary font-light text-[0.875rem]">
                <span>
                  <Link href="https://github.com/kwonsuhyuk" target="_blank">
                    권수혁
                  </Link>
                </span>
                <span>
                  <Link
                    href="https://github.com/choongnyeong6215"
                    target="_blank"
                  >
                    이충녕
                  </Link>
                </span>
                <br />
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center mt-6 mb-16 mx-10 lg:mx-0">
          <span className="text-[0.65rem] text-rgb-secondary">
            ⓒ 2024. TravelevarT. All rights reserved
          </span>
          <div className="flex justify-center items-center gap-2">
            <Link
              href="https://living-flower-b1f.notion.site/cab58e81efe649b8bfa3a275e2d654e7"
              target="_blank"
            >
              <RiNotionFill className="text-3xl" />
            </Link>
            <Link
              href="https://github.com/orgs/Node-study-programmers/repositories"
              target="_blank"
            >
              <FaGithub className="text-3xl" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
