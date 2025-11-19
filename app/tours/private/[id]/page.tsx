"use client";

import BokunWidget from "@/components/BokunWidget";
import Link from "next/link";
import { useParams } from "next/navigation";
import { privateToursConfig, BOKUN_CONFIG } from "@/config/tours";

export default function PrivateTourDetailPage() {
  const params = useParams();
  const experienceId = params.id as string; // URL의 id가 이제 bokunExperienceId

  // 설정에 해당 experienceId가 있는지 확인
  const tourExists = privateToursConfig.some(
    (t) => t.bokunExperienceId === experienceId
  );

  // Experience ID가 설정에 없는 경우 에러 처리
  if (!tourExists) {
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
            href="/tours/private"
            className="inline-flex items-center px-6 py-3 bg-[#651d2a] text-white rounded-lg hover:bg-[#4a1520] transition-colors"
          >
            Back to Private Tours
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
