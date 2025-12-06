import { Suspense } from "react";

import HomePageClient from "@/components/home-page-client";
import { PopularDestinations } from "@/components/popular-destinations";
import { PopularDestinationsSkeleton } from "@/components/tour-cards-skeleton";

/**
 * OneDay Korea 메인 페이지 컴포넌트
 * 서버 컴포넌트로 Bokun API 데이터를 실시간으로 가져와 표시
 * Suspense를 사용하여 투어 데이터 로딩 중에도 페이지가 즉시 렌더링됨
 */
export default function HomePage() {
  return (
    <HomePageClient>
      <Suspense fallback={<PopularDestinationsSkeleton />}>
        <PopularDestinations />
      </Suspense>
    </HomePageClient>
  );
}
