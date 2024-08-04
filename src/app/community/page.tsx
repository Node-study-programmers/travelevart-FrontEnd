"use client";
import Image from "next/image";
import dummyimg from "../asset/img/mainBackground.jpg";
import { PiNotePencil } from "react-icons/pi";
import CategoryTabs from "../ui/common/CategoryTabs";
import { FormEvent, useEffect, useRef, useState } from "react";
import usePostInfinitiQuery from "../hooks/community/usePostsInfinitiQuery";
import useIntersectionObserver from "../hooks/useIntersectionObserver";
import { TFocusBoard } from "@/lib/types";
import CommunityPopularPost, {
  ICommunityPopularPostProps,
} from "../ui/community/CommunityPopularPost";
import { IoSearch } from "react-icons/io5";
import CommunityTravelPost, {
  ICommunityTravelPostProps,
} from "../ui/community/CommunityTravelPost";
import CommunityFreePost from "../ui/community/CommunityFreePost";
import { GrPowerReset } from "react-icons/gr";
import {
  CommunityFreePostSkeletons,
  CommunityTravelPostSkeletons,
} from "../ui/community/skeleton/CommunityPostSkeleton";
import usePopularPost from "../hooks/community/usePopularPost";

const categories = [
  { id: 0, title: "여행게시판" },
  { id: 1, title: "자유게시판" },
];

export default function CommunityPage() {
  const inputRef = useRef(null);
  const [focusTab, setFocusTab] = useState<number>(0);
  const [searchName, setSearchName] = useState<string | null>("");
  const focusBoard = categories[focusTab].title as TFocusBoard;
  const { data: popularPostData, isLoading: isPopularPostLoading } =
    usePopularPost({ focusBoard });
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

  // 검색하고 나서 탭 바꿨을 때 검색 결과 안 나오는 오류
  useEffect(() => {
    handleSearchReset();
  }, [focusTab]);

  return (
    <div className="max-w-screen-lg h-auto w-auto relative py-[8px] px-[16px] mx-auto">
      <CategoryTabs
        categories={categories}
        focusTab={focusTab}
        setFocusTab={setFocusTab}
      />
      <div className="grid grid-cols-1 lg:grid-cols-[7fr_3fr] mt-5 scroll-none">
        {/* 글 목록 보여줄 곳 */}
        <div className="relative lg:pr-12 flex flex-col gap-5 py-8">
          {/* 글 쓰는 페이지 이동 */}
          <button className="flex items-center justify-between w-full gap-5 px-5 py-3 shadow-xl rounded-xl">
            <Image
              src={dummyimg}
              alt="hi"
              width={40}
              height={40}
              className="rounded-full border-[1px] border-transparent w-10 h-10"
            />
            <span className="text-left break-all flex-grow overflow-hidden text-lg text-gray-500">
              {focusBoard === "여행게시판"
                ? "나의 여행을 공유해보세요!"
                : "여행 질문 및 정보를 공유해보세요!"}
            </span>
            <PiNotePencil className="text-2xl text-gray-500" />
          </button>
          {/* post 보여주는 곳 */}
          <div className="overflow-scroll">
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
              }: ICommunityTravelPostProps) =>
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
                  />
                ),
            )}
            {(status === "pending" || isFetchingNextPage) && (
              <>
                {focusBoard === "여행게시판" ? (
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
            <div className="flex items-center border-[1px] border-gray-500 rounded-lg overflow-hidden w-full">
              <input
                type="text"
                ref={inputRef}
                placeholder="제목, 해시태그를 검색하세요"
                className="outline-none text-xs p-2 flex-grow"
              />
              <div className="flex items-center border-l-[1px] border-gray-500">
                <button
                  type="submit"
                  className="px-1 bg-gray-800 text-white flex items-center py-1"
                >
                  <IoSearch className="text-2xl z-10" />
                </button>
              </div>
            </div>
          </form>
          <div className="sticky w-full top-20">
            <h2 className="font-bold text-xl py-3">주간 인기 게시물</h2>
            {isPopularPostLoading ? (
              <div>loading...</div>
            ) : (
              <>
                {popularPostData?.map(
                  (
                    {
                      id,
                      author,
                      title,
                      profileImg,
                      contents,
                    }: ICommunityPopularPostProps,
                    index: number,
                  ) => (
                    <CommunityPopularPost
                      index={index + 1}
                      key={id}
                      id={id}
                      author={author}
                      title={title}
                      profileImg={profileImg}
                      contents={contents}
                    />
                  ),
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
