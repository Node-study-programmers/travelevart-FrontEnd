import type { Metadata } from "next";
import "./globals.css";
import SessionWrapper from "@/util/SessionWrapper";
import Navbar from "./ui/common/Navbar";
import Footer from "./ui/common/Footer";
import StoreProvider from "./StoreProvider";
import AuthSession from "./auth/AuthSession";
import QueryProvider from "./QueryProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import getCurrentUser from "@/util/getCurrentUser";

export const metadata: Metadata = {
  title: "Travelevart",
  description: "여행지 추천 서비스",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryProvider>
      <SessionWrapper>
        {/* <AuthSession> */}
        <html lang="en">
          <body className="font-noto">
            <ToastContainer
              position="top-center"
              closeOnClick
              autoClose={3000}
            />
            <StoreProvider>
              <Navbar />
              {children}
              <Footer />
            </StoreProvider>
          </body>
        </html>
        {/* </AuthSession> */}
      </SessionWrapper>
    </QueryProvider>
  );
}
