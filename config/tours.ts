/**
 * Bokun Configuration
 * 투어 데이터는 백엔드 API에서 관리됩니다
 */

// Bokun Configuration (Public - safe to expose)
export const BOKUN_CONFIG = {
  bookingChannelUUID: process.env.NEXT_PUBLIC_BOKUN_BOOKING_CHANNEL_UUID || "0a1af831-37c4-40d2-8aa7-2a8b7b985ea2",
};
