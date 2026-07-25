export interface Property {
  id: string;
  name: string;
  parish: string;
  gpsCoordinates?: string;
  propertyType: 'Residential' | 'Commercial' | 'Vacant Land' | 'Industrial' | 'Mixed Use';
  clientId: string;
  clientName: string;
  servicePlan: 'Premium' | 'Standard' | 'Basic';
  assignedFieldRep: string;
  nextVisitDate?: string;
  reportStatus: 'Up to Date' | 'Pending' | 'Overdue' | 'Not Started';
  notes?: string;
}
