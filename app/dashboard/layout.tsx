'use client';

import { useEffect } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import Toast from '@/components/layout/Toast';
import { useUIStore } from '@/store/uiStore';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const mobileSidebarOpen = useUIStore((s) => s.mobileSidebarOpen);
  const setMobileSidebar = useUIStore((s) => s.setMobileSidebar);

  useEffect(() => {
    if (mobileSidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileSidebarOpen]);

  return (
    <div className="flex h-screen overflow-hidden bg-bg text-white">
      <div className="hidden lg:block shrink-0">
        <Sidebar />
      </div>
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/70"
            onClick={() => setMobileSidebar(false)}
          />
          <div className="relative h-full max-w-[280px] w-full">
            <Sidebar
              mobileClassName="relative z-10 h-full max-w-[280px] w-full"
              onClose={() => setMobileSidebar(false)}
            />
          </div>
        </div>
      )}
      <main className="flex-1 overflow-y-auto bg-bg scrollbar-thin">
        {children}
      </main>
      <Toast />
    </div>
  );
}
