import { apiClient } from '@/lib/api/axios';
import type {
  Client,
  CreateClientInput,
  UpdateClientInput,
  ApiResponse,
} from '@/types/client';

export const clientService = {
  /**
   * Fetch all clients
   * GET /api/v1/clients
   * Role: ADMIN
   */
  getClients: async (): Promise<Client[]> => {
    const response = await apiClient.get<ApiResponse<Client[]>>('/clients');
    return response.data.data;
  },

  /**
   * Fetch client details by ID
   * GET /api/v1/clients/:id
   * Role: ADMIN
   */
  getClientById: async (id: number | string): Promise<Client> => {
    const response = await apiClient.get<ApiResponse<Client>>(`/clients/${id}`);
    return response.data.data;
  },

  /**
   * Create a new client
   * POST /api/v1/clients
   * Role: ADMIN
   */
  createClient: async (payload: CreateClientInput): Promise<Client> => {
    const response = await apiClient.post<ApiResponse<Client>>('/clients', payload);
    return response.data.data;
  },

  /**
   * Update client details by ID
   * PATCH /api/v1/clients/:id
   * Role: ADMIN or Client himself
   */
  updateClient: async (
    id: number | string,
    payload: UpdateClientInput
  ): Promise<Client> => {
    const response = await apiClient.patch<ApiResponse<Client>>(`/clients/${id}`, payload);
    return response.data.data;
  },
};
