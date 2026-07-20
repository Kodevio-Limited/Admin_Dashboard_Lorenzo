import Sidebar from '@/components/layout/Sidebar';
import Toast from '@/components/layout/Toast';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden bg-bg text-white">
      <Sidebar />
      <main className="flex-1 overflow-y-auto bg-bg scrollbar-thin">
        {children}
      </main>
      <Toast />
    </div>
  );
}
