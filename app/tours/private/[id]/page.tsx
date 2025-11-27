"use client";

import BokunWidget from "@/components/BokunWidget";
import { useParams } from "next/navigation";
import { BOKUN_CONFIG } from "@/config/tours";

export default function PrivateTourDetailPage() {
  const params = useParams();
  const experienceId = params.id as string;

  // Bokun 위젯이 자체적으로 유효하지 않은 ID 처리
  // 백엔드 DB에서 관리하는 모든 투어 ID를 허용
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
