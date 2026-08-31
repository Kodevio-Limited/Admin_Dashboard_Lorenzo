'use client';

import Header from '@/components/layout/Header';
import AccountNav from '@/components/account/AccountNav';
import SecurityForm from '@/components/account/SecurityForm';

export default function SecurityPage() {
  return (
    <>
      <Header />
      <div className="px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10 lg:pt-[50px] pb-4">
        <div className="flex flex-col items-start gap-[10px]">
          <h2 className="text-[20px] sm:text-[24px] font-medium text-white leading-[1.3]">User Account</h2>
        </div>
      </div>
      <div className="px-4 sm:px-6 lg:px-8 pb-4">
        <AccountNav />
      </div>
      <div className="px-4 sm:px-6 lg:px-8 pb-6">
        <div className="bg-dark-600 rounded-[8px] p-4 sm:p-6 w-full">
          <SecurityForm />
        </div>
      </div>
    </>
  );
}
