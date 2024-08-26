/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,

  images: {
    domains: [
      "elasticbeanstalk-ap-northeast-2-905418188515.s3.ap-northeast-2.amazonaws.com",
      "t1.kakaocdn.net",
      "k.kakaocdn.net",
      "example.com",
      "tong.visitkorea.or.kr",
      "cdn.pixabay.com",
      "cdn.visitkorea.or.kr",
      "image.xn--ok0b236bp0a.com",
      "www.iusm.co.kr",
      "lh3.googleusercontent.com",
      "encrypted-tbn0.gstatic.com",
      "img1.kakaocdn.net",
      "source.unsplash.com",
    ],
  },
};

export default nextConfig;
