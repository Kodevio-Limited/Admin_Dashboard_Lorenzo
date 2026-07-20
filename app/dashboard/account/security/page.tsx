'use client';

import Header from '@/components/layout/Header';
import AccountNav from '@/components/account/AccountNav';
import SecurityForm from '@/components/account/SecurityForm';

export default function SecurityPage() {
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
          <SecurityForm />
        </div>
      </div>
    </>
  );
}
