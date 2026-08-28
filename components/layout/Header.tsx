'use client';

import { useUIStore } from '@/store/uiStore';
import { useGetSelfProfile } from '@/hooks/api/useUser';

export default function Header() {
  const today = new Date();
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];
  const dayName = days[today.getDay()];
  const day = today.getDate();
  const month = months[today.getMonth()];
  const year = today.getFullYear();
  const dateStr = `${dayName}, ${day} ${month} ${year}`;

  const toggleMobileSidebar = useUIStore((s) => s.toggleMobileSidebar);
  const { data: profile } = useGetSelfProfile();

  const adminName = profile?.firstName
    ? `${profile.firstName} ${profile.lastName || ''}`.trim()
    : 'Nexus Admin';

  const adminEmail = profile?.email || 'info@nexuspbs.net';

  const initials = profile?.firstName
    ? `${profile.firstName[0]}${profile.lastName ? profile.lastName[0] : ''}`.toUpperCase()
    : 'NA';

  return (
    <header className="bg-[#141414] border-b border-dark-400/40 sticky top-0 z-30 backdrop-blur-md">
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3.5 gap-3">
        {/* Left Side: Mobile toggle & Greeting */}
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={toggleMobileSidebar}
            className="lg:hidden text-dark-200 hover:text-white transition-colors p-1.5 -ml-1.5 rounded-lg hover:bg-white/5"
            aria-label="Toggle sidebar"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>

          <div className="flex flex-col items-start gap-0.5 min-w-0">
            <h1 className="text-base sm:text-lg lg:text-xl font-semibold text-white leading-tight truncate">
              Welcome, {adminName}
            </h1>
            <span className="text-xs text-dark-200 font-normal leading-tight truncate">
              {dateStr}
            </span>
          </div>
        </div>

        {/* Right Side: Admin Profile Avatar */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="flex items-center gap-2.5 sm:gap-3 bg-[#1E1E1E]/80 border border-dark-400/50 rounded-full py-1.5 px-2.5 sm:px-3">
            <div
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-[#1A1100] text-xs sm:text-sm font-bold shrink-0 shadow-sm shadow-amber-500/20"
              style={{ background: 'linear-gradient(180deg, #FCE688 0%, #D1A736 50%, #946E18 100%)' }}
              aria-label="Admin Avatar"
            >
              {initials}
            </div>
            <div className="hidden sm:flex flex-col min-w-0 text-left pr-1">
              <span className="text-[13px] font-medium text-white leading-snug truncate max-w-[140px]">
                {adminName}
              </span>
              <span className="text-[11px] text-dark-200 leading-none truncate max-w-[140px]">
                {adminEmail}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
