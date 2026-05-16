import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "기호 인식 시스템",
  description: "손그림을 인식하여 코드로 변환",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}