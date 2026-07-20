'use client';

import { useState } from 'react';
import Header from '@/components/layout/Header';
import AccountNav from '@/components/account/AccountNav';
import { Button } from '@/components/shared/Button';
import { useUIStore } from '@/store/uiStore';

const defaultContent = `This is a placeholder privacy policy. When the full application is connected to a real backend, this page will display the actual privacy policy content.

Information We Collect: We collect information you provide directly to us, such as your name, email address, and any other information you choose to submit.

How We Use Your Information: We use the information we collect to provide, maintain, and improve our services, to communicate with you, and to comply with legal obligations.

Data Security: We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.

This is a placeholder. The final privacy policy will be provided by your legal team.`;

export default function PrivacyPolicyPage() {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(defaultContent);
  const addToast = useUIStore((s) => s.addToast);

  const handleSave = () => {
    setIsEditing(false);
    addToast('Privacy Policy updated successfully', 'success');
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
            <h3 className="text-lg font-semibold text-white">Privacy Policy</h3>
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
