import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:9191/api';

export interface SignupData {
	username: string;
	password: string;
	name: string;
	email?: string;
	phone?: string;
	birthDate?: string;
	gender?: 'male' | 'female' | 'other';
	profileImage?: string;
	termsAgreed: boolean;
	privacyAgreed: boolean;
}

export interface SigninData {
	username: string;
	password: string;
}

export interface TokenResponse {
	accessToken: string;
	accessTokenExpiresIn: number;
	refreshToken: string;
	refreshTokenExpiresIn: number;
}

export interface User {
	id: number;
	username: string;
	name: string;
	email: string;
	phone: string;
	birthDate: string;
	gender: string;
	profileImage: string;
	emailVerified: boolean;
	status: string;
	userGrade: string;
	provider: string;
	providerId: string;
	createdAt: string;
	updatedAt: string;
}

// 회원가입
export const signup = async (data: SignupData): Promise<{ success: boolean }> => {
	const response = await axios.post(`${API_URL}/user/signup`, data);
	return response.data;
};

// 로그인
export const signin = async (data: SigninData): Promise<TokenResponse> => {
	const response = await axios.post(`${API_URL}/user/signin`, data);
	return response.data;
};

// 로그아웃
export const logout = async (accessToken: string): Promise<boolean> => {
	const response = await axios.get(`${API_URL}/user/logout`, {
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	});
	return response.data;
};

// 내 정보 조회
export const getMe = async (accessToken: string): Promise<User> => {
	const response = await axios.get(`${API_URL}/user/me`, {
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	});
	return response.data;
};

// 토큰 갱신
export const renewToken = async (accessToken: string): Promise<TokenResponse> => {
	const response = await axios.get(`${API_URL}/user/renewal/token`, {
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	});
	return response.data;
};

// 아이디 중복 체크
export const checkUsername = async (username: string): Promise<boolean> => {
	const response = await axios.post(`${API_URL}/user/validate/username`, { username });
	return response.data;
};

// 이메일 인증
export const verifyEmail = async (token: string): Promise<{ success: boolean; message: string }> => {
	const response = await axios.get(`${API_URL}/user/verify-email?token=${token}`);
	return response.data;
};

// 이메일 인증 메일 재발송
export const resendVerificationEmail = async (email: string): Promise<{ success: boolean; message: string }> => {
	const response = await axios.post(`${API_URL}/user/resend-verification`, { email });
	return response.data;
};

// Google OAuth
export const getGoogleAuthUrl = (): string => {
	return `${API_URL}/user/auth/google`;
};

// Apple OAuth
export const getAppleAuthUrl = (): string => {
	return `${API_URL}/user/auth/apple`;
};
