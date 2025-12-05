"use client";

interface BokunWidgetProps {
  bookingChannelUUID: string;
  experienceId?: string;
  className?: string;
}

/**
 * Bokun 예약 위젯 컴포넌트
 */
export default function BokunWidget({
  bookingChannelUUID,
  experienceId,
  className = "",
}: BokunWidgetProps) {
  // 위젯 데이터 소스 URL 생성
  const widgetDataSrc = experienceId
    ? `https://widgets.bokun.io/online-sales/${bookingChannelUUID}/experience/${experienceId}`
    : `https://widgets.bokun.io/online-sales/${bookingChannelUUID}`;

  return (
    <div className={className}>
      {/* Bokun 위젯 */}
      <div className="bokunWidget" data-src={widgetDataSrc} />
      <noscript>
        <p className="text-center text-gray-600 p-4">
          Please enable JavaScript in your browser to book
        </p>
      </noscript>
    </div>
  );
}
