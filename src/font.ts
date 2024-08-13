import { Noto_Sans, Protest_Strike } from "next/font/google";

export const noto = Noto_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const logoFont = Protest_Strike({
  weight: "400",
  subsets: ["latin"],
  preload: true,
});
