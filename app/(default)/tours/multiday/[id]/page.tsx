"use client";

import BokunWidget from "@/components/BokunWidget";
import { useParams } from "next/navigation";
import { BOKUN_CONFIG } from "@/config/tours";

export default function TourDetailPage() {
  const params = useParams();
  const experienceId = params.id as string;

  return (
    <div className="min-h-screen bg-white pt-20">
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
