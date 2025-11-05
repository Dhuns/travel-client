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

// Bokun 설정
export const BOKUN_CONFIG = {
  bookingChannelUUID: "0a1af831-37c4-40d2-8aa7-2a8b7b985ea2",
};
