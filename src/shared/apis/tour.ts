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

// 전체 투어 목록 조회 (공개 API)
export const getAllTours = async (): Promise<Tour[]> => {
	try {
		const response = await fetch(`${API_URL}/tour/list`, {
			next: { revalidate: 60, tags: ['tours'] },
		});
		if (!response.ok) {
			console.error('Failed to fetch tours:', response.status);
			return [];
		}
		return response.json();
	} catch (error) {
		console.error('Failed to fetch tours:', error);
		return [];
	}
};

// 인기 투어 조회
export const getPopularTours = async (limit: number = 8): Promise<Tour[]> => {
	try {
		const response = await fetch(`${API_URL}/tour/popular?limit=${limit}`, {
			next: { revalidate: 60, tags: ['tours'] },
		});
		if (!response.ok) {
			console.error('Failed to fetch popular tours:', response.status);
			return [];
		}
		return response.json();
	} catch (error) {
		console.error('Failed to fetch popular tours:', error);
		return [];
	}
};

// 카테고리별 투어 조회
export const getToursByCategory = async (category: string): Promise<Tour[]> => {
	try {
		const response = await fetch(`${API_URL}/tour/category?category=${category}`, {
			next: { revalidate: 60, tags: ['tours'] },
		});
		if (!response.ok) {
			console.error(`Failed to fetch ${category} tours:`, response.status);
			return [];
		}
		return response.json();
	} catch (error) {
		console.error(`Failed to fetch ${category} tours:`, error);
		return [];
	}
};

// 투어의 실제 카테고리 결정 (categoryOverride가 있으면 사용, 없으면 category 사용)
export const getEffectiveCategory = (tour: Tour): string => {
	return tour.categoryOverride || tour.category || 'private';
};
