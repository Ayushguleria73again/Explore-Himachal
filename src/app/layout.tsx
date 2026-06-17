import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ChatWidget } from "@/components/features/chat/chat-widget";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Explore Himachal - Land of the Gods",
  description: "Discover the beauty of Himachal Pradesh, its districts, and breathtaking tourist destinations. Minimalist guide.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans`}>
        {children}
        <ChatWidget />
      </body>
    </html>
  );
}
