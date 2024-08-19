import PageContainer from "@/app/ui/common/PageContainer";
import WriteFreePost from "@/app/ui/community/WriteFreePost";
import WriteTravelPost from "@/app/ui/community/WriteTravelPost";

interface Params {
  board: string;
}

export default function NewPostPage({ params }: { params: Params }) {
  const { board } = params;
  return (
    <PageContainer>
      {board === "travel" ? <WriteTravelPost /> : <WriteFreePost />}
    </PageContainer>
  );
}
