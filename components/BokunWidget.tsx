"use client";

import { useEffect, useRef } from "react";

interface BokunWidgetProps {
  bookingChannelUUID: string;
  experienceId?: string;
  className?: string;
}

export default function BokunWidget({
  bookingChannelUUID,
  experienceId,
  className = "",
}: BokunWidgetProps) {
  const widgetRef = useRef<HTMLDivElement>(null);
  const scriptLoadedRef = useRef(false);

  useEffect(() => {
    // 스크립트가 이미 로드되었는지 확인
    const existingScript = document.querySelector(
      `script[src*="BokunWidgetsLoader.js"]`
    );

    if (!existingScript && !scriptLoadedRef.current) {
      // Bokun 위젯 스크립트 로드
      const script = document.createElement("script");
      script.src = `https://widgets.bokun.io/assets/javascripts/apps/build/BokunWidgetsLoader.js?bookingChannelUUID=${bookingChannelUUID}`;
      script.async = true;
      script.type = "text/javascript";

      script.onload = () => {
        console.log("Bokun widget script loaded successfully");
        scriptLoadedRef.current = true;
      };

      script.onerror = () => {
        console.error("Failed to load Bokun widget script");
      };

      document.body.appendChild(script);

      return () => {
        // 컴포넌트 언마운트 시 스크립트 제거
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
        scriptLoadedRef.current = false;
      };
    }
  }, [bookingChannelUUID]);

  // 위젯 데이터 소스 URL 생성
  const widgetDataSrc = experienceId
    ? `https://widgets.bokun.io/online-sales/${bookingChannelUUID}/experience/${experienceId}`
    : `https://widgets.bokun.io/online-sales/${bookingChannelUUID}`;

  return (
    <div className={className}>
      <div
        ref={widgetRef}
        className="bokunWidget"
        data-src={widgetDataSrc}
      />
      <noscript>
        <p className="text-center text-gray-600 p-4">
          Please enable JavaScript in your browser to book
        </p>
      </noscript>
    </div>
  );
}
