import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { useAuthStore } from '@/store/authStore';
import { extractRoleFromToken } from '@/lib/jwt';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Crucial for passing HttpOnly refreshToken cookie automatically
});

// Flag and subscriber queue for handling parallel token refreshes
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}> = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else if (token) {
      promise.resolve(token);
    }
  });
  failedQueue = [];
};

// Request Interceptor: Attach Bearer AccessToken
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (typeof window !== 'undefined') {
      const token = useAuthStore.getState().accessToken || localStorage.getItem('accessToken');
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Helper function to call refresh-token endpoint
export async function refreshAuthToken(): Promise<string> {
  const refreshResponse = await axios.post<{
    success: boolean;
    message: string;
    data: { userId: number; accessToken: string; role?: string };
  }>(`${BASE_URL}/auth/refresh-token`, {}, { withCredentials: true });

  const newAccessToken = refreshResponse.data?.data?.accessToken;
  const userId = refreshResponse.data?.data?.userId;

  if (!newAccessToken) {
    throw new Error('Failed to refresh token');
  }

  const role = refreshResponse.data?.data?.role || extractRoleFromToken(newAccessToken);
  if (role && role.toUpperCase() !== 'ADMIN') {
    throw new Error('Access denied: Admin role required');
  }

  useAuthStore.getState().setAuth({ userId, accessToken: newAccessToken, role });
  return newAccessToken;
}

// Response Interceptor: Automatic 401 Silent Refresh & Retry
apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<{ message?: string; success?: boolean }>) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    // Don't intercept if there's no response or it's not a 401 error
    if (!error.response || error.response.status !== 401) {
      const customMessage = error.response?.data?.message || error.message || 'An unexpected error occurred';
      return Promise.reject(new Error(customMessage));
    }

    // Don't intercept refresh-token or login requests to avoid infinite loops
    if (
      originalRequest.url?.includes('/auth/login') ||
      originalRequest.url?.includes('/auth/refresh-token')
    ) {
      const customMessage = error.response?.data?.message || 'Authentication failed';
      return Promise.reject(new Error(customMessage));
    }

    // If request already retried, clear auth and redirect to login
    if (originalRequest._retry) {
      useAuthStore.getState().clearAuth();
      if (typeof window !== 'undefined' && !window.location.pathname.startsWith('/login')) {
        window.location.href = '/login';
      }
      return Promise.reject(error);
    }

    // If a refresh is already in progress, queue this request
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      })
        .then((token) => {
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${token}`;
          }
          return apiClient(originalRequest);
        })
        .catch((err) => Promise.reject(err));
    }

    originalRequest._retry = true;
    isRefreshing = true;

    try {
      // Call silent refresh
      const newAccessToken = await refreshAuthToken();

      // Process queued requests
      processQueue(null, newAccessToken);

      // Retry original request with new access token
      if (originalRequest.headers) {
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
      }

      return apiClient(originalRequest);
    } catch (refreshErr) {
      processQueue(refreshErr, null);
      useAuthStore.getState().clearAuth();

      if (typeof window !== 'undefined' && !window.location.pathname.startsWith('/login')) {
        window.location.href = '/login';
      }

      return Promise.reject(refreshErr);
    } finally {
      isRefreshing = false;
    }
  }
);

export default apiClient;
