import "./globals.css";

import ErrorBoundary from "@/components/ErrorBoundary";
import { ThemeProvider } from "@/components/theme-provider";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import Script from "next/script";
import type React from "react";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "tumakr by OnedayKorea - Korean Tours & Experiences",
  description:
    "Discover Korea with local experts. Premium tours, cultural experiences, and authentic Korean products for international travelers.",
  icons: {
    icon: "/tumakr-logo(no-text).png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${GeistSans.variable} ${GeistMono.variable} h-full`}
    >
      <head>
        {/* Bokun 위젯 프리로드 - 로딩 속도 개선 */}
        <link rel="preconnect" href="https://widgets.bokun.io" />
        <link rel="dns-prefetch" href="https://widgets.bokun.io" />
        <link rel="preconnect" href="https://api.bokun.io" />
        <link rel="dns-prefetch" href="https://api.bokun.io" />

        {/* Google Tag Manager */}
        <Script id="gtm-script" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-TVQSRRWC');
          `}
        </Script>
      </head>
      <body className="h-full m-0 p-0 flex flex-col font-sans">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-TVQSRRWC"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

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
          <div className="flex flex-col min-h-screen flex-1">
            <main className="w-full flex-1">
              <ErrorBoundary>
                <Suspense
                  fallback={
                    <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center">
                      Loading...
                    </div>
                  }
                >
                  <div className="min-h-[calc(100vh-5rem)]">{children}</div>
                </Suspense>
              </ErrorBoundary>
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
