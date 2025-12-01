const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:9191/api';

export interface Tour {
	id: number;
	bokunExperienceId: string;
	category: string | null;
	categoryOverride: string | null;
	isActive: boolean;
	displayOrder: number | null;
	title: string;
	description: string;
	thumbnailUrl: string;
	price: string | null;
	currency: string;
	duration: string;
	lastSyncedAt: string;
	createdAt: string;
	updatedAt: string;
}

// 클라이언트 사이드 캐시 (5분)
const CACHE_DURATION = 5 * 60 * 1000;
let toursCache: { data: Tour[] | null; timestamp: number } = { data: null, timestamp: 0 };

// 전체 투어 목록 조회 (공개 API) - 클라이언트 캐싱 적용
export const getAllTours = async (forceRefresh = false): Promise<Tour[]> => {
	const now = Date.now();

	// 캐시가 유효하면 캐시된 데이터 반환
	if (!forceRefresh && toursCache.data && (now - toursCache.timestamp) < CACHE_DURATION) {
		return toursCache.data;
	}

	const response = await fetch(`${API_URL}/tour/list`, {
		next: { revalidate: 900 }, // 15분 서버 캐시
	});
	if (!response.ok) {
		throw new Error('Failed to fetch tours');
	}

	const data = await response.json();

	// 캐시 업데이트
	toursCache = { data, timestamp: now };

	return data;
};

// 인기 투어 조회
export const getPopularTours = async (limit: number = 8): Promise<Tour[]> => {
	const response = await fetch(`${API_URL}/tour/popular?limit=${limit}`, {
		next: { revalidate: 3600 },
	});
	if (!response.ok) {
		throw new Error('Failed to fetch popular tours');
	}
	return response.json();
};

// 카테고리별 투어 조회
export const getToursByCategory = async (category: string): Promise<Tour[]> => {
	const response = await fetch(`${API_URL}/tour/category?category=${category}`, {
		next: { revalidate: 3600 },
	});
	if (!response.ok) {
		throw new Error('Failed to fetch tours by category');
	}
	return response.json();
};

// 투어의 실제 카테고리 결정 (categoryOverride가 있으면 사용, 없으면 category 사용)
export const getEffectiveCategory = (tour: Tour): string => {
	return tour.categoryOverride || tour.category || 'private';
};
