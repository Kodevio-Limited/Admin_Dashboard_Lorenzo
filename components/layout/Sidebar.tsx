'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { NAV_ITEMS } from '@/lib/constants';
import { useLogout } from '@/hooks/api/useAuth';

interface SidebarProps {
  mobileClassName?: string;
  onClose?: () => void;
}

export default function Sidebar({ mobileClassName, onClose }: SidebarProps) {
  const pathname = usePathname();
  const logoutMutation = useLogout();

  const isActive = (href: string) => {
    if (href === '/dashboard/account/profile') {
      return pathname.startsWith('/dashboard/account');
    }
    return pathname.startsWith(href);
  };

  return (
    <aside
      className={`w-[260px] bg-dark-600 flex flex-col shrink-0 h-screen max-h-full overflow-y-auto ${mobileClassName ?? ''}`}
      style={{ borderRadius: mobileClassName ? '0 16px 16px 0' : '16px' }}
    >
      {onClose && (
        <div className="flex justify-end px-4 pt-4">
          <button
            onClick={onClose}
            className="text-dark-200 hover:text-white transition-colors p-1"
            aria-label="Close sidebar"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M15 5L5 15M5 5l10 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      )}
      <div className="flex flex-col items-center pt-4 sm:pt-8 pb-0">
        <Link href="/" onClick={onClose}>
          <Image
            src="/assets/sidebar-logo.png"
            alt="Logo"
            width={145}
            height={218}
            priority
            unoptimized
            className="object-contain w-[100px] h-[150px] sm:w-[120px] sm:h-[180px] md:w-[145px] md:h-[218px]"
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
              onClick={onClose}
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
                className={
                  active
                    ? 'brightness-0 invert sepia-[0.3] saturate-[2] hue-rotate-[350deg] drop-shadow-[0_0_3px_rgba(255,255,255,0.85)]'
                    : 'brightness-0 sepia saturate-[6] hue-rotate-[5deg] drop-shadow-[0_0_4px_rgba(251,191,36,0.65)]'
                }
                aria-hidden="true"
              />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Logout button positioned at the bottom of the sidebar */}
      <div className="mt-auto pt-6 pb-6 mx-auto w-[200px]">
        <button
          onClick={() => {
            if (onClose) onClose();
            logoutMutation.mutate();
          }}
          disabled={logoutMutation.isPending}
          className="w-full flex items-center gap-[10px] px-[14px] py-[9px] text-[14px] font-medium text-red-400 hover:text-red-300 hover:bg-red-950/40 border border-red-900/40 rounded-[6px] transition-colors"
          title="Logout"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          <span>{logoutMutation.isPending ? 'Logging out...' : 'Logout'}</span>
        </button>
      </div>
    </aside>
  );
}

