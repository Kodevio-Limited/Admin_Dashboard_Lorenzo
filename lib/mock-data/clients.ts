import type { Client } from '@/types/client';

const initialClients: Client[] = [
  { id: 'c1', name: 'Acme Corporation', email: 'contact@acme.com' },
  { id: 'c2', name: 'Globex Industries', email: 'info@globex.com' },
  { id: 'c3', name: 'Initech Solutions', email: 'support@initech.com' },
  { id: 'c4', name: 'Umbrella Group', email: 'hello@umbrella.com' },
  { id: 'c5', name: 'Wayne Enterprises', email: 'ceo@wayne.com' },
];

const clients = [...initialClients];

export function getClients(): Client[] {
  return [...clients];
}

export function createClient(data: Omit<Client, 'id'>): Client {
  const client: Client = {
    id: `c${Date.now()}`,
    ...data,
  };
  clients.push(client);
  return client;
}

export function updateClient(id: string, data: Omit<Client, 'id'>): Client | null {
  const index = clients.findIndex((c) => c.id === id);
  if (index === -1) return null;
  clients[index] = { id, ...data };
  return clients[index];
}
