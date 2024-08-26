import SEO from "@/app/seo/SEO";
import PageContainer from "@/app/ui/common/PageContainer";
import RecommendTripSetupForm from "@/app/ui/common/recommendTrip/RecommendTripSetupForm";

export default function RecommendTripSetUpPage() {
  return (
    <>
      <SEO
        title="RECOMMEND TRIP"
        description="AI를 통한 여행지 추천을 받아보세요."
      />
      <RecommendTripSetupForm />
    </>
  );
}
