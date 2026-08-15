export type PropertyType =
  | 'RESIDENTIAL'
  | 'COMMERCIAL'
  | 'VACANT_LAND'
  | 'INDUSTRIAL'
  | 'MIXED_USED'
  | 'OTHER'
  | 'Residential'
  | 'Commercial'
  | 'Vacant Land'
  | 'Industrial'
  | 'Mixed Use';

export type ReportSubmissionStatus =
  | 'UPTODATE'
  | 'PENDING'
  | 'OVERDUE'
  | 'NOTSTARTED'
  | 'Up to Date'
  | 'Pending'
  | 'Overdue'
  | 'Not Started';

export type PropertyServicePlanType =
  | 'BASIC'
  | 'STANDARD'
  | 'PREMIUM'
  | 'PRO'
  | 'Basic'
  | 'Standard'
  | 'Premium';

export interface PropertyClientInfo {
  id: number;
  email: string;
  firstName: string;
  lastName: string | null;
}

export interface Property {
  id: number | string;
  clientId: number | string;
  name: string;
  parish?: string | null;
  city?: string | null;
  gpsCoordinates?: string | null;
  type?: PropertyType;
  propertyType?: PropertyType;
  fieldRep?: string;
  assignedFieldRep?: string;
  nextVisitDate: string;
  reportSubmissionStatus?: ReportSubmissionStatus | null;
  reportStatus?: ReportSubmissionStatus | null;
  servicePlantype?: PropertyServicePlanType;
  servicePlanType?: PropertyServicePlanType;
  servicePlan?: PropertyServicePlanType;
  note?: string | null;
  notes?: string | null;
  client?: PropertyClientInfo | null;
  clientName?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreatePropertyInput {
  clientId: number;
  name: string;
  parish?: string;
  city?: string;
  gpsCoordinates?: string;
  type: PropertyType;
  fieldRep: string;
  nextVisitDate: string;
  reportSubmissionStatus?: ReportSubmissionStatus;
  servicePlanType: PropertyServicePlanType;
  note?: string;
}

export interface UpdatePropertyInput {
  clientId?: number;
  name?: string;
  parish?: string;
  city?: string;
  gpsCoordinates?: string;
  type?: PropertyType;
  fieldRep?: string;
  nextVisitDate?: string;
  reportSubmissionStatus?: ReportSubmissionStatus;
  servicePlanType?: PropertyServicePlanType;
  note?: string;
}
