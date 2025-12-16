import type React from "react";

export default function WithoutHeaderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
