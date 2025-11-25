import {
  historyToursConfig,
  multidayToursConfig,
  privateToursConfig,
} from "@/config/tours";

import HomePageClient from "@/components/home-page-client";
import { getToursFromConfig } from "@/lib/bokun";

export const revalidate = 3600; // 1시간마다 재생성

/**
 * OneDay Korea 메인 페이지 컴포넌트
 * 서버 컴포넌트로 Bokun API 데이터를 실시간으로 가져와 표시
 */
export default async function HomePage() {
  // Bokun API에서 모든 투어 데이터 가져오기
  const allConfigs = [
    ...historyToursConfig,
    ...privateToursConfig,
    ...multidayToursConfig,
  ];
  const allTours = await getToursFromConfig(allConfigs);

  // 인기 여행지 (상위 4개)
  const popularDestinations = allTours.slice(0, 4);

  // 추천 투어 패키지 (3개 - 카테고리별로 선택)
  const recommendedTours = [
    allTours.find((t) => t.category === "history"),
    allTours.find((t) => t.category === "private"),
    allTours.find((t) => t.category === "multiday"),
  ].filter(Boolean);

  return (
    <HomePageClient
      popularDestinations={popularDestinations}
      recommendedTours={recommendedTours as typeof popularDestinations}
    />
  );
}
