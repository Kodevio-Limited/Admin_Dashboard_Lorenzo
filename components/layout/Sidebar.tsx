'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useLogout } from '@/hooks/api/useAuth';

interface SidebarProps {
  mobileClassName?: string;
  onClose?: () => void;
}

interface NavItem {
  label: string;
  href: string;
  icon: (active: boolean) => React.ReactNode;
}

const navItems: NavItem[] = [
  {
    label: 'Overview',
    href: '/dashboard/overview',
    icon: () => (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
  },
  {
    label: 'Clients',
    href: '/dashboard/clients',
    icon: () => (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    label: 'Properties',
    href: '/dashboard/properties',
    icon: () => (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
        <path d="M3 21h18" />
        <path d="M5 21V7l8-4v18" />
        <path d="M19 21V11l-6-4" />
        <path d="M9 9h.01" />
        <path d="M9 13h.01" />
        <path d="M9 17h.01" />
      </svg>
    ),
  },
  {
    label: 'Service Plans',
    href: '/dashboard/service-plans',
    icon: () => (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
  {
    label: 'Reports',
    href: '/dashboard/reports',
    icon: () => (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    ),
  },
  {
    label: 'Media',
    href: '/dashboard/media',
    icon: () => (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <polyline points="21 15 16 10 5 21" />
      </svg>
    ),
  },
  {
    label: 'Contact Requests',
    href: '/dashboard/contact-requests',
    icon: () => (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    label: 'Notifications',
    href: '/dashboard/notifications',
    icon: () => (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
      </svg>
    ),
  },
  {
    label: 'User Account',
    href: '/dashboard/account/profile',
    icon: () => (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
];

export default function Sidebar({ mobileClassName, onClose }: SidebarProps) {
  const pathname = usePathname();
  const logoutMutation = useLogout();

  const isActive = (href: string) => {
    if (href === '/dashboard/account/profile') {
      return pathname.startsWith('/dashboard/account');
    }
    return pathname === href || (href !== '/dashboard/overview' && pathname.startsWith(href));
  };

  return (
    <aside
      className={`w-[250px] bg-[#141414] border-r border-dark-400/30 flex flex-col shrink-0 h-screen max-h-full overflow-y-auto scrollbar-thin ${
        mobileClassName ?? ''
      }`}
    >
      {onClose && (
        <div className="flex justify-end px-4 pt-4">
          <button
            onClick={onClose}
            className="text-dark-200 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/5"
            aria-label="Close sidebar"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M15 5L5 15M5 5l10 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      )}

      {/* Brand Header */}
      <div className="flex flex-col items-center pt-6 pb-5 px-4">
        <Link href="/dashboard/overview" onClick={onClose} className="flex flex-col items-center group">
          <Image
            src="/assets/sidebar-logo.png"
            alt="Nexus Logo"
            width={110}
            height={130}
            priority
            unoptimized
            className="object-contain w-[80px] h-[95px] sm:w-[90px] sm:h-[105px] transition-transform group-hover:scale-105"
          />
          <span className="text-[10px] font-bold tracking-[0.24em] text-[#D1A736] uppercase mt-2 select-none drop-shadow-[0_0_8px_rgba(209,167,54,0.3)]">
            Admin Portal
          </span>
        </Link>
      </div>

      {/* Navigation List */}
      <nav className="flex flex-col gap-1.5 px-3.5 my-1">
        {navItems.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={`flex items-center gap-3 px-3.5 py-2.5 text-[13.5px] font-medium leading-tight rounded-xl transition-all ${
                active
                  ? 'text-[#1A1100] font-semibold shadow-md shadow-amber-500/10'
                  : 'text-dark-200 hover:text-white hover:bg-white/[0.06]'
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
              <span className={active ? 'text-[#1A1100]' : 'text-[#D1A736]/80'}>
                {item.icon(active)}
              </span>
              <span className="truncate">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="flex-1" />

      {/* Logout button at bottom */}
      <div className="p-4 mt-auto border-t border-dark-400/20">
        <button
          onClick={() => {
            if (onClose) onClose();
            logoutMutation.mutate();
          }}
          disabled={logoutMutation.isPending}
          className="w-full flex items-center justify-center gap-2.5 px-3.5 py-2.5 text-xs font-semibold text-red-400 hover:text-red-300 hover:bg-red-950/30 border border-red-900/30 rounded-xl transition-all cursor-pointer disabled:opacity-50"
          title="Logout"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          <span>{logoutMutation.isPending ? 'Logging out...' : 'Log Out'}</span>
        </button>
      </div>
    </aside>
  );
}
