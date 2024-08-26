import SEO from "@/app/seo/SEO";
import PageContainer from "@/app/ui/common/PageContainer";
import RecommendTripSchedule from "@/app/ui/common/recommendTrip/RecommendTripSchedule";

export default function RecommendTripSchedulePage() {
  return (
    <>
      <SEO
        title="RECOMMEND TRIP"
        description="AI를 통한 여행지 추천을 받아보세요."
      />
      <PageContainer>
        <RecommendTripSchedule />
      </PageContainer>
    </>
  );
}
