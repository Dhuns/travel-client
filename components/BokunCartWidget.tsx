"use client";

import { useEffect, useRef, useState } from "react";
import { Loader2, ShoppingCart } from "lucide-react";

interface BokunCartWidgetProps {
  bookingChannelUUID: string;
  className?: string;
  /** 장바구니 아이콘만 표시 (헤더용) */
  iconOnly?: boolean;
  /** 전체 장바구니 페이지 URL (체크아웃 페이지) */
  cartPageUrl?: string;
}

/**
 * Bokun 장바구니 위젯 컴포넌트
 */
export default function BokunCartWidget({
  bookingChannelUUID,
  className = "",
  iconOnly = false,
}: BokunCartWidgetProps) {
  const widgetRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  // 클라이언트에서만 마운트 상태 설정 (hydration 오류 방지)
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || !widgetRef.current) return;

    const observer = new MutationObserver(() => {
      if (widgetRef.current && widgetRef.current.children.length > 0) {
        const hasContent = widgetRef.current.querySelector('iframe') ||
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

  // 장바구니 아이콘 위젯 (헤더용)
  if (iconOnly) {
    return (
      <div className={className}>
        <div
          ref={widgetRef}
          className="bokunWidget"
          data-src={`https://widgets.bokun.io/online-sales/${bookingChannelUUID}/shopping-cart`}
        />
      </div>
    );
  }

  // 전체 장바구니 페이지 위젯
  return (
    <div className={`relative ${className}`}>
      {/* 로딩 스켈레톤 - 클라이언트에서만 렌더링 */}
      {isMounted && isLoading && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-gray-50 rounded-lg min-h-[400px]">
          <div className="relative mb-4">
            <ShoppingCart className="w-12 h-12 text-gray-300" />
            <Loader2 className="w-6 h-6 text-[#651d2a] animate-spin absolute -bottom-1 -right-1" />
          </div>
          <p className="text-gray-600 text-sm">Loading cart...</p>
          <div className="mt-6 w-full max-w-md px-8">
            <div className="space-y-4">
              <div className="h-20 bg-gray-200 rounded animate-pulse" />
              <div className="h-20 bg-gray-200 rounded animate-pulse" />
              <div className="h-1 bg-gray-300 rounded" />
              <div className="flex justify-between">
                <div className="h-6 w-20 bg-gray-200 rounded animate-pulse" />
                <div className="h-6 w-24 bg-gray-200 rounded animate-pulse" />
              </div>
              <div className="h-12 bg-[#651d2a]/20 rounded animate-pulse" />
            </div>
          </div>
        </div>
      )}

      <div
        ref={widgetRef}
        className="bokunWidget"
        data-src={`https://widgets.bokun.io/online-sales/${bookingChannelUUID}/checkout`}
      />
    </div>
  );
}
