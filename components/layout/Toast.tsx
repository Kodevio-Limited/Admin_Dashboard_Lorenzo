'use client';

import { useUIStore } from '@/store/uiStore';

export default function Toast() {
  const toasts = useUIStore((s) => s.toasts);
  const removeToast = useUIStore((s) => s.removeToast);

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-5 right-5 z-[9999] flex flex-col gap-2.5 max-w-md w-full pointer-events-none px-4 sm:px-0">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto px-4 py-3.5 rounded-xl shadow-2xl text-sm flex items-start gap-3 backdrop-blur-lg border transition-all duration-300 animate-in slide-in-from-top-2 fade-in ${
            toast.type === 'success'
              ? 'bg-[#0f2316]/95 border-emerald-500/50 text-emerald-100 shadow-emerald-950/40'
              : toast.type === 'error'
                ? 'bg-[#290d0d]/95 border-red-500/50 text-red-100 shadow-red-950/40'
                : 'bg-[#1b1b1b]/95 border-amber-500/40 text-amber-100 shadow-black/60'
          }`}
        >
          {toast.type === 'success' && (
            <svg className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          )}
          {toast.type === 'error' && (
            <svg className="w-5 h-5 text-red-400 shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          )}
          {toast.type === 'info' && (
            <svg className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          )}

          <div className="flex-1 font-medium text-[13px] leading-snug">
            {toast.message}
          </div>

          <button
            onClick={() => removeToast(toast.id)}
            className="text-white/60 hover:text-white transition-colors p-0.5 rounded -mr-1 -mt-0.5"
            aria-label="Dismiss notification"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M11 3L3 11M3 3l8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      ))}
    </div>
  );
}
