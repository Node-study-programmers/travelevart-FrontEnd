"use client";

import { PiNotePencil } from "react-icons/pi";
import { FormEvent, useEffect, useRef, useState } from "react";
import { TFocusBoard } from "@/lib/types";
import { IoSearch } from "react-icons/io5";
import { GrPowerReset } from "react-icons/gr";
import usePostInfinitiQuery from "@/app/hooks/community/usePostsInfinitiQuery";
import useIntersectionObserver from "@/app/hooks/useIntersectionObserver";
import PageContainer from "../common/PageContainer";
import CategoryTabs from "../common/CategoryTabs";
import { useRouter } from "next/navigation";
import CommunityTravelPost, {
  ICommunityTravelPostProps,
} from "./CommunityTravelPost";
import CommunityFreePost, {
  ICommunityFreePostProps,
} from "./CommunityFreePost";
import {
  CommunityFreePostSkeletons,
  CommunityTravelPostSkeletons,
} from "./skeleton/CommunityPostSkeleton";
import PopularPosts from "./PopularPosts";
import Link from "next/link";
import useLogin from "@/app/hooks/auth/useLogin";
import Image from "next/image";

const categories = [
  { id: 0, title: "Stories", path: "travel" },
  { id: 1, title: "Questions", path: "free" },
];

interface CommunityPageProps {
  board: string;
}

export default function CommunityPage({ board }: CommunityPageProps) {
  const router = useRouter();
  const inputRef = useRef(null);
  const focusTab = board === "free" ? 1 : 0;
  const { userData } = useLogin();
  const [searchName, setSearchName] = useState<string | null>("");
  const focusBoard = categories[focusTab].title as TFocusBoard;
  const { postData, fetchNextPage, hasNextPage, status, isFetchingNextPage } =
    usePostInfinitiQuery({
      focusBoard,
      searchName,
    });

  const moreRef = useIntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        loadMore();
      }
    },
    { threshold: 1 },
  );

  const loadMore = () => {
    if (!hasNextPage) return;
    fetchNextPage();
  };
  const handleClickNewPost = async () => {
    if (!userData) {
      router.push("/auth/login");
      return;
    } else {
      router.push(
        `/community/${focusBoard === "Stories" ? "travel" : "free"}/newpost`,
      );
    }
    // router.push("/recommend-trip/setup");
  };
  const handleSearchSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputRef.current) {
      setSearchName(inputRef.current.value);
      inputRef.current.value = "";
    }
  };

  const handleSearchReset = () => {
    setSearchName("");
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    fetchNextPage();
  };

  return (
    <PageContainer>
      <CategoryTabs
        categories={categories}
        focusTab={focusTab}
        setFocusTab={(id) => {
          const path = categories[id as number].path;
          router.push(`/community/${path}`);
        }}
      />
      <div className="grid grid-cols-1 lg:grid-cols-[7fr_3fr] mt-5 scroll-none">
        {/* 글 목록 보여줄 곳 */}
        <div className="relative lg:pr-12 flex flex-col gap-5 py-8">
          {/* 글 쓰는 페이지 이동 */}
          <button
            className="flex items-center justify-between w-full gap-5 px-5 py-3 shadow-lg rounded-xl"
            onClick={handleClickNewPost}
          >
            {/* <Image
              src={userData?.profileImg}
              alt="hi"
              sizes="10px"
              width={40}
              height={40}
              className="rounded-full border-[1px] border-transparent w-10 h-10"
            /> */}
            <span className="text-left break-all flex-grow overflow-hidden text-base lg:text-lg text-gray-500">
              {focusBoard === "Stories"
                ? "나의 여행을 공유해보세요!"
                : "여행 질문,정보를 공유해보세요!"}
            </span>
            <PiNotePencil className="text-2xl text-gray-500" />
          </button>
          {/* post 보여주는 곳 */}
          <div className="overflow-scroll scroll-none">
            {postData?.map(
              ({
                id,
                author,
                commentCount,
                created_at,
                like,
                profileImg,
                title,
                travelRoute_id,
                views,
                contents,
                isLiked,
              }: ICommunityTravelPostProps | ICommunityFreePostProps) =>
                travelRoute_id ? (
                  <CommunityTravelPost
                    key={id}
                    id={id}
                    author={author}
                    commentCount={commentCount}
                    created_at={created_at}
                    like={like}
                    profileImg={profileImg}
                    title={title}
                    travelRoute_id={travelRoute_id}
                    views={views}
                    contents={contents}
                    isLiked={isLiked}
                  />
                ) : (
                  <CommunityFreePost
                    key={id}
                    id={id}
                    author={author}
                    commentCount={commentCount}
                    created_at={created_at}
                    like={like}
                    profileImg={profileImg}
                    title={title}
                    views={views}
                    contents={contents}
                    isLiked={isLiked}
                  />
                ),
            )}

            {(status === "pending" || isFetchingNextPage) && (
              <>
                {focusBoard === "Stories" ? (
                  <CommunityTravelPostSkeletons />
                ) : (
                  <CommunityFreePostSkeletons />
                )}
              </>
            )}
            <div ref={moreRef}></div>
          </div>
        </div>

        {/* 인기글 목록 보여줄 곳 */}
        <div className="hidden lg:flex flex-col gap-2 h-full relative pl-12 border-l-[1px] border-gray-300 mb-5">
          {/* 게시글 검색 */}
          <form className="w-full h-32" onSubmit={handleSearchSubmit}>
            <h2 className="font-bold text-xl py-5 flex items-center gap-2">
              검색
              <button type="button" onClick={handleSearchReset}>
                <GrPowerReset className="text-lg" />
              </button>
            </h2>
            <div className="flex items-center border-[1px] border-primary rounded-lg overflow-hidden w-full">
              <input
                type="text"
                ref={inputRef}
                placeholder="제목, 해시태그를 검색하세요"
                className="outline-none text-xs p-2 flex-grow"
              />
              <div className="flex items-center border-l-[1px] border-primary">
                <button
                  type="submit"
                  className="px-1 bg-primary text-white flex items-center py-1"
                >
                  <IoSearch className="text-2xl z-10" />
                </button>
              </div>
            </div>
          </form>
          <PopularPosts focusBoard={focusBoard} />
        </div>
      </div>
    </PageContainer>
  );
}
