'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { NAV_ITEMS } from '@/lib/constants';

export default function Sidebar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/dashboard/account/profile') {
      return pathname.startsWith('/dashboard/account');
    }
    return pathname.startsWith(href);
  };

  return (
    <aside
      className="w-[260px] bg-dark-600 flex flex-col shrink-0 h-screen overflow-y-auto"
      style={{ borderRadius: '16px' }}
    >
      <div className="flex flex-col items-center pt-[32px] pb-0">
        <Link href="/">
          <Image
            src="/assets/sidebar-logo.png"
            alt="Logo"
            width={145}
            height={218}
            priority
            unoptimized
            className="object-contain"
            style={{ width: '145px', height: '218px' }}
          />
        </Link>
      </div>

      <nav className="flex flex-col gap-[10px] mx-auto mt-0" style={{ width: '200px' }}>
        {NAV_ITEMS.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-[10px] px-[14px] py-[8px] text-[14px] leading-[1.3] transition-colors ${
                active
                  ? 'text-bg font-medium rounded-[4px]'
                  : 'text-dark-200 font-normal hover:text-dark-100'
              }`}
              style={
                active
                  ? {
                      background: 'linear-gradient(180deg, #FCE688 0%, #D1A736 50%, #946E18 100%)',
                    }
                  : undefined
              }
              aria-label={item.label}
            >
              <Image
                src={item.icon}
                alt=""
                width={18}
                height={18}
                className={active ? 'brightness-0 invert-[0]' : 'opacity-40'}
                aria-hidden="true"
              />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
