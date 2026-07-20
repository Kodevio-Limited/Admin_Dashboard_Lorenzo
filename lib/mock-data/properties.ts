import type { Property } from '@/types/property';
import { getClients } from './clients';

const clients = getClients();

const initialProperties: Property[] = [
  { id: 'p1', name: 'Sunset Tower', location: 'New York, NY', clientId: clients[0].id, clientName: clients[0].name },
  { id: 'p2', name: 'Ocean View Plaza', location: 'Miami, FL', clientId: clients[1].id, clientName: clients[1].name },
  { id: 'p3', name: 'Green Valley Estate', location: 'Austin, TX', clientId: clients[2].id, clientName: clients[2].name },
  { id: 'p4', name: 'Skyline Heights', location: 'Chicago, IL', clientId: clients[3].id, clientName: clients[3].name },
  { id: 'p5', name: 'Maple Gardens', location: 'Seattle, WA', clientId: clients[0].id, clientName: clients[0].name },
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
