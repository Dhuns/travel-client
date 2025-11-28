"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * 푸터 컴포넌트 - 웹사이트 하단 정보 및 링크 섹션
 *
 * 주요 기능:
 * - 회사 정보 및 주요 서비스 링크
 * - 고객 지원 및 정책 페이지 링크
 * - 소셜 미디어 연결
 * - Facebook 및 TripAdvisor 위젯
 *
 * 백엔드 연동 가이드:
 * - 소셜 미디어 링크: 실제 SNS 계정 URL로 교체 필요
 * - 뉴스레터 구독: /api/newsletter 엔드포인트 구현
 * - 고객 지원: /api/contact 엔드포인트로 문의 처리
 * - 리뷰 데이터: TripAdvisor API 연동으로 실시간 리뷰 표시
 */
export default function Footer() {
  const pathname = usePathname();

  // Hide footer on quotation pages
  if (pathname?.startsWith("/quotation")) {
    return null;
  }
  return (
    <footer className="bg-[#272b38] text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* 첫 번째 컬럼 - OneDay Korea 회사 정보 */}
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg text-white mb-2">
                OnedayKorea
              </h3>
              <div className="w-12 h-0.5 bg-white mb-4"></div>
            </div>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors duration-300 text-sm"
                >
                  About us
                </a>
              </li>
              <li>
                <Link
                  href="/tours"
                  className="text-gray-300 hover:text-white transition-colors duration-300 text-sm"
                >
                  Tour Recommendation
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors duration-300 text-sm"
                >
                  Daily Tour
                </a>
              </li>
              <li>
                <Link
                  href="/tours"
                  className="text-gray-300 hover:text-white transition-colors duration-300 text-sm"
                >
                  Seasonal Tour
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors duration-300 text-sm"
                >
                  Theme Tour
                </a>
              </li>
            </ul>
          </div>

          {/* 두 번째 컬럼 - 고객 지원 및 도움말 */}
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg text-white mb-2">Help</h3>
              <div className="w-12 h-0.5 bg-white mb-4"></div>
            </div>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors duration-300 text-sm"
                >
                  Contact us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors duration-300 text-sm"
                >
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors duration-300 text-sm"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors duration-300 text-sm"
                >
                  Terms & Conditions
                </a>
              </li>
            </ul>
          </div>

          {/* 세 번째 컬럼 - 소셜 위젯 (Facebook + TripAdvisor) */}
          <div className="space-y-4">
            {/* Facebook 페이지 위젯 */}
            <div className="bg-white rounded-lg p-3">
              <div className="flex items-center space-x-2 mb-3">
                <div className="w-8 h-8 bg-[#651D2A] rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">K</span>
                </div>
                <div className="text-black">
                  <h4 className="font-semibold text-sm">
                    Korea Travel - OneDay Korea
                  </h4>
                  <p className="text-xs">302k followers</p>
                </div>
              </div>
              {/* TODO: 백엔드 연동 시 실제 Facebook 페이지 팔로우 기능 구현 */}
              <Button className="w-full bg-[#651D2A] hover:bg-white text-white text-sm py-2">
                Follow Page
              </Button>
            </div>

            {/* TripAdvisor 리뷰 위젯 */}
            <div className="bg-white rounded-lg p-3">
              <div className="text-center">
                <p className="text-gray-800 text-sm font-medium mb-2">
                  Read reviews of One Day Korea
                </p>
                <div className="flex justify-center items-center space-x-2">
                  <span className="text-[#651D2A] font-bold text-sm">
                    TripAdvisor
                  </span>
                  {/* TODO: 백엔드 연동 시 TripAdvisor API로 실제 평점 데이터 연동 */}
                  <div className="flex text-orange-600">
                    {"★★★★★".split("").map((star, i) => (
                      <span key={i} className="text-sm">
                        {star}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 저작권 정보 */}
        <div className="border-t border-gray-700 pt-6 text-center">
          <p className="text-gray-400 text-sm">
            © 2025 OneDay Korea. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
