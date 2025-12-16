import Footer from "@/components/footer";
import Header from "@/components/header";
import type React from "react";

export default function WithFooterLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen pt-20">
      <Header />
      {children}
      <Footer />
    </div>
  );
}
