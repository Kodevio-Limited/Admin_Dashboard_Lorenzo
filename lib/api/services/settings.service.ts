import { apiClient } from '@/lib/api/axios';
import type { ApiResponse } from '@/types/client';

export interface SettingsPrivacyPolicy {
  value: string;
  updatedAt?: string;
}

export interface SettingsTermsConditions {
  value?: string;
  content: string;
  updatedAt?: string;
}

export const settingsService = {
  /**
   * Fetch Privacy Policy content
   * GET /api/v1/settings/privacy-policy
   */
  getPrivacyPolicy: async (): Promise<SettingsPrivacyPolicy> => {
    const response = await apiClient.get<ApiResponse<SettingsPrivacyPolicy>>('/settings/privacy-policy');
    return response.data.data;
  },

  /**
   * Update Privacy Policy
   * PUT /api/v1/settings/privacy-policy
   * Role: ADMIN
   */
  updatePrivacyPolicy: async (value: string): Promise<SettingsPrivacyPolicy> => {
    const response = await apiClient.put<ApiResponse<SettingsPrivacyPolicy>>('/settings/privacy-policy', { value });
    return response.data.data;
  },

  /**
   * Fetch Terms & Conditions content
   * GET /api/v1/settings/terms-and-conditions
   */
  getTermsAndConditions: async (): Promise<SettingsTermsConditions> => {
    const response = await apiClient.get<ApiResponse<SettingsTermsConditions>>('/settings/terms-and-conditions');
    return response.data.data;
  },

  /**
   * Update Terms & Conditions
   * PUT /api/v1/settings/terms-and-conditions
   * Role: ADMIN
   */
  updateTermsAndConditions: async (content: string): Promise<SettingsTermsConditions> => {
    const response = await apiClient.put<ApiResponse<SettingsTermsConditions>>('/settings/terms-and-conditions', { content });
    return response.data.data;
  },
};
