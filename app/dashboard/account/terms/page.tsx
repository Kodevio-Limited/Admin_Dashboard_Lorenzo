'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import AccountNav from '@/components/account/AccountNav';
import { Button } from '@/components/shared/Button';
import { useGetTermsAndConditions, useUpdateTermsAndConditions } from '@/hooks/api/useSettings';

export default function TermsPage() {
  const { data, isLoading, isError, error } = useGetTermsAndConditions();
  const updateMutation = useUpdateTermsAndConditions();

  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState('');

  useEffect(() => {
    if (data?.content || data?.value) {
      setContent(data.content || data.value || '');
    }
  }, [data]);

  const handleSave = async () => {
    await updateMutation.mutateAsync(content);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setContent(data?.content || data?.value || '');
    setIsEditing(false);
  };

  return (
    <>
      <Header />
      <div className="px-8 pt-[50px] pb-[14px]">
        <div className="flex flex-col items-start gap-[10px]">
          <h2 className="text-[24px] font-medium text-white leading-[1.3]">User Account</h2>
        </div>
      </div>
      <div className="px-8 pb-[20px]">
        <AccountNav />
      </div>
      <div className="px-6 pb-6">
        <div className="bg-dark-600 rounded-[8px] p-6 w-full">
          {isError && (
            <div className="mb-4 p-4 bg-red-950/40 border border-red-800/50 rounded text-red-400 text-sm">
              Failed to load terms &amp; conditions: {error?.message || 'Unknown error'}
            </div>
          )}

          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Terms &amp; Conditions</h3>
            {!isEditing && (
              <Button
                variant="secondary"
                onClick={() => setIsEditing(true)}
                className="!px-[14px] !py-[7px] !text-[13px] flex items-center gap-[6px]"
                disabled={isLoading}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15.232 5.232L18.768 8.768L7.5 20.036H3.964V16.5L15.232 5.232Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M13.5 3L17.036 6.536" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                Edit
              </Button>
            )}
          </div>

          {isLoading ? (
            <div className="space-y-3 animate-pulse">
              <div className="h-4 bg-dark-400 rounded w-full" />
              <div className="h-4 bg-dark-400 rounded w-3/4" />
              <div className="h-4 bg-dark-400 rounded w-5/6" />
            </div>
          ) : isEditing ? (
            <div className="space-y-4">
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full min-h-[300px] bg-bg border border-dark-400 rounded-[4px] px-4 py-3 text-sm text-white placeholder-dark-200/50 focus:outline-none focus:ring-2 focus:ring-gold-focus/60 focus:border-gold-focus transition-colors resize-y"
                placeholder="Enter terms and conditions text..."
              />
              <div className="flex items-center gap-3">
                <Button
                  variant="gold"
                  onClick={handleSave}
                  disabled={updateMutation.isPending}
                  className="!px-[16px] !py-[8px] !text-[13px]"
                >
                  {updateMutation.isPending ? 'Saving...' : 'Save'}
                </Button>
                <Button
                  variant="secondary"
                  onClick={handleCancel}
                  disabled={updateMutation.isPending}
                  className="!px-[16px] !py-[8px] !text-[13px]"
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-dark-200 space-y-4 text-sm leading-relaxed whitespace-pre-wrap">
              {content || 'No terms & conditions content available.'}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
