import SEO from "@/app/seo/SEO";
import TravelRouteSetUpForm from "@/app/ui/common/travelRoute/TravelRouteSetUpForm";

export default function TravelRouteSetupPage() {
  return (
    <>
      <SEO title="CUSTOM" description="나의 여행을 직접 만들어 보세요." />
      <TravelRouteSetUpForm />
    </>
  );
}
