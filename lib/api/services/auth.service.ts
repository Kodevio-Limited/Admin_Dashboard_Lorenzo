import { apiClient } from '@/lib/api/axios';
import type {
  LoginInput,
  LoginData,
  RefreshTokenData,
  ForgotPasswordInput,
  ResetPasswordInput,
  ChangePasswordInput,
  ApiResponse,
} from '@/types/auth';

export const authService = {
  /**
   * 1. Login User
   * POST /api/v1/auth/login
   * Public (No authentication required)
   * Stores refreshToken in HttpOnly cookie automatically
   */
  login: async (payload: LoginInput): Promise<LoginData> => {
    const response = await apiClient.post<ApiResponse<LoginData>>('/auth/login', payload);
    if (!response.data.data) {
      throw new Error(response.data.message || 'Login failed');
    }
    return response.data.data;
  },

  /**
   * 2. Refresh Token
   * POST /api/v1/auth/refresh-token
   * Public (Uses HttpOnly refreshToken cookie)
   */
  refreshToken: async (): Promise<RefreshTokenData> => {
    const response = await apiClient.post<ApiResponse<RefreshTokenData>>('/auth/refresh-token');
    if (!response.data.data) {
      throw new Error(response.data.message || 'Refresh token failed');
    }
    return response.data.data;
  },

  /**
   * 3. Logout User
   * POST /api/v1/auth/logout
   * Public (Clears HttpOnly refreshToken cookie)
   */
  logout: async (): Promise<void> => {
    await apiClient.post<ApiResponse<null>>('/auth/logout');
  },

  /**
   * 4. Forgot Password
   * POST /api/v1/auth/forgot-password
   * Public
   */
  forgotPassword: async (payload: ForgotPasswordInput): Promise<string> => {
    const response = await apiClient.post<ApiResponse<null>>('/auth/forgot-password', payload);
    return response.data.message || 'If an account exists with this email, a reset link has been sent.';
  },

  /**
   * 5. Reset Password
   * POST /api/v1/auth/reset-password
   * Public
   */
  resetPassword: async (payload: ResetPasswordInput): Promise<string> => {
    const response = await apiClient.post<ApiResponse<null>>('/auth/reset-password', payload);
    return response.data.message || 'Password reset successfully';
  },

  /**
   * 6. Change Password
   * POST /api/v1/auth/change-password
   * Protected (Requires Authorization: Bearer <accessToken>)
   */
  changePassword: async (payload: ChangePasswordInput): Promise<string> => {
    const response = await apiClient.post<ApiResponse<null>>('/auth/change-password', payload);
    return response.data.message || 'Password changed successfully';
  },
};
