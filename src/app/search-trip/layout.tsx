import SEO from "../seo/SEO";
import Header from "../ui/common/Header";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <SEO title="SEARCH TRIP" description="여행지 검색을 위한 페이지입니다." />
      <Header />
      {children}
    </>
  );
}
