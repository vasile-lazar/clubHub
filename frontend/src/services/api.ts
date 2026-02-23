import axios from 'axios';
import type { AxiosError, InternalAxiosRequestConfig } from 'axios';

const AUTH_TOKEN_KEY = 'clubhub_token';
const AUTH_USER_KEY = 'clubhub_user';

function getStoredToken(): string | null {
  try {
    return (
      localStorage.getItem(AUTH_TOKEN_KEY) ?? sessionStorage.getItem(AUTH_TOKEN_KEY)
    );
  } catch {
    return null;
  }
}

function clearAuth(): void {
  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem(AUTH_USER_KEY);
  sessionStorage.removeItem(AUTH_TOKEN_KEY);
  sessionStorage.removeItem(AUTH_USER_KEY);
}

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? '/api',
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getStoredToken();
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error: unknown) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ message?: string }>) => {
    const status = error.response?.status;
    const message =
      (error.response?.data as { message?: string })?.message ?? 'Something went wrong';

    if (status === 401) {
      clearAuth();
      window.dispatchEvent(new CustomEvent('auth:logout'));
      window.location.href = '/login';
      return Promise.reject(error);
    }

    if (status === 403) {
      window.location.href = '/403';
      return Promise.reject(error);
    }

    if (status === 404) {
      window.location.href = '/404';
      return Promise.reject(error);
    }

    if (status && status >= 500) {
      window.dispatchEvent(
        new CustomEvent('toast:error', { detail: message || 'Server error. Please try again.' })
      );
    }

    return Promise.reject(error);
  }
);

export const AUTH_STORAGE = {
  tokenKey: AUTH_TOKEN_KEY,
  userKey: AUTH_USER_KEY,
};
