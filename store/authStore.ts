'use client';

import { create } from 'zustand';
import { refreshAuthToken } from '@/lib/api/axios';

interface AuthState {
  accessToken: string | null;
  userId: number | null;
  isAuthenticated: boolean;
  isInitialized: boolean;
  setAuth: (data: { userId: number; accessToken: string }) => void;
  setAccessToken: (accessToken: string) => void;
  clearAuth: () => void;
  initializeAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  userId: null,
  isAuthenticated: false,
  isInitialized: false,

  setAuth: ({ userId, accessToken }) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('userId', String(userId));
    }
    set({
      accessToken,
      userId,
      isAuthenticated: true,
      isInitialized: true,
    });
  },

  setAccessToken: (accessToken) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('accessToken', accessToken);
    }
    set({ accessToken, isAuthenticated: true });
  },

  clearAuth: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('userId');
    }
    set({
      accessToken: null,
      userId: null,
      isAuthenticated: false,
      isInitialized: true,
    });
  },

  initializeAuth: async () => {
    if (typeof window === 'undefined') {
      set({ isInitialized: true });
      return;
    }

    const token = localStorage.getItem('accessToken');
    const userIdStr = localStorage.getItem('userId');
    const userId = userIdStr ? parseInt(userIdStr, 10) : null;

    if (token) {
      set({
        accessToken: token,
        userId: userId && !isNaN(userId) ? userId : null,
        isAuthenticated: true,
      });
    }

    // Always attempt silent refresh on app startup using HttpOnly cookie
    try {
      await refreshAuthToken();
    } catch {
      // If refresh fails and there was no token, clear auth state
      if (!token) {
        set({
          accessToken: null,
          userId: null,
          isAuthenticated: false,
        });
      }
    } finally {
      set({ isInitialized: true });
    }
  },
}));
