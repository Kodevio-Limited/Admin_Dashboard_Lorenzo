'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useForgotPassword } from '@/hooks/api/useAuth';
import { Input } from '@/components/shared/Input';
import { Button } from '@/components/shared/Button';

const envelopeIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#989898" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const forgotPasswordSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
  const [submittedEmail, setSubmittedEmail] = useState('');
  const forgotPasswordMutation = useForgotPassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: '' },
  });

  const onSubmit = (data: ForgotPasswordFormData) => {
    setSubmittedEmail(data.email);
    forgotPasswordMutation.mutate(data);
  };

  return (
    <div className="min-h-screen bg-[#000B03] flex flex-col lg:flex-row relative">
      {/* Mobile: full-screen background image with dark overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center lg:hidden"
        style={{ backgroundImage: 'url(/assets/reset.png)' }}
      />
      <div className="absolute inset-0 bg-black/75 lg:hidden" />

      {/* Desktop: left side hero image */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden min-h-screen flex-col justify-end p-12 xl:p-16">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'url(/assets/reset.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
        <div className="relative z-10 max-w-lg space-y-3">
          <span className="text-xs font-bold tracking-widest text-[#D1A736] uppercase flex items-center gap-2">
            <span className="w-2 h-0.5 bg-[#D1A736]" />
            Nexus Admin Security
          </span>
          <h2 className="text-3xl xl:text-4xl font-bold text-white leading-tight">
            Account Recovery
          </h2>
          <p className="text-sm xl:text-base text-white/80 leading-relaxed">
            Securely reset your administrator account credentials.
          </p>
        </div>
      </div>

      {/* Right side form */}
      <div className="flex-1 flex items-center justify-center px-6 sm:px-12 lg:px-16 xl:px-24 relative z-10 py-12 lg:py-0">
        <div className="w-full max-w-[460px] bg-[#141414]/90 lg:bg-transparent backdrop-blur-sm lg:backdrop-blur-none rounded-[24px] p-8 sm:p-10 lg:p-0">
          <div className="mb-8 text-center flex flex-col items-center">
            <div className="mb-4">
              <Image
                src="/assets/sidebar-logo.png"
                alt="Nexus Logo"
                width={120}
                height={90}
                priority
                unoptimized
                className="object-contain h-16 w-auto drop-shadow-md"
              />
            </div>
            <h1 className="text-3xl sm:text-[36px] font-bold text-white leading-tight mb-2.5">
              Reset Password
            </h1>
            <p className="text-dark-200 text-sm sm:text-[15px]">
              Enter the email associated with your account, and we&apos;ll send you a secure reset link.
            </p>
          </div>

          <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
            {forgotPasswordMutation.isSuccess && (
              <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-500/50 text-emerald-200 text-sm flex items-start gap-3 animate-in fade-in slide-in-from-top-2">
                <svg className="w-5 h-5 shrink-0 mt-0.5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <div className="flex-1">
                  <p className="font-semibold text-white">Reset Link Sent</p>
                  <p className="text-[13px] text-emerald-200/90 mt-0.5 leading-relaxed">
                    If an account exists for {submittedEmail}, a password reset link has been dispatched to your inbox.
                  </p>
                </div>
              </div>
            )}

            {forgotPasswordMutation.isError && (
              <div className="p-3.5 bg-red-950/60 border border-red-500/50 rounded-2xl flex items-start gap-3 text-red-200 text-sm animate-in fade-in">
                <svg className="w-5 h-5 text-red-400 shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-red-100 text-xs uppercase tracking-wider">Request Failed</p>
                  <p className="text-xs text-red-200/90 mt-0.5 leading-relaxed break-words">
                    {forgotPasswordMutation.error?.message || 'Failed to send reset link. Please try again.'}
                  </p>
                </div>
              </div>
            )}

            <Input
              icon={envelopeIcon}
              label="Registered Email Address"
              type="email"
              placeholder="Enter your email..."
              autoComplete="email"
              error={errors.email?.message}
              {...register('email')}
            />

            <Button
              variant="gold"
              size="lg"
              className="w-full mt-2 !rounded-full !py-3.5 !text-[15px] font-semibold tracking-wide cursor-pointer transition-all duration-200 hover:brightness-105 active:brightness-95 shadow-md shadow-gold-mid/10"
              type="submit"
              disabled={forgotPasswordMutation.isPending}
            >
              {forgotPasswordMutation.isPending ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  Sending Link...
                </span>
              ) : (
                'Send Reset Link'
              )}
            </Button>

            <div className="flex justify-center mt-2">
              <Link href="/login" className="text-sm text-gold-mid hover:text-gold-start transition-colors font-medium">
                Back to Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
