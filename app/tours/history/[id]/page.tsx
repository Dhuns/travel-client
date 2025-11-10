"use client";

import BokunWidget from "@/components/BokunWidget";
import Link from "next/link";
import { useParams } from "next/navigation";
import { historyTours, BOKUN_CONFIG } from "@/data/mockTours";

export default function TourDetailPage() {
  const params = useParams();
  const tourId = params.id as string;

  // 투어 데이터 찾기
  const tour = historyTours.find((t) => t.id === tourId);
  const experienceId = tour?.bokunExperienceId;

  // Experience ID가 없는 경우 에러 처리
  if (!experienceId) {
    return (
      <div className="min-h-screen bg-white pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Tour not found
          </h1>
          <p className="text-gray-600 mb-6">
            The tour you're looking for doesn't exist.
          </p>
          <Link
            href="/tours/history"
            className="inline-flex items-center px-6 py-3 bg-[#651d2a] text-white rounded-lg hover:bg-[#4a1520] transition-colors"
          >
            Back to History Tours
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Bokun 위젯 - 전체 페이지 */}
      <div className="w-full">
        <BokunWidget
          bookingChannelUUID={BOKUN_CONFIG.bookingChannelUUID}
          experienceId={experienceId}
          className="w-full"
        />
      </div>
    </div>
  );
}
