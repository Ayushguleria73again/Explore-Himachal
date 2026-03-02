import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "@/components/providers/theme-provider";
import { StarBackground } from "@/components/ui/star-background";

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
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <StarBackground />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
