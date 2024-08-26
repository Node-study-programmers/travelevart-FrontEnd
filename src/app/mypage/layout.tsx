import SEO from "../seo/SEO";
import Header from "../ui/common/Header";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
