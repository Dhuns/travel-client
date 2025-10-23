import { postRequest, getRequest, putRequest } from "./apiActions";

// Types
export interface SignUpPayload {
  username: string;
  password: string;
  name: string;
}

export interface SignInPayload {
  username: string;
  password: string;
}

export interface ValidateUsernamePayload {
  username: string;
}

export interface TokenResponse {
  accessToken: string;
  accessTokenExpiresIn: number;
  refreshToken: string;
  refreshTokenExpiresIn: number;
}

export interface UserInfo {
  id: number;
  username: string;
  name: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

// APIs
export const signUp = (payload: SignUpPayload): Promise<any> =>
  postRequest("/user/signup", payload);

export const signIn = (payload: SignInPayload): Promise<TokenResponse> =>
  postRequest("/user/signin", payload);

export const validateUsername = (
  payload: ValidateUsernamePayload
): Promise<boolean> => postRequest("/user/validate/username", payload);

export const getUserMe = (): Promise<UserInfo> => getRequest("/user/me");

export const logout = (): Promise<any> => getRequest("/user/logout");

export const renewalToken = (): Promise<TokenResponse> =>
  getRequest("/user/renewal/token");
