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
    "Content-Type": "application/json;charset=UTF-8",
  },
});

// Refresh-token instance
const axiosApiRefreshToken = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
  },
});

axiosApiInstance.interceptors.request.use(
  (config: any) => {
    const accessToken = getCookie(COOKIE_KEYS.ACCESS_TOKEN);
    if (accessToken) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${accessToken}`,
      };
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosApiInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 401 에러이고, 재시도하지 않은 요청인 경우
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = getCookie(COOKIE_KEYS.REFRESH_TOKEN);

        if (refreshToken) {
          // 리프레시 토큰으로 새 액세스 토큰 발급
          const response = await axiosApiRefreshToken.get(API_PATHS.REFRESH_TOKEN);
          const { accessToken, accessTokenExpiresIn } = response.data;

          // 새 액세스 토큰 저장
          setCookie(COOKIE_KEYS.ACCESS_TOKEN, accessToken, {
            maxAge: accessTokenExpiresIn,
          });

          // 원래 요청 재시도
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return axios(originalRequest);
        }
      } catch (refreshError) {
        // 리프레시 토큰도 만료된 경우
        removeCookie(COOKIE_KEYS.ACCESS_TOKEN);
        removeCookie(COOKIE_KEYS.REFRESH_TOKEN);
        if (typeof window !== 'undefined') {
          window.location.href = PATHS.LOGIN;
        }
      }
    }

    return Promise.reject(error);
  }
);

axiosApiRefreshToken.interceptors.request.use(
  async (config: any) => {
    const refreshTokenByCookies = getCookie(COOKIE_KEYS.REFRESH_TOKEN);
    if (refreshTokenByCookies) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${refreshTokenByCookies}`,
        withCredentials: true,
      };
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
  return axiosApiInstance.post(`${url}`, payload, options).then(successHandler);
};

export const putRequest = (
  url: string,
  payload: any,
  options?: any
): Promise<any> => {
  return axiosApiInstance.put(`${url}`, payload, options).then(successHandler);
};

export const deleteRequest = (url: string, params?: any): Promise<any> => {
  return axiosApiInstance.delete(`${url}`, { params }).then(successHandler);
};
