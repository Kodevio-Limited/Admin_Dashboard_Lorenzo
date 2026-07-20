'use client';

import { useState } from 'react';
import Header from '@/components/layout/Header';
import AccountNav from '@/components/account/AccountNav';
import { Button } from '@/components/shared/Button';
import { useUIStore } from '@/store/uiStore';

const defaultContent = `This is a placeholder for terms and conditions. When the full application is connected to a real backend, this page will display the actual terms content.

Acceptance of Terms: By accessing and using this application, you agree to be bound by these terms and conditions. If you do not agree, please do not use the application.

Use License: Permission is granted to temporarily access and use this application for personal or business purposes. This license does not include any rights to modify or copy the software.

Limitation of Liability: In no event shall the application provider be liable for any damages arising out of the use or inability to use this application.

This is a placeholder. The final terms and conditions will be provided by your legal team.`;

export default function TermsPage() {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(defaultContent);
  const addToast = useUIStore((s) => s.addToast);

  const handleSave = () => {
    setIsEditing(false);
    addToast('Terms & Conditions updated successfully', 'success');
  };

  const handleCancel = () => {
    setContent(defaultContent);
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
      <div className="px-6">
        <div className="bg-dark-600 rounded-[8px] p-6 w-full">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Terms &amp; Conditions</h3>
            {!isEditing && (
              <Button
                variant="secondary"
                onClick={() => setIsEditing(true)}
                className="!px-[14px] !py-[7px] !text-[13px] flex items-center gap-[6px]"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15.232 5.232L18.768 8.768L7.5 20.036H3.964V16.5L15.232 5.232Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M13.5 3L17.036 6.536" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                Edit
              </Button>
            )}
          </div>
          {isEditing ? (
            <div className="space-y-4">
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full min-h-[300px] bg-bg border border-dark-400 rounded-[4px] px-4 py-3 text-sm text-white placeholder-dark-200/50 focus:outline-none focus:ring-2 focus:ring-gold-focus/60 focus:border-gold-focus transition-colors resize-y"
              />
              <div className="flex items-center gap-3">
                <Button variant="gold" onClick={handleSave} className="!px-[16px] !py-[8px] !text-[13px]">
                  Save
                </Button>
                <Button variant="secondary" onClick={handleCancel} className="!px-[16px] !py-[8px] !text-[13px]">
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-dark-200 space-y-4 text-sm leading-relaxed whitespace-pre-wrap">
              {content}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
