/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "elasticbeanstalk-ap-northeast-2-905418188515.s3.ap-northeast-2.amazonaws.com",
      "t1.kakaocdn.net",
      "example.com",
      "tong.visitkorea.or.kr",
      "cdn.pixabay.com",
    ],
  },
};

export default nextConfig;
