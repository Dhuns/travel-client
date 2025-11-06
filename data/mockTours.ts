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
  duration?: string;
  price?: string;
}

// mock history tour 데이터
export const historyTours: Tour[] = [
  {
    id: "1",
    title: "History Tour 1",
    subtitle: "Day trips and excursions with Shopping",
    category: "history",
    badge: "Day Trip",
    description:
      "Experience the perfect blend of shopping and scenic beauty with a gondola ride at Yongpyong.",
    highlights: ["Shopping opportunities", "Bus/minivan tour"],
    image: "/images/design-mode/castle2.png",
    bokunExperienceId: "1110358",
    categories: ["Day trips and excursions", "Shopping", "Bus/minivan tour"],
    location: "Paju-si, Gyeonggi-do, South Korea",
    included: [
      "Hotel pickup and drop-off",
      "Round trip gondola ride at Yongpyong",
    ],
  },
  {
    id: "2",
    title: "History Tour 2",
    subtitle: "Cultural and theme tours",
    category: "history",
    badge: "Cultural Tour",
    description:
      "Experience Seoul's rich cultural heritage with a private guide, including a traditional Korean lunch.",
    highlights: ["Bus/minivan tour", "Traditional Korean lunch included"],
    image: "/images/design-mode/castle1.png",
    bokunExperienceId: "1110371",
    categories: ["Cultural and theme tours", "Bus/minivan tour"],
    location: "Seoul, South Korea",
    included: [
      "Driver/guide",
      "Hotel pickup and drop-off",
      "Round-trip private transfer",
      "Korean Lunch",
    ],
  },
  {
    id: "3",
    title: "History Tour 3",
    subtitle: "Cultural and theme tours",
    category: "history",
    badge: "Cultural Tour",
    description:
      "Explore Seoul's historical landmarks including Deoksugung Palace and Seoul Museum of History.",
    highlights: [
      "Deoksugung Palace",
      "Seoul Museum of History",
      "Bus/minivan tour",
    ],
    image: "/images/design-mode/castle3.png",
    bokunExperienceId: "1110386",
    categories: ["Cultural and theme tours", "Bus/minivan tour"],
    location: "Seoul, South Korea",
    included: [
      "Private transportation",
      "English speaking driver-guide",
      "Entry/Admission - Seoul Museum of History",
    ],
  },
];

// mock private tour 데이터
export const privateTours: Tour[] = [
  {
    id: "1",
    title: "Seoul Royal Palace Private Tour",
    subtitle: "Exclusive guided tour of Seoul's historic palaces",
    category: "private",
    badge: "Dedicated Guide",
    description:
      "Explore Seoul's magnificent royal palaces with your own dedicated guide. Visit Gyeongbokgung and Changdeokgung, enjoy a traditional hanbok experience, and savor authentic Korean tea.",
    highlights: [
      "Gyeongbokgung",
      "Changdeokgung",
      "Hanbok Experience",
      "Traditional Tea",
    ],
    image: "/seoul-royal-palace-gyeongbokgung.jpg",
    bokunExperienceId: "1110398",
  },
  {
    id: "2",
    title: "Jeju Hidden Gems Tour",
    subtitle: "Discover Jeju Island's secret treasures",
    category: "private",
    badge: "Dedicated Guide",
    description:
      "Explore Jeju's hidden beaches, local cuisine, scenic oreum hiking trails, and visit authentic tangerine farms with your personal guide.",
    highlights: [
      "Secret Beaches",
      "Local Cuisine",
      "Oreum Hiking",
      "Tangerine Farm",
    ],
    image: "/jeju-island-traditional-architecture.jpg",
    bokunExperienceId: "1110407",
  },
  {
    id: "3",
    title: "Busan Coastal Private Tour",
    subtitle: "Explore Busan's stunning coastal scenery",
    category: "private",
    badge: "Dedicated Guide",
    description:
      "Discover Busan's beautiful coastline with visits to Haeundae Port, colorful Gamcheon Culture Village, bustling Jagalchi Market, and relaxing Haeundae Beach.",
    highlights: [
      "Haeundae Port",
      "Gamcheon Village",
      "Jagalchi Market",
      "Haeundae Beach",
    ],
    image: "/busan-coastal-scenery-haeundae.jpg",
    bokunExperienceId: "1110407",
  },
];

// mock multiday tour 데이터
export const multidayTours: Tour[] = [
  {
    id: "1",
    title: "Korea Multi-day History Tour",
    subtitle: "In-depth historical exploration over multiple days",
    category: "multiday",
    badge: "7 Days / 6 Nights",
    description:
      "Experience the complete historical narrative of Korea with a relaxed itinerary that provides deeper understanding and perfect balance of tours and free time.",
    highlights: [
      "Complete Historical Narrative",
      "Relaxed Itinerary",
      "Deeper Understanding",
      "Perfect Balance of Tours & Free Time",
    ],
    image: "/images/design-mode/multiday-tour-hero.png",
    bokunExperienceId: "1110411",
  },
];

// Bokun 설정
export const BOKUN_CONFIG = {
  bookingChannelUUID: "0a1af831-37c4-40d2-8aa7-2a8b7b985ea2",
};
