"use client";

import { Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface BokunWidgetProps {
  bookingChannelUUID: string;
  experienceId?: string;
  className?: string;
}

/**
 * Bokun 예약 위젯 컴포넌트
 */
export default function BokunWidget({
  bookingChannelUUID,
  experienceId,
  className = "",
}: BokunWidgetProps) {
  const widgetRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  // 위젯 데이터 소스 URL 생성
  const widgetDataSrc = experienceId
    ? `https://widgets.bokun.io/online-sales/${bookingChannelUUID}/experience/${experienceId}`
    : `https://widgets.bokun.io/online-sales/${bookingChannelUUID}`;

  // 클라이언트에서만 마운트 상태 설정 (hydration 오류 방지)
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || !widgetRef.current) return;

    const observer = new MutationObserver(() => {
      if (widgetRef.current && widgetRef.current.children.length > 0) {
        const hasContent =
          widgetRef.current.querySelector("iframe") ||
          widgetRef.current.querySelector('[class*="bokun"]') ||
          widgetRef.current.innerHTML.length > 100;
        if (hasContent) {
          setIsLoading(false);
          observer.disconnect();
        }
      }
    });

    observer.observe(widgetRef.current, {
      childList: true,
      subtree: true,
      attributes: true,
    });

    const timeout = setTimeout(() => {
      setIsLoading(false);
      observer.disconnect();
    }, 10000);

    return () => {
      observer.disconnect();
      clearTimeout(timeout);
    };
  }, [isMounted]);

  return (
    <div className={`relative ${className}`}>
      {/* 로딩 스켈레톤 - 클라이언트에서만 렌더링 */}
      {isMounted && isLoading && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-gray-50 rounded-lg min-h-[400px]">
          <Loader2 className="w-10 h-10 text-tumakr-maroon animate-spin mb-4" />
          <p className="text-gray-600 text-sm">Loading booking widget...</p>
          <div className="mt-6 w-full max-w-md px-8">
            <div className="space-y-4">
              <div className="h-8 bg-gray-200 rounded animate-pulse" />
              <div className="h-32 bg-gray-200 rounded animate-pulse" />
              <div className="h-12 bg-gray-200 rounded animate-pulse" />
              <div className="grid grid-cols-2 gap-4">
                <div className="h-10 bg-gray-200 rounded animate-pulse" />
                <div className="h-10 bg-gray-200 rounded animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bokun 위젯 */}
      <div ref={widgetRef} className="bokunWidget" data-src={widgetDataSrc} />
      <noscript>
        <p className="text-center text-gray-600 p-4">
          Please enable JavaScript in your browser to book
        </p>
      </noscript>
    </div>
  );
}
