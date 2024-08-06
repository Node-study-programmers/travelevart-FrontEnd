import usePopularPost from "@/app/hooks/community/usePopularPost";
import CommunityPopularPost, {
  ICommunityPopularPostProps,
} from "./CommunityPopularPost";
import { TFocusBoard } from "@/lib/types";
import { PopularPostsSkeleton } from "./skeleton/CommunityPostSkeleton";

interface PopularPostsProps {
  focusBoard: TFocusBoard;
  handleNavigateToList?: () => void;
}

export default function PopularPosts({
  focusBoard,
  handleNavigateToList,
}: PopularPostsProps) {
  const { data: popularPostData = [], isLoading: isPopularPostLoading } =
    usePopularPost({ focusBoard });

  return (
    <div className="sticky w-full top-20">
      <h2 className="font-bold text-xl py-3">주간 인기 게시물</h2>
      {isPopularPostLoading ? (
        <PopularPostsSkeleton />
      ) : (
        <>
          {popularPostData.length > 0 ? (
            popularPostData.map(
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
                  focusBoard={focusBoard}
                  index={index + 1}
                  key={id}
                  id={id}
                  author={author}
                  title={title}
                  profileImg={profileImg}
                  contents={contents}
                />
              ),
            )
          ) : (
            <p>인기 게시물이 없습니다.</p>
          )}
        </>
      )}
      {handleNavigateToList && (
        <button
          onClick={handleNavigateToList}
          className="mt-4 text-primary rounded-lg px-4 py-2 hover:bg-secondary w-full"
        >
          목록으로
        </button>
      )}
    </div>
  );
}
