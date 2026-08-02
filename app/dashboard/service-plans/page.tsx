'use client';

import Header from '@/components/layout/Header';
import StatusBadge from '@/components/shared/StatusBadge';

interface ServicePlan {
  id: string;
  name: string;
  price: string;
  period: string;
  features: string[];
  clients: number;
  status: 'Active' | 'Coming Soon';
}

const plans: ServicePlan[] = [
  {
    id: 's1',
    name: 'Exterior Care Verification Plan',
    price: '$399',
    period: '/MONTH',
    features: ['Exterior-only verification', 'One visit per month', '25 photographs', 'Condition summary report'],
    clients: 12,
    status: 'Active',
  },
  {
    id: 's2',
    name: 'Property Care Plan',
    price: '$699',
    period: '/MONTH',
    features: ['Interior & exterior verification', 'One visit per month', '40 photographs', 'Detailed report'],
    clients: 8,
    status: 'Active',
  },
  {
    id: 's3',
    name: 'Property Steward Plan',
    price: '$999',
    period: '/MONTH',
    features: ['Premium protection', 'Two visits per month', '60 photographs', 'Priority scheduling'],
    clients: 5,
    status: 'Active',
  },
  {
    id: 's4',
    name: 'Blueprint Review – Tier 1',
    price: '$999',
    period: 'One-time',
    features: ['Blueprint & layout review', 'Vendor coordination', 'Written recommendations'],
    clients: 3,
    status: 'Active',
  },
  {
    id: 's5',
    name: 'Blueprint Review – Tier 2',
    price: '$1,995',
    period: 'One-time',
    features: ['Includes Tier 1', 'Product recommendations', 'Sourcing guidance', 'Budgeting assistance'],
    clients: 2,
    status: 'Active',
  },
  {
    id: 's6',
    name: 'Blueprint Review – Tier 3',
    price: '$2,995+',
    period: 'One-time',
    features: ['Includes Tier 2', 'Procurement oversight', 'Ongoing project consultation'],
    clients: 1,
    status: 'Active',
  },
];

export default function ServicePlansPage() {
  return (
    <>
      <Header />
      <div className="px-8 pt-[50px] pb-[14px]">
        <div className="flex flex-col items-start gap-[10px]">
          <h2 className="text-[24px] font-medium text-white leading-[1.3]">Service Plans</h2>
          <span className="text-[14px] font-normal text-white/70 leading-[1.3]">
            View active verification and advisory plans. Demo data shown.
          </span>
        </div>
      </div>
      <div className="px-6 pb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {plans.map((plan) => (
            <div key={plan.id} className="bg-dark-600 rounded-[8px] p-5 border border-dark-400 flex flex-col gap-4">
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-[16px] font-medium text-white leading-[1.3]">{plan.name}</h3>
                <StatusBadge label={plan.status} variant={plan.status === 'Active' ? 'green' : 'gray'} />
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-[28px] font-bold text-white leading-[1.1]">{plan.price}</span>
                <span className="text-[13px] font-normal text-dark-100 leading-[1.2]">{plan.period}</span>
              </div>
              <ul className="flex flex-col gap-1.5">
                {plan.features.map((f) => (
                  <li key={f} className="text-[13px] font-normal text-dark-200 leading-[1.3] flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-gold-mid shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <div className="pt-3 border-t border-dark-400 text-[13px] font-normal text-dark-100 leading-[1.3]">
                {plan.clients} active client{plan.clients === 1 ? '' : 's'}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
