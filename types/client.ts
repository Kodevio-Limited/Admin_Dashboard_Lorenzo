export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  whatsapp?: string;
  country: string;
  servicePlan: 'Premium' | 'Standard' | 'Basic';
  status: 'Active' | 'Inactive' | 'Pending';
  notes?: string;
  assignedPropertyIds: string[];
}
