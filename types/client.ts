export type ServicePlanType =
  | 'BASIC'
  | 'STANDARD'
  | 'PREMIUM'
  | 'PRO'
  | 'ENTERPRISE'
  | 'Basic'
  | 'Standard'
  | 'Premium';

export type ClientStatus =
  | 'ACTIVE'
  | 'INACTIVE'
  | 'PENDING'
  | 'ARCHIVED'
  | 'Active'
  | 'Inactive'
  | 'Pending';

export type UserRole = 'ADMIN' | 'CLIENT';

export interface ClientProfile {
  id: number;
  userId: number;
  whatsapp: string | null;
  country: string | null;
  servicePlantype?: ServicePlanType;
  servicePlanType?: ServicePlanType;
  servicePlan?: ServicePlanType;
  status: ClientStatus;
  notes: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface Client {
  id: number | string;
  email: string;
  firstName?: string;
  lastName?: string | null;
  imageUrl?: string | null;
  phone?: string | null;
  role?: UserRole;
  emailVerifiedAt?: string | null;
  isDeleted?: boolean;
  deletedAt?: string | null;
  createdAt?: string;
  updatedAt?: string;
  clientProfile?: ClientProfile | null;

  // Derived / compatibility fields for legacy UI components
  name?: string;
  whatsapp?: string;
  country?: string;
  servicePlanType?: ServicePlanType;
  servicePlan?: ServicePlanType;
  status?: ClientStatus;
  notes?: string;
  assignedPropertyIds?: string[];
}

export interface CreateClientInput {
  firstName: string;
  lastName?: string;
  email: string;
  phone?: string;
  whatsapp?: string;
  country: string;
  servicePlanType: ServicePlanType;
  status?: ClientStatus;
  notes?: string;
}

export interface UpdateClientInput {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  whatsapp?: string;
  country?: string;
  servicePlanType?: ServicePlanType;
  status?: ClientStatus;
  notes?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}
