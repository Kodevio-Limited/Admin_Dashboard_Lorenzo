import { apiClient } from '@/lib/api/axios';
import type {
  Property,
  CreatePropertyInput,
  UpdatePropertyInput,
} from '@/types/property';
import type { ApiResponse } from '@/types/client';

export const propertyService = {
  /**
   * Fetch all properties
   * GET /api/v1/properties
   * Role: ADMIN | CLIENT (Own properties)
   */
  getProperties: async (): Promise<Property[]> => {
    const response = await apiClient.get<ApiResponse<Property[]>>('/properties');
    return response.data.data;
  },

  /**
   * Fetch property by ID
   * GET /api/v1/properties/:id
   * Role: ADMIN | CLIENT (Own property)
   */
  getPropertyById: async (id: number | string): Promise<Property> => {
    const response = await apiClient.get<ApiResponse<Property>>(`/properties/${id}`);
    return response.data.data;
  },

  /**
   * Create a new property
   * POST /api/v1/properties
   * Role: ADMIN
   */
  createProperty: async (payload: CreatePropertyInput): Promise<Property> => {
    const response = await apiClient.post<ApiResponse<Property>>('/properties', payload);
    return response.data.data;
  },

  /**
   * Update property details
   * PATCH /api/v1/properties/:id
   * Role: ADMIN
   */
  updateProperty: async (
    id: number | string,
    payload: UpdatePropertyInput
  ): Promise<Property> => {
    const response = await apiClient.patch<ApiResponse<Property>>(`/properties/${id}`, payload);
    return response.data.data;
  },

  /**
   * Delete / Soft Delete property status
   * DELETE /api/v1/properties/:id?status=ARCHIVED|INACTIVE
   * Role: ADMIN
   */
  deleteProperty: async (
    id: number | string,
    status?: string
  ): Promise<Property> => {
    const url = status ? `/properties/${id}?status=${status}` : `/properties/${id}`;
    const response = await apiClient.delete<ApiResponse<Property>>(url);
    return response.data.data;
  },
};

