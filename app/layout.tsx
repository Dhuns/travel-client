import "./globals.css";

import { Analytics } from "@vercel/analytics/next";
import Footer from "@/components/footer";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import Header from "@/components/header";
import type { Metadata } from "next";
import type React from "react";
import { Suspense } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import Script from "next/script";

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
        {/* Bokun 위젯 프리로드 - 로딩 속도 개선 */}
        <link rel="preconnect" href="https://widgets.bokun.io" />
        <link rel="dns-prefetch" href="https://widgets.bokun.io" />
        <link rel="preconnect" href="https://api.bokun.io" />
        <link rel="dns-prefetch" href="https://api.bokun.io" />

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
        {/* Bokun 위젯 스크립트 - Next.js Script 컴포넌트 사용 */}
        <Script
          src="https://widgets.bokun.io/assets/javascripts/apps/build/BokunWidgetsLoader.js?bookingChannelUUID=0a1af831-37c4-40d2-8aa7-2a8b7b985ea2"
          strategy="afterInteractive"
        />

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
        </ThemeProvider>

        <Analytics />
      </body>
    </html>
  );
}
