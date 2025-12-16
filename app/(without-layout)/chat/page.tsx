"use client";

import dynamic from "next/dynamic";

// Container lives in src/containers/chat/Container.tsx
const Container = dynamic(() => import("@/src/containers/chat/Container"), {
  ssr: false,
});

export default function ChatPage() {
  return (
    <div className="fixed inset-0 bg-white flex flex-col">
      <Container />
    </div>
  );
}
