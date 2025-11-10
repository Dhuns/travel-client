// 투어 타입 정의
export interface Tour {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  badge: string;
  description: string;
  highlights: string[];
  image: string;
  bokunExperienceId: string;
  // 추가 정보
  categories?: string[];
  location?: string;
  included?: string[];
  exclusions?: string[];
  duration?: string;
  durationText?: string;
  price?: string;
  activityCategories?: string[];
  knowBeforeYouGo?: string[];
  minAge?: number;
  cancellationPolicy?: string;
}

// mock history tour 데이터 - API 호출용 최소 정보만 포함
export const historyTours: Tour[] = [
  {
    id: "1",
    category: "history",
    badge: "Day Trip",
    image: "/images/design-mode/castle2.png",
    bokunExperienceId: "1110358",
  },
  {
    id: "2",
    category: "history",
    badge: "Cultural Tour",
    image: "/images/design-mode/castle1.png",
    bokunExperienceId: "1110371",
  },
  {
    id: "3",
    category: "history",
    badge: "Cultural Tour",
    image: "/images/design-mode/castle3.png",
    bokunExperienceId: "1110386",
  },
] as Tour[];

// mock private tour 데이터 - API 호출용 최소 정보만 포함
export const privateTours: Tour[] = [
  {
    id: "1",
    category: "private",
    badge: "Dedicated Guide",
    image: "/seoul-royal-palace-gyeongbokgung.jpg",
    bokunExperienceId: "1110398",
  },
  {
    id: "2",
    category: "private",
    badge: "Dedicated Guide",
    image: "/jeju-island-traditional-architecture.jpg",
    bokunExperienceId: "1110407",
  },
  {
    id: "3",
    category: "private",
    badge: "Dedicated Guide",
    image: "/busan-coastal-scenery-haeundae.jpg",
    bokunExperienceId: "1110407",
  },
] as Tour[];

// mock multiday tour 데이터 - API 호출용 최소 정보만 포함
export const multidayTours: Tour[] = [
  {
    id: "1",
    category: "multiday",
    badge: "7 Days / 6 Nights",
    image: "/images/design-mode/castle2.png",
    bokunExperienceId: "1110411",
  },
] as Tour[];

// Bokun 설정
export const BOKUN_CONFIG = {
  bookingChannelUUID: "0a1af831-37c4-40d2-8aa7-2a8b7b985ea2",
};
