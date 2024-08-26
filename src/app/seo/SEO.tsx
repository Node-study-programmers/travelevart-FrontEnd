interface SEOProps {
  title?: string;
  description?: string;
}

export default function SEO({ title, description }: SEOProps) {
  const TITLE = title ? `${title} | Travelevart` : "Travelevart";
  const DESCRIPTION = description || "여행지 추천 서비스";

  return (
    <head>
      <title>{TITLE}</title>
      <meta name="description" content={DESCRIPTION} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={TITLE} />
      <meta property="og:description" content={DESCRIPTION} />
      {/* url */}
      <meta property="og:url" content="" />
      <meta property="og:locale" content="ko_KR" />
      {/* image */}
      <meta property="og:image" content="" />
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/favicon.ico" />
    </head>
  );
}
