export interface LoginInput {
  email: string;
  password: string;
}

export interface LoginData {
  userId: number;
  accessToken: string;
}

export interface RefreshTokenData {
  userId: number;
  accessToken: string;
}

export interface ForgotPasswordInput {
  email: string;
}

export interface ResetPasswordInput {
  token: string;
  newPassword: string;
}

export interface ChangePasswordInput {
  currentPassword: string;
  newPassword: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
}
