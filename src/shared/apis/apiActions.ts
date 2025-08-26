/* eslint-disable no-param-reassign */
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { API_PATHS, PATHS } from "@shared/path";
import {
  COOKIE_EXPIRES,
  COOKIE_KEYS,
  getCookie,
  removeCookie,
  setCookie,
} from "@shared/utils/cookie";

const baseURL = process.env.NEXT_PUBLIC_API_URL;
const successHandler = (res: AxiosResponse): any => res.data;

// Main instance
const axiosApiInstance = axios.create({
  baseURL,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json;charset=UTF-8",
  },
});

// Refresh-token instance
const axiosApiRefreshToken = axios.create({
  baseURL,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json;charset=UTF-8",
  },
});

axiosApiInstance.interceptors.request.use(
  (config: any) => {
    if (typeof window !== undefined) {
      const accessTokenByCookies = getCookie(COOKIE_KEYS.ACCESS_TOKEN);
      if (accessTokenByCookies) {
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${accessTokenByCookies}`,
          withCredentials: true,
        };
      }
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

axiosApiInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response?.status === 401 && typeof window !== undefined) {
      // 1. 세션 만료 시, API 재호출
      try {
        const originalRequest = error.config;
        const refreshTokenByCookies: string = getCookie(
          COOKIE_KEYS.REFRESH_TOKEN
        );

        if (originalRequest && refreshTokenByCookies) {
          const getRefreshToken: AxiosResponse<{
            accessToken: string;
            accessTokenExpiresIn: number;
          }> = await axiosApiRefreshToken.put(API_PATHS.REFRESH_TOKEN);

          removeCookie(COOKIE_KEYS.ACCESS_TOKEN);

          const { accessToken, accessTokenExpiresIn } = getRefreshToken?.data;

          if (accessToken) {
            setCookie(COOKIE_KEYS.ACCESS_TOKEN, accessToken, {
              maxAge: accessTokenExpiresIn,
            });
            originalRequest.headers.Authorization = `Bearer ${accessToken}`;
            return axios(originalRequest);
          }

          removeCookie(COOKIE_KEYS.ACCESS_TOKEN);
          removeCookie(COOKIE_KEYS.REFRESH_TOKEN);
          window.location.href = PATHS.HOME;

          //
        } else {
          removeCookie(COOKIE_KEYS.ACCESS_TOKEN);
          removeCookie(COOKIE_KEYS.REFRESH_TOKEN);
          window.location.href = PATHS.HOME;
        }
      } catch (e) {
        // 2. 토큰 발급 실패, 로그아웃
        removeCookie(COOKIE_KEYS.ACCESS_TOKEN);
        removeCookie(COOKIE_KEYS.REFRESH_TOKEN);
        window.location.href = PATHS.HOME;
      }
    }
    return Promise.reject(error);
  }
);

axiosApiRefreshToken.interceptors.request.use(
  async (config: any) => {
    if (typeof window !== undefined) {
      const refreshTokenByCookies = getCookie(COOKIE_KEYS.REFRESH_TOKEN);
      if (refreshTokenByCookies) {
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${refreshTokenByCookies}`,
          withCredentials: true,
        };
      }
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export const getRequest = (url: string, params?: any): Promise<any> => {
  return axiosApiInstance.get(`${url}`, { params }).then(successHandler);
};

export const postRequest = (
  url: string,
  payload?: any,
  options?: any
): Promise<any> => {
  return axiosApiInstance.post(`${url}`, payload, options);
};

export const putRequest = (
  url: string,
  payload: any,
  options?: any
): Promise<any> => {
  return axiosApiInstance.put(`${url}`, payload, options);
};

export const deleteRequest = (url: string, params?: any): Promise<any> => {
  return axiosApiInstance.delete(`${url}`, { params });
};
