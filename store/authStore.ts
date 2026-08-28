'use client';

import { create } from 'zustand';
import { refreshAuthToken } from '@/lib/api/axios';
import { extractRoleFromToken } from '@/lib/jwt';
import { userService } from '@/lib/api/services/user.service';

interface AuthState {
  accessToken: string | null;
  userId: number | null;
  role: string | null;
  isAuthenticated: boolean;
  isInitialized: boolean;
  setAuth: (data: { userId: number; accessToken: string; role?: string | null }) => void;
  setAccessToken: (accessToken: string) => void;
  clearAuth: () => void;
  initializeAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  accessToken: null,
  userId: null,
  role: null,
  isAuthenticated: false,
  isInitialized: false,

  setAuth: ({ userId, accessToken, role }) => {
    const extractedRole = role || extractRoleFromToken(accessToken);
    if (typeof window !== 'undefined') {
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('userId', String(userId));
      if (extractedRole) {
        localStorage.setItem('userRole', extractedRole);
      }
    }
    set({
      accessToken,
      userId,
      role: extractedRole || null,
      isAuthenticated: true,
      isInitialized: true,
    });
  },

  setAccessToken: (accessToken) => {
    const extractedRole = extractRoleFromToken(accessToken);
    if (typeof window !== 'undefined') {
      localStorage.setItem('accessToken', accessToken);
      if (extractedRole) {
        localStorage.setItem('userRole', extractedRole);
      }
    }
    set({
      accessToken,
      role: extractedRole || get().role,
      isAuthenticated: true,
    });
  },

  clearAuth: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('userId');
      localStorage.removeItem('userRole');
    }
    set({
      accessToken: null,
      userId: null,
      role: null,
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
    const storedRole = localStorage.getItem('userRole');

    if (token) {
      const tokenRole = extractRoleFromToken(token);
      const activeRole = tokenRole || storedRole;

      // If already known to be non-ADMIN, clear immediately
      if (activeRole && activeRole !== 'ADMIN') {
        get().clearAuth();
        return;
      }

      set({
        accessToken: token,
        userId: userId && !isNaN(userId) ? userId : null,
        role: activeRole || null,
        isAuthenticated: true,
      });
    }

    // Attempt silent refresh on app startup using HttpOnly cookie
    try {
      await refreshAuthToken();
    } catch {
      // If refresh fails and there was no valid token, clear auth state
      if (!token) {
        set({
          accessToken: null,
          userId: null,
          role: null,
          isAuthenticated: false,
        });
      }
    } finally {
      // Verify that current session has ADMIN role
      const currentState = get();
      if (currentState.isAuthenticated && currentState.accessToken) {
        let currentRole = currentState.role || extractRoleFromToken(currentState.accessToken);
        if (!currentRole) {
          try {
            const profile = await userService.getSelfProfile();
            currentRole = profile.role ? profile.role.toUpperCase() : null;
          } catch {
            currentRole = null;
          }
        }

        if (currentRole !== 'ADMIN') {
          get().clearAuth();
        } else {
          set({ role: 'ADMIN' });
          if (typeof window !== 'undefined') {
            localStorage.setItem('userRole', 'ADMIN');
          }
        }
      }

      set({ isInitialized: true });
    }
  },
}));
