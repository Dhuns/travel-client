import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, TokenResponse, signin, logout as logoutApi, getMe, renewToken } from '../apis/user';

interface AuthState {
	user: User | null;
	accessToken: string | null;
	refreshToken: string | null;
	isAuthenticated: boolean;
	isLoading: boolean;

	// Actions
	login: (username: string, password: string) => Promise<void>;
	logout: () => Promise<void>;
	setTokens: (tokens: TokenResponse) => void;
	fetchUser: () => Promise<void>;
	refreshAccessToken: () => Promise<void>;
	clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
	persist(
		(set, get) => ({
			user: null,
			accessToken: null,
			refreshToken: null,
			isAuthenticated: false,
			isLoading: false,

			login: async (username: string, password: string) => {
				try {
					set({ isLoading: true });
					const tokens = await signin({ username, password });
					set({
						accessToken: tokens.accessToken,
						refreshToken: tokens.refreshToken,
						isAuthenticated: true,
					});
					await get().fetchUser();
				} catch (error) {
					console.error('Login failed:', error);
					throw error;
				} finally {
					set({ isLoading: false });
				}
			},

			logout: async () => {
				try {
					const { accessToken } = get();
					if (accessToken) {
						await logoutApi(accessToken);
					}
				} catch (error) {
					console.error('Logout failed:', error);
				} finally {
					get().clearAuth();
				}
			},

			setTokens: (tokens: TokenResponse) => {
				set({
					accessToken: tokens.accessToken,
					refreshToken: tokens.refreshToken,
					isAuthenticated: true,
				});
			},

			fetchUser: async () => {
				try {
					const { accessToken } = get();
					if (!accessToken) return;

					const user = await getMe(accessToken);
					set({ user });
				} catch (error) {
					console.error('Failed to fetch user:', error);
					get().clearAuth();
				}
			},

			refreshAccessToken: async () => {
				try {
					const { accessToken } = get();
					if (!accessToken) return;

					const tokens = await renewToken(accessToken);
					set({
						accessToken: tokens.accessToken,
						refreshToken: tokens.refreshToken,
					});
				} catch (error) {
					console.error('Failed to refresh token:', error);
					get().clearAuth();
				}
			},

			clearAuth: () => {
				set({
					user: null,
					accessToken: null,
					refreshToken: null,
					isAuthenticated: false,
				});
				
				// 로그아웃 시 localStorage의 채팅 캐시만 초기화 (서버 데이터는 유지)
				if (typeof window !== 'undefined') {
					const CHAT_STORAGE_KEY = 'chat-sessions-storage';
					localStorage.removeItem(CHAT_STORAGE_KEY);
				}
			},
		}),
		{
			name: 'auth-storage',
			partialize: (state) => ({
				accessToken: state.accessToken,
				refreshToken: state.refreshToken,
				isAuthenticated: state.isAuthenticated,
			}),
		},
	),
);
