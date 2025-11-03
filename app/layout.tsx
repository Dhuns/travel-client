import "./globals.css";

import { Analytics } from "@vercel/analytics/next";
import Footer from "@/components/footer";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import Header from "@/components/header";
import { MessageCircle } from "lucide-react";
import type { Metadata } from "next";
import type React from "react";
import { Suspense } from "react";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "OneDay Korea - Authentic Korean Tours & Experiences",
  description:
    "Discover Korea with local experts. Premium tours, cultural experiences, and authentic Korean products for international travelers.",
  generator: "v0.app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <style
          dangerouslySetInnerHTML={{
            __html: `
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}`,
          }}
        />
      </head>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main className="pt-8">
            <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
          </main>
          <Footer />
          {/* 플로팅 챗봇 버튼 (모든 페이지에 표시) */}
          <a
            href="/chat"
            className="fixed bottom-8 right-8 z-50 h-16 w-16 rounded-full shadow-lg transition-transform duration-300 ease-in-out hover:scale-110 bg-sky-600 hover:bg-sky-700 text-white flex items-center justify-center"
            aria-label="Open chat page"
          >
            <MessageCircle className="h-8 w-8" />
          </a>
        </ThemeProvider>

        <Analytics />
      </body>
    </html>
  );
}
