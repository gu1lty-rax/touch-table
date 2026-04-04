import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// ↓ ここで、さっき作ったメニューを読み込みます
import Navbar from "./components/navbar"; 

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "My Next.js App",
  description: "Menu added!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/* ↓ ここに Navbar を置くことで、全ページでメニューが表示されます */}
        <Navbar />

        {/* メインコンテンツ */}
        <main className="flex-grow">
          {children}
        </main>
      </body>
    </html>
  );
}