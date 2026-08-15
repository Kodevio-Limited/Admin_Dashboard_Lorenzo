import type { Client } from '@/types/client';

const initialClients: Client[] = [
  {
    id: 'c1',
    firstName: 'Mystic Ridge Resort',
    name: 'Mystic Ridge Resort',
    email: 'info@mysticridge.com',
    phone: '+1 (876) 957-4300',
    whatsapp: '+1 (876) 957-4301',
    country: 'Jamaica',
    servicePlan: 'Premium',
    status: 'Active',
    notes: 'Gated resort community in Ocho Rios. Monthly structural and environmental inspections required.',
    assignedPropertyIds: ['p1', 'p2'],
  },
  {
    id: 'c2',
    firstName: 'Tryall Club Jamaica',
    name: 'Tryall Club Jamaica',
    email: 'reservations@tryallclub.com',
    phone: '+1 (876) 956-5660',
    whatsapp: '+1 (876) 956-5661',
    country: 'Jamaica',
    servicePlan: 'Premium',
    status: 'Active',
    notes: 'Luxury villa and golf resort in Sandy Bay. Quarterly full-property audits.',
    assignedPropertyIds: ['p3'],
  },
  {
    id: 'c3',
    firstName: 'Sandals Negril',
    name: 'Sandals Negril',
    email: 'negril@sandals.com',
    phone: '+1 (876) 957-5216',
    whatsapp: '+1 (876) 957-5217',
    country: 'Jamaica',
    servicePlan: 'Standard',
    status: 'Active',
    notes: 'All-inclusive beachfront resort. Standard bi-monthly inspections.',
    assignedPropertyIds: ['p4'],
  },
  {
    id: 'c4',
    firstName: 'Kings House Properties',
    name: 'Kings House Properties',
    email: 'admin@kingshouse.com',
    phone: '+1 (876) 922-2650',
    whatsapp: '+1 (876) 922-2651',
    country: 'Jamaica',
    servicePlan: 'Premium',
    status: 'Active',
    notes: 'Government-adjacent commercial properties in Kingston. High-security protocols.',
    assignedPropertyIds: ['p5', 'p6'],
  },
  {
    id: 'c5',
    firstName: 'Rose Hall Developments',
    name: 'Rose Hall Developments',
    email: 'info@rosehall.com',
    phone: '+1 (876) 953-2323',
    whatsapp: '+1 (876) 953-2324',
    country: 'Jamaica',
    servicePlan: 'Standard',
    status: 'Active',
    notes: 'Mixed-use development in Montego Bay. Monthly site visits required.',
    assignedPropertyIds: ['p7', 'p8'],
  },
  {
    id: 'c6',
    firstName: 'Prospect Plantation Estate',
    name: 'Prospect Plantation Estate',
    email: 'contact@prospectplantation.com',
    phone: '+1 (876) 954-0101',
    whatsapp: '+1 (876) 954-0102',
    country: 'Jamaica',
    servicePlan: 'Basic',
    status: 'Inactive',
    notes: 'Historic plantation in Trelawny. Seasonal inspections only.',
    assignedPropertyIds: ['p9'],
  },
  {
    id: 'c7',
    firstName: 'YS Falls Eco Retreat',
    name: 'YS Falls Eco Retreat',
    email: 'hello@ysfallsretreat.com',
    phone: '+1 (876) 997-6360',
    whatsapp: '+1 (876) 997-6361',
    country: 'Jamaica',
    servicePlan: 'Standard',
    status: 'Pending',
    notes: 'Eco-tourism property in St. Elizabeth. Awaiting initial inspection sign-off.',
    assignedPropertyIds: ['p10'],
  },
  {
    id: 'c8',
    firstName: 'Portmore Commercial Group',
    name: 'Portmore Commercial Group',
    email: 'info@portmorecommercial.com',
    phone: '+1 (876) 748-3344',
    whatsapp: '+1 (876) 748-3345',
    country: 'Jamaica',
    servicePlan: 'Basic',
    status: 'Active',
    notes: 'Small commercial plaza in Portmore. Annual inspection plan.',
    assignedPropertyIds: ['p11'],
  },
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

export function updateClient(id: string | number, data: Omit<Client, 'id'>): Client | null {
  const index = clients.findIndex((c) => c.id === id);
  if (index === -1) return null;
  clients[index] = { id, ...data };
  return clients[index];
}
