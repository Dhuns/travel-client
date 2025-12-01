/**
 * Tour Configuration
 * Bokun Experience ID만 관리하는 설정 파일
 * 실제 투어 데이터는 Bokun API에서 가져옵니다
 */

export interface TourConfig {
  bokunExperienceId: string;
  category: string;
  badge: string;
}

// History Tours
export const historyToursConfig: TourConfig[] = [
  {
    bokunExperienceId: "1110358",
    category: "history",
    badge: "Day Trip",
  },
  {
    bokunExperienceId: "1110371",
    category: "history",
    badge: "Cultural Tour",
  },
  {
    bokunExperienceId: "1110386",
    category: "history",
    badge: "Cultural Tour",
  },
];

// Private Tours
export const privateToursConfig: TourConfig[] = [
  {
    bokunExperienceId: "1110398",
    category: "private",
    badge: "Dedicated Guide",
  },
  {
    bokunExperienceId: "1110407",
    category: "private",
    badge: "Dedicated Guide",
  },
  {
    bokunExperienceId: "1110407",
    category: "private",
    badge: "Dedicated Guide",
  },
];

// Multiday Tours
export const multidayToursConfig: TourConfig[] = [
  {
    bokunExperienceId: "1110411",
    category: "multiday",
    badge: "7 Days / 6 Nights",
  },
];

// Bokun Configuration (Public - safe to expose)
export const BOKUN_CONFIG = {
  bookingChannelUUID: process.env.NEXT_PUBLIC_BOKUN_BOOKING_CHANNEL_UUID || "0a1af831-37c4-40d2-8aa7-2a8b7b985ea2",
};
