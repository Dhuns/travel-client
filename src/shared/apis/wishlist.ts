import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:9191/api';

export interface WishlistItem {
	id: number;
	bokunExperienceId: string;
	title: string;
	image?: string;
	description?: string;
	price?: string;
	duration?: string;
	location?: string;
	createdAt: string;
}

export interface ToggleWishlistData {
	bokunExperienceId: string;
	title: string;
	image?: string;
	description?: string;
	price?: string;
	duration?: string;
	location?: string;
}

export interface WishlistResponse {
	isWishlisted: boolean;
	message: string;
}

// 내 위시리스트 조회
export const getMyWishlist = async (accessToken: string): Promise<WishlistItem[]> => {
	const response = await axios.get(`${API_URL}/wishlist`, {
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	});
	return response.data;
};

// 위시리스트 토글 (추가/삭제)
export const toggleWishlist = async (accessToken: string, data: ToggleWishlistData): Promise<WishlistResponse> => {
	const response = await axios.post(`${API_URL}/wishlist/toggle`, data, {
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	});
	return response.data;
};

// 특정 투어 찜 여부 확인
export const checkWishlist = async (accessToken: string, bokunExperienceId: string): Promise<{ isWishlisted: boolean }> => {
	const response = await axios.get(`${API_URL}/wishlist/check/${bokunExperienceId}`, {
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	});
	return response.data;
};

// 여러 투어 찜 여부 확인 (벌크)
export const checkWishlistBulk = async (accessToken: string, bokunExperienceIds: string[]): Promise<Record<string, boolean>> => {
	const response = await axios.post(`${API_URL}/wishlist/check-bulk`, { bokunExperienceIds }, {
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	});
	return response.data;
};

// 위시리스트에서 삭제
export const removeFromWishlist = async (accessToken: string, bokunExperienceId: string): Promise<WishlistResponse> => {
	const response = await axios.delete(`${API_URL}/wishlist/${bokunExperienceId}`, {
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	});
	return response.data;
};
