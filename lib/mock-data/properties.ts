import type { Property } from '@/types/property';
import { getClients } from './clients';

const clients = getClients();

const initialProperties: Property[] = [
  {
    id: 'p1',
    name: 'Mystic Ridge Main Resort Building',
    parish: 'St. Ann',
    gpsCoordinates: '18.4012° N, 77.0989° W',
    propertyType: 'Commercial',
    clientId: clients[0].id,
    clientName: clients[0].name,
    servicePlan: 'Premium',
    assignedFieldRep: 'Owen Reid',
    nextVisitDate: '2026-08-15',
    reportStatus: 'Up to Date',
    notes: 'Main hotel structure with 120 rooms. Roof inspection due this quarter.',
  },
  {
    id: 'p2',
    name: 'Mystic Ridge Villa 12',
    parish: 'St. Ann',
    gpsCoordinates: '18.4020° N, 77.0995° W',
    propertyType: 'Residential',
    clientId: clients[0].id,
    clientName: clients[0].name,
    servicePlan: 'Premium',
    assignedFieldRep: 'Owen Reid',
    nextVisitDate: '2026-08-15',
    reportStatus: 'Up to Date',
    notes: 'Private luxury villa on the resort grounds. Bi-monthly pest and structural checks.',
  },
  {
    id: 'p3',
    name: 'Tryall Club Golf Course & Villa Estate',
    parish: 'Hanover',
    gpsCoordinates: '18.4628° N, 78.0169° W',
    propertyType: 'Mixed Use',
    clientId: clients[1].id,
    clientName: clients[1].name,
    servicePlan: 'Premium',
    assignedFieldRep: 'Kareem James',
    nextVisitDate: '2026-09-01',
    reportStatus: 'Pending',
    notes: '18-hole golf course, clubhouse, and 12 luxury villas. Comprehensive quarterly audit.',
  },
  {
    id: 'p4',
    name: 'Sandals Negril Beachfront Wing',
    parish: 'Westmoreland',
    gpsCoordinates: '18.2684° N, 78.3487° W',
    propertyType: 'Commercial',
    clientId: clients[2].id,
    clientName: clients[2].name,
    servicePlan: 'Standard',
    assignedFieldRep: 'Shane Gordon',
    nextVisitDate: '2026-07-30',
    reportStatus: 'Overdue',
    notes: 'Beachfront wing with 200 suites. Recent storm damage assessment required.',
  },
  {
    id: 'p5',
    name: 'Kings House Commercial Tower',
    parish: 'Kingston',
    gpsCoordinates: '17.9712° N, 76.7921° W',
    propertyType: 'Commercial',
    clientId: clients[3].id,
    clientName: clients[3].name,
    servicePlan: 'Premium',
    assignedFieldRep: 'Tanya Samuels',
    nextVisitDate: '2026-08-05',
    reportStatus: 'Up to Date',
    notes: '12-storey commercial tower in New Kingston. Monthly fire safety and structural audits.',
  },
  {
    id: 'p6',
    name: 'Kings House Warehouse & Logistics Hub',
    parish: 'Kingston',
    gpsCoordinates: '17.9685° N, 76.7980° W',
    propertyType: 'Industrial',
    clientId: clients[3].id,
    clientName: clients[3].name,
    servicePlan: 'Premium',
    assignedFieldRep: 'Tanya Samuels',
    nextVisitDate: '2026-08-20',
    reportStatus: 'Pending',
    notes: '40,000 sq ft warehouse near Kingston port. Bi-weekly inventory and structural checks.',
  },
  {
    id: 'p7',
    name: 'Rose Hall Conference Centre',
    parish: 'St. James',
    gpsCoordinates: '18.5088° N, 77.8920° W',
    propertyType: 'Commercial',
    clientId: clients[4].id,
    clientName: clients[4].name,
    servicePlan: 'Standard',
    assignedFieldRep: 'Shane Gordon',
    nextVisitDate: '2026-08-12',
    reportStatus: 'Not Started',
    notes: 'New construction. Initial certification inspection pending.',
  },
  {
    id: 'p8',
    name: 'Rose Hall Staff Quarters',
    parish: 'St. James',
    gpsCoordinates: '18.5095° N, 77.8932° W',
    propertyType: 'Residential',
    clientId: clients[4].id,
    clientName: clients[4].name,
    servicePlan: 'Standard',
    assignedFieldRep: 'Shane Gordon',
    nextVisitDate: '2026-08-12',
    reportStatus: 'Not Started',
    notes: 'Newly constructed staff accommodation block for 50 employees.',
  },
  {
    id: 'p9',
    name: 'Prospect Plantation Heritage Cottages',
    parish: 'Trelawny',
    gpsCoordinates: '18.4282° N, 77.6379° W',
    propertyType: 'Residential',
    clientId: clients[5].id,
    clientName: clients[5].name,
    servicePlan: 'Basic',
    assignedFieldRep: 'Kareem James',
    nextVisitDate: '2026-12-01',
    reportStatus: 'Up to Date',
    notes: 'Six historic cottages on a 200-acre plantation. Annual heritage property assessment.',
  },
  {
    id: 'p10',
    name: 'YS Falls Eco Guest House',
    parish: 'St. Elizabeth',
    gpsCoordinates: '18.1029° N, 77.5817° W',
    propertyType: 'Commercial',
    clientId: clients[6].id,
    clientName: clients[6].name,
    servicePlan: 'Standard',
    assignedFieldRep: 'Tanya Samuels',
    nextVisitDate: '2026-08-01',
    reportStatus: 'Pending',
    notes: 'Eco-lodge near YS Falls. Initial compliance inspection in progress.',
  },
  {
    id: 'p11',
    name: 'Portmore Commercial Plaza',
    parish: 'St. Catherine',
    gpsCoordinates: '17.9693° N, 76.8841° W',
    propertyType: 'Commercial',
    clientId: clients[7].id,
    clientName: clients[7].name,
    servicePlan: 'Basic',
    assignedFieldRep: 'Shane Gordon',
    nextVisitDate: '2027-01-15',
    reportStatus: 'Up to Date',
    notes: 'Small retail plaza with 12 units. Annual inspection only.',
  },
];

const properties = [...initialProperties];

export function getProperties(): Property[] {
  return [...properties];
}

export function createProperty(data: Omit<Property, 'id'>): Property {
  const property: Property = { id: `p${Date.now()}`, ...data };
  properties.push(property);
  return property;
}

export function updateProperty(id: string, data: Omit<Property, 'id'>): Property | null {
  const index = properties.findIndex((p) => p.id === id);
  if (index === -1) return null;
  properties[index] = { id, ...data };
  return properties[index];
}
