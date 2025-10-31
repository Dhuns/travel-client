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
        </ThemeProvider>

        <Analytics />
      </body>
    </html>
  );
}
