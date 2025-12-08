import { stripHtmlTags } from "@/lib/bokun";
import { Tour, getAllTours, getEffectiveCategory } from "./tour";

export type SearchCategory = "all" | "tours";

export interface SearchResult {
  id: string | number;
  type: "tour";
  title: string;
  description: string;
  thumbnailUrl: string | null;
  price: string | null;
  category?: string;
  duration?: string;
  link: string;
}

export interface SearchResponse {
  results: SearchResult[];
  total: number;
  tours: SearchResult[];
}

/**
 * 투어 데이터를 SearchResult 형식으로 변환
 */
function tourToSearchResult(tour: Tour): SearchResult {
  const category = getEffectiveCategory(tour);
  return {
    id: tour.id,
    type: "tour",
    title: tour.title,
    description: stripHtmlTags(tour.description),
    thumbnailUrl: tour.thumbnailUrl,
    price: tour.price ? `${tour.currency} ${tour.price}` : null,
    category,
    duration: tour.duration,
    link: `/tours/${category}/${tour.bokunExperienceId}`,
  };
}

/**
 * 키워드로 검색어 매칭 확인
 */
function matchesKeyword(item: SearchResult, keyword: string): boolean {
  const searchTerm = keyword.toLowerCase().trim();
  if (!searchTerm) return true;

  const searchableText = [item.title, item.description, item.category]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  // 검색어가 여러 단어인 경우 각 단어가 모두 포함되어야 함
  const words = searchTerm.split(/\s+/);
  return words.every((word) => searchableText.includes(word));
}

/**
 * 통합 검색 API
 * Bokun 투어와 기념품을 함께 검색합니다.
 */
export async function searchAll(
  keyword: string = "",
  category: SearchCategory = "all"
): Promise<SearchResponse> {
  const results: SearchResult[] = [];
  let tours: SearchResult[] = [];

  try {
    // 투어 검색
    if (category === "all" || category === "tours") {
      const allTours = await getAllTours();
      const activeTours = allTours.filter((tour) => tour.isActive);
      tours = activeTours
        .map(tourToSearchResult)
        .filter((tour) => matchesKeyword(tour, keyword));
    }

    // 결과 합치기 (투어만)
    results.push(...tours);

    return {
      results,
      total: results.length,
      tours,
    };
  } catch (error) {
    console.error("Search error:", error);
    return {
      results: [],
      total: 0,
      tours: [],
    };
  }
}

/**
 * 투어만 검색
 */
export async function searchTours(keyword: string = ""): Promise<SearchResult[]> {
  const response = await searchAll(keyword, "tours");
  return response.tours;
}
