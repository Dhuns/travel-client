"use client";

import dynamic from "next/dynamic";

// Loading component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen bg-white">
    <div className="flex flex-col items-center gap-4">
      <div className="w-16 h-16 border-4 border-gray-200 border-t-[#651d2a] rounded-full animate-spin" />
      <p className="text-gray-600">Loading chat...</p>
    </div>
  </div>
);

// Container lives in src/containers/chat/Container.tsx
const Container = dynamic(() => import("@/src/containers/chat/Container"), {
  ssr: false,
  loading: () => <LoadingSpinner />,
});

export default function ChatPage() {
  return (
    <div className="fixed inset-0 bg-white flex flex-col">
      <Container />
    </div>
  );
}
