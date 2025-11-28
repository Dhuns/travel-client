"use client";

import { useEffect } from "react";
import { BOKUN_CONFIG } from "@/config/tours";

/**
 * Bokun 위젯 스크립트 로더
 *
 * 이 컴포넌트는 Bokun 위젯 스크립트를 전역으로 한 번만 로드합니다.
 * 레이아웃에 한 번만 포함하면 모든 페이지에서 Bokun 위젯을 사용할 수 있습니다.
 *
 * 주요 기능:
 * - 위젯 스크립트 한 번만 로드
 * - 장바구니 상태가 페이지 간 유지됨
 * - 모든 bokunWidget 클래스가 자동으로 초기화됨
 */
export default function BokunWidgetScript() {
  useEffect(() => {
    const scriptId = "bokun-widget-script";
    const existingScript = document.getElementById(scriptId);

    if (!existingScript) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = `https://widgets.bokun.io/assets/javascripts/apps/build/BokunWidgetsLoader.js?bookingChannelUUID=${BOKUN_CONFIG.bookingChannelUUID}`;
      script.async = true;
      script.type = "text/javascript";

      script.onload = () => {
        console.log("Bokun widget script loaded globally");
      };

      script.onerror = () => {
        console.error("Failed to load Bokun widget script");
      };

      document.head.appendChild(script);
    }

    // 스크립트는 전역으로 유지되므로 cleanup에서 제거하지 않음
  }, []);

  return null;
}
