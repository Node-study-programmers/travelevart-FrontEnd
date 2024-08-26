import RecommendTripIntro from "../ui/common/recommendTrip/RecommendTripIntro";
import PageContainer from "../ui/common/PageContainer";
import SEO from "../seo/SEO";

export default function RecommendTripPage() {
  return (
    <>
      <SEO
        title="RECOMMEND TRIP"
        description="AI를 통한 여행지 추천을 받아보세요."
      />
      <PageContainer>
        <RecommendTripIntro />
      </PageContainer>
    </>
  );
}
