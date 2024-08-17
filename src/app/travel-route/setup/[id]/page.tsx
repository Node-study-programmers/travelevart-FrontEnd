import TravelRouteSetUpForm from "@/app/ui/common/travelRoute/TravelRouteSetUpForm";

interface Props {
  params: {
    id: string;
  };
}

export default function TravelRouteSetupPage({ params }: Props) {
  return <TravelRouteSetUpForm routeId={params.id} />;
}
