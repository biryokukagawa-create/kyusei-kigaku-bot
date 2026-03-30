import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "九星気学占い",
  description: "九星気学に基づいた、ポジティブ100%の占いチャット",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
