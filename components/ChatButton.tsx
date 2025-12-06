"use client";

import { MessageCircle } from "lucide-react";
import { usePathname } from "next/navigation";

export default function ChatButton() {
  const pathname = usePathname();

  // Hide on quotation pages
  if (pathname?.startsWith("/quotation")) {
    return null;
  }

  return (
    <a
      href="/chat"
      className="fixed bottom-8 left-8 z-50 h-16 w-16 rounded-full shadow-lg transition-transform duration-300 ease-in-out hover:scale-110 bg-sky-600 hover:bg-sky-700 text-white flex items-center justify-center"
      aria-label="Open chat page"
      style={{
        textDecoration: "none",
        border: "none",
        outline: "none",
        backgroundColor: "#d1293C",
      }}
    >
      <MessageCircle className="h-8 w-8" />
    </a>
  );
}
