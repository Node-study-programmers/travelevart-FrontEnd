import localFont from "next/font/local";

export const noto = localFont({
  src: "./NotoSansKR-VariableFont_wght.woff",
  display: "swap",
  weight: "400",
  preload: false,
  variable: "--noto-weight",
});

export const logoFont = localFont({
  src: "./ProtestStrike-Regular.woff",
  display: "swap",
  preload: false,
  variable: "--logo-font",
});
