'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ACCOUNT_TABS } from '@/lib/constants';

export default function AccountNav() {
  const pathname = usePathname();

  return (
    <div className="flex border-b border-dark-400">
      {ACCOUNT_TABS.map((tab) => {
        const isActive = pathname === tab.href;
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={`px-6 py-3 text-sm font-medium transition-colors border-b-2 -mb-[1px] leading-[1.4] ${
              isActive
                ? 'text-white border-gold-mid'
                : 'text-dark-200 border-transparent hover:text-dark-100 hover:border-dark-400'
            }`}
          >
            {tab.label}
          </Link>
        );
      })}
    </div>
  );
}
