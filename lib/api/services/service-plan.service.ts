import { apiClient } from '@/lib/api/axios';
import type { ApiResponse } from '@/types/client';

export type PlanBillingType = 'MONTHLY' | 'ONE_TIME';
export type ServicePlanStatus = 'ACTIVE' | 'INACTIVE' | 'ARCHIVED';

export interface ServicePlan {
  id: number;
  name: string;
  price: number;
  currency?: string;
  billingType: PlanBillingType;
  description?: string | null;
  features: string[];
  status?: ServicePlanStatus;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateServicePlanInput {
  name: string;
  price: number;
  currency?: string;
  billingType: PlanBillingType;
  description?: string;
  features: string[];
  status?: ServicePlanStatus;
}

export interface UpdateServicePlanInput {
  name?: string;
  price?: number;
  currency?: string;
  billingType?: PlanBillingType;
  description?: string;
  features?: string[];
  status?: ServicePlanStatus;
}

export const servicePlanService = {
  /**
   * Fetch all service plans
   * GET /api/v1/service-plans
   */
  getServicePlans: async (): Promise<ServicePlan[]> => {
    const response = await apiClient.get<ApiResponse<ServicePlan[]>>('/service-plans');
    return response.data.data;
  },

  /**
   * Fetch single service plan by ID
   * GET /api/v1/service-plans/:id
   */
  getServicePlanById: async (id: number): Promise<ServicePlan> => {
    const response = await apiClient.get<ApiResponse<ServicePlan>>(`/service-plans/${id}`);
    return response.data.data;
  },

  /**
   * Create service plan
   * POST /api/v1/service-plans
   * Role: ADMIN
   */
  createServicePlan: async (payload: CreateServicePlanInput): Promise<ServicePlan> => {
    const response = await apiClient.post<ApiResponse<ServicePlan>>('/service-plans', payload);
    return response.data.data;
  },

  /**
   * Update service plan
   * PATCH /api/v1/service-plans/:id
   * Role: ADMIN
   */
  updateServicePlan: async (id: number, payload: UpdateServicePlanInput): Promise<ServicePlan> => {
    const response = await apiClient.patch<ApiResponse<ServicePlan>>(`/service-plans/${id}`, payload);
    return response.data.data;
  },
};
