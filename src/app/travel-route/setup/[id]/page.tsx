import SEO from "@/app/seo/SEO";
import TravelRouteSetUpForm from "@/app/ui/common/travelRoute/TravelRouteSetUpForm";

interface Props {
  params: {
    id: string;
  };
}

export default function TravelRouteSetupPage({ params }: Props) {
  return (
    <>
      <SEO title="CUSTOM" description="나의 여행을 직접 만들어 보세요." />
      <TravelRouteSetUpForm routeId={params.id} />
    </>
  );
}
