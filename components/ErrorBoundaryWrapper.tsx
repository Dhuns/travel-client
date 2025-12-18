"use client";

import { usePathname } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import ErrorBoundary from "./ErrorBoundary";

interface ErrorBoundaryWrapperProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export default function ErrorBoundaryWrapper({
  children,
  fallback,
}: ErrorBoundaryWrapperProps) {
  const pathname = usePathname();
  const [key, setKey] = useState(0);

  // pathname이 변경될 때마다 ErrorBoundary를 리마운트
  useEffect(() => {
    setKey((prev) => prev + 1);
  }, [pathname]);

  return (
    <ErrorBoundary key={key} fallback={fallback}>
      {children}
    </ErrorBoundary>
  );
}
