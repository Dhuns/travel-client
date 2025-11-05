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
}

// mock history tour 데이터
export const historyTours: Tour[] = [
  {
    id: "1",
    title: "mock history tour 1",
    subtitle: "Explore Korea's Historical Heritage",
    category: "history",
    badge: "History & Art",
    description:
      "Learn about the history of architectural styles, cultural values, and social structures that shaped the nation.",
    highlights: [
      "Gyeongbokgung Palace",
      "Bukchon Hanok Village",
      "National Folk Museum",
      "Traditional tea ceremony",
    ],
    image: "/images/design-mode/history-tour-card.png",
    bokunExperienceId: "1110358",
  },
  {
    id: "2",
    title: "mock history tour 2",
    subtitle: "Nature Meets History",
    category: "history",
    badge: "Walking in Nature",
    description:
      "For those who prefer a slower pace, this tour combines historical sites with beautiful natural scenery and serene hiking spots.",
    highlights: [
      "Mountain temple trails",
      "Historic stone paths",
      "Meditation gardens",
      "Traditional architecture",
    ],
    image: "/images/design-mode/history-tour-card1.png",
    bokunExperienceId: "1110371",
  },
  {
    id: "3",
    title: "mock history tour 3",
    subtitle: "Past Meets Present",
    category: "history",
    badge: "History & Art",
    description:
      "Traditional and modern architecture blend seamlessly in this tour, showcasing how Korea honors its past while embracing the future.",
    highlights: [
      "Royal palace architecture",
      "Contemporary art museums",
      "Design districts",
      "Photo-worthy locations",
    ],
    image: "/images/design-mode/history-tour-card2.png",
    bokunExperienceId: "1110386",
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
