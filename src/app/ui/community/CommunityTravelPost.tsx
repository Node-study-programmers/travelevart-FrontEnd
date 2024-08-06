import Image from "next/image";

export interface PostContent {
  id: number;
  postId: number;
  order: number;
  text: string;
  image: string;
}

export interface ICommunityTravelPostProps {
  id: number;
  author: string;
  commentCount: number;
  created_at: string;
  like: number;
  profileImg: string;
  title: string;
  travelRoute_id?: number;
  views: number;
  contents: PostContent[];
}

export default function CommunityTravelPost({
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
}: ICommunityTravelPostProps) {
  const formattedDate = new Date(created_at).toLocaleString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="p-6 rounded-xl h-auto w-full">
      <div className="flex items-center w-full">
        <Image
          src={profileImg}
          alt="profile"
          width={40}
          loading="lazy"
          height={40}
          className="rounded-full border-[1px] border-transparent w-10 h-10"
        />
        <div className="ml-4">
          <div className="text-sm text-gray-500">
            {author}
            <span className="ml-2 text-xs text-gray-400">{formattedDate}</span>
          </div>
          <div className="text-xl font-bold text-gray-800">{title}</div>
          <div className="text-left text-base">
            {/* {contents.map(({ id, text, image }: PostContent) => (
              <div key={id} className="my-4">
                <p>{text}</p>
                {image && (
                  <div className="my-2">
                    <Image
                      src={image}
                      alt={`image-${id}`}
                      width={600}
                      height={400}
                      className="rounded-lg"
                      objectFit="cover"
                    />
                  </div>
                )}
              </div>
            ))} */}
          </div>
        </div>
      </div>
    </div>
  );
}
