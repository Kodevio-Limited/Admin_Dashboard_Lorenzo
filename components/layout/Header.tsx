'use client';

import Image from 'next/image';

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

  return (
    <div className="bg-dark-600">
      <div className="flex items-center justify-between px-8 pt-[16px] pb-[12px]">
        <div className="flex flex-col items-start gap-[2px]">
          <h1 className="text-[20px] font-medium text-white leading-[1.3]">
            Good Morning Matt
          </h1>
          <span className="text-[13px] font-normal text-white/70 leading-[1.3]">
            {dateStr}
          </span>
        </div>
        <div className="flex items-center gap-[10px]">
          <Image
            src="/assets/avatar.png"
            alt="Admin avatar"
            width={42}
            height={42}
            className="rounded-full object-cover"
          />
          <div className="flex flex-col gap-[2px]">
            <span
              className="text-white leading-[1.2]"
              style={{
                fontFamily: 'Satoshi, Helvetica Neue, Arial, sans-serif',
                fontSize: '15px',
                fontWeight: 500,
              }}
            >
              Sarah Jessie
            </span>
            <span
              className="text-dark-100 leading-[1.2]"
              style={{
                fontFamily: 'Satoshi, Helvetica Neue, Arial, sans-serif',
                fontSize: '11px',
                fontWeight: 500,
              }}
            >
              Sarah@gmail.com
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
