import SEO from "../seo/SEO";
import MainVideo from "../ui/main/MainVideo";
import MockUp from "../ui/main/MockUp";

export default function Home() {
  return (
    <>
      <SEO />
      <main className="min-h-screen">
        <MainVideo />
        <MockUp />
      </main>
    </>
  );
}
