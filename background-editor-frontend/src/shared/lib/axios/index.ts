import axios, { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { deleteCookie, getCookie, setCookie } from 'cookies-next';
import { ECookieValues } from '@shared/utils/enums';
import { HttpStatus } from '@shared/utils/http-status';
import { ITokens } from '@shared/interfaces/entities/user/dto';

interface IAxiosRequestConfig {
  baseURL: string;
  isUpload?: boolean;
}

export const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api`;
export const ML_URL = process.env.NEXT_PUBLIC_ML_URL;

if (!API_URL || !ML_URL) {
  throw new Error('NEXT_PUBLIC_API_URL or NEXT_PUBLIC_ML_URL is not defined');
}

const createAxiosInstance = (config: IAxiosRequestConfig): AxiosInstance => {
  const { baseURL, isUpload = false } = config;

  const instance = axios.create({
    baseURL,
    withCredentials: false,
    headers: {
      'Content-Type': isUpload ? 'multipart/form-data' : 'application/json'
    }
  });

  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = getCookie(ECookieValues.ACCESS_TOKEN);
      if (token) {
        config.headers = config.headers || {};
        config.headers['Authorization'] = `Bearer ${token}`;
      }

      const userLanguage = getCookie(ECookieValues.NEXT_LOCALE);
      if (userLanguage) {
        config.headers = config.headers || {};
        config.headers['X-User-Language'] = userLanguage;
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error) => {
      const originalRequest = error.config;

      if (error.response?.status === HttpStatus.UNAUTHORIZED && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          const refreshToken = getCookie(ECookieValues.REFRESH_TOKEN);
          if (!refreshToken) {
            deleteCookie(ECookieValues.ACCESS_TOKEN);
            deleteCookie(ECookieValues.REFRESH_TOKEN);
            window.location.href = '/';
            return Promise.reject(error);
          }

          const { data } = await axios.post<ITokens>(`${API_URL}/auth/refresh-token`, { refreshToken });

          setCookie(ECookieValues.ACCESS_TOKEN, data.accessToken);
          setCookie(ECookieValues.REFRESH_TOKEN, data.refreshToken);

          originalRequest.headers['Authorization'] = `Bearer ${data.accessToken}`;
          originalRequest.isSecondRequest = true;

          return instance(originalRequest);
        } catch (refreshError) {
          deleteCookie(ECookieValues.ACCESS_TOKEN);
          deleteCookie(ECookieValues.REFRESH_TOKEN);
          window.location.href = '/';
          return Promise.reject(refreshError);
        }
      }

      if (originalRequest.isSecondRequest) {
        return Promise.reject(error);
      }

      if (error.response?.data?.message) {
        return Promise.reject(new Error(error.response.data.message));
      }
      return Promise.reject(error);
    }
  );

  return instance;
};

export const API_HTTPS_SERVICES = createAxiosInstance({ baseURL: `${API_URL}` });
export const API_HTTPS_AUTH_SERVICES = createAxiosInstance({ baseURL: `${API_URL}/auth` });
export const API_HTTPS_USER_SERVICES = createAxiosInstance({ baseURL: `${API_URL}/user` });
export const API_HTTPS_WORKING_AREA_SERVICES = createAxiosInstance({ baseURL: `${API_URL}/working-area` });
export const API_HTTPS_UPLOAD_SERVICES = createAxiosInstance({ baseURL: `${API_URL}/upload`, isUpload: true });
export const ML_HTTPS_SERVICES = createAxiosInstance({ baseURL: ML_URL });
