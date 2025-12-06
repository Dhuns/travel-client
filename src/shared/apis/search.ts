import { Tour, getAllTours, getEffectiveCategory } from './tour';

export type SearchCategory = 'all' | 'tours' | 'souvenirs';

export interface SearchResult {
	id: string | number;
	type: 'tour' | 'souvenir';
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
	souvenirs: SearchResult[];
}

// 기념품 데이터 (향후 API로 대체 예정)
const SOUVENIRS: SearchResult[] = [
	{
		id: 'souvenir-1',
		type: 'souvenir',
		title: 'Signature Hoodie',
		description: 'Premium cotton blend hoodie with traditional Korean embroidery. Comfortable and stylish for your travels.',
		thumbnailUrl: '/images/hero-products.jpg',
		price: 'Included with tour',
		category: 'apparel',
		link: '/souvenir',
	},
	{
		id: 'souvenir-2',
		type: 'souvenir',
		title: 'Eco-Friendly Tote Bag',
		description: '100% organic cotton tote bag featuring unique Korean landscape artwork. Sustainable and spacious.',
		thumbnailUrl: '/images/luxury-collection.jpg',
		price: 'Included with tour',
		category: 'accessories',
		link: '/souvenir',
	},
	{
		id: 'souvenir-3',
		type: 'souvenir',
		title: 'Premium Tumbler',
		description: 'Double-walled insulated tumbler with minimalist Tumakr logo. Keeps beverages at perfect temperature.',
		thumbnailUrl: '/images/modern-skincare.jpg',
		price: 'Included with tour',
		category: 'accessories',
		link: '/souvenir',
	},
];

/**
 * 투어 데이터를 SearchResult 형식으로 변환
 */
function tourToSearchResult(tour: Tour): SearchResult {
	const category = getEffectiveCategory(tour);
	return {
		id: tour.id,
		type: 'tour',
		title: tour.title,
		description: tour.description,
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

	const searchableText = [
		item.title,
		item.description,
		item.category,
	]
		.filter(Boolean)
		.join(' ')
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
	keyword: string = '',
	category: SearchCategory = 'all'
): Promise<SearchResponse> {
	const results: SearchResult[] = [];
	let tours: SearchResult[] = [];
	let souvenirs: SearchResult[] = [];

	try {
		// 투어 검색
		if (category === 'all' || category === 'tours') {
			const allTours = await getAllTours();
			const activeTours = allTours.filter((tour) => tour.isActive);
			tours = activeTours
				.map(tourToSearchResult)
				.filter((tour) => matchesKeyword(tour, keyword));
		}

		// 기념품 검색
		if (category === 'all' || category === 'souvenirs') {
			souvenirs = SOUVENIRS.filter((souvenir) => matchesKeyword(souvenir, keyword));
		}

		// 결과 합치기 (투어 먼저, 그 다음 기념품)
		results.push(...tours, ...souvenirs);

		return {
			results,
			total: results.length,
			tours,
			souvenirs,
		};
	} catch (error) {
		console.error('Search error:', error);
		// 에러 발생 시에도 기념품은 검색 가능
		if (category === 'all' || category === 'souvenirs') {
			souvenirs = SOUVENIRS.filter((souvenir) => matchesKeyword(souvenir, keyword));
		}
		return {
			results: souvenirs,
			total: souvenirs.length,
			tours: [],
			souvenirs,
		};
	}
}

/**
 * 투어만 검색
 */
export async function searchTours(keyword: string = ''): Promise<SearchResult[]> {
	const response = await searchAll(keyword, 'tours');
	return response.tours;
}

/**
 * 기념품만 검색
 */
export function searchSouvenirs(keyword: string = ''): SearchResult[] {
	return SOUVENIRS.filter((souvenir) => matchesKeyword(souvenir, keyword));
}
