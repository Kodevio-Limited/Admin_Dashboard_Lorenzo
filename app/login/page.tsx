'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useLogin } from '@/hooks/api/useAuth';
import { Input } from '@/components/shared/Input';
import { Button } from '@/components/shared/Button';

const envelopeIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#989898" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const lockIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#989898" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const eyeIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#989898" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const eyeOffIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#989898" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
    <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
    <path d="M6.61 6.61A13.52 13.52 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
    <line x1="2" y1="2" x2="22" y2="22" />
  </svg>
);

const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const loginMutation = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: LoginFormData) => {
    loginMutation.mutate(data);
  };

  return (
    <div className="min-h-screen bg-[#000B03] flex flex-col lg:flex-row relative">
      {/* Mobile: full-screen background image with dark overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center lg:hidden"
        style={{ backgroundImage: 'url(/assets/login.jpg)' }}
      />
      <div className="absolute inset-0 bg-black/75 lg:hidden" />

      {/* Desktop: left side hero image with text overlay */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden min-h-screen flex-col justify-end p-12 xl:p-16">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'url(/assets/login.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        {/* Gradient overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

        {/* Text overlay matching Client Portal */}
        <div className="relative z-10 max-w-lg space-y-3">
          <span className="text-xs font-bold tracking-widest text-[#D1A736] uppercase flex items-center gap-2">
            <span className="w-2 h-0.5 bg-[#D1A736]" />
            Nexus Property Verification
          </span>
          <h2 className="text-3xl xl:text-4xl font-bold text-white leading-tight">
            Jamaica&apos;s Trusted Inspection Partner
          </h2>
          <p className="text-sm xl:text-base text-white/80 leading-relaxed">
            Professional property verification, local representation, and inspection services across Jamaica.
          </p>
        </div>
      </div>

      {/* Right side form */}
      <div className="flex-1 flex items-center justify-center px-6 sm:px-12 lg:px-16 xl:px-24 relative z-10 py-12 lg:py-0">
        <div className="w-full max-w-[460px] bg-[#141414]/90 lg:bg-transparent backdrop-blur-sm lg:backdrop-blur-none rounded-[24px] p-8 sm:p-10 lg:p-0">
          {/* Logo & Header */}
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
            <h1 className="text-2xl sm:text-[32px] font-bold text-white leading-tight mb-2">
              Welcome to Admin Portal
            </h1>
            <p className="text-dark-200 text-sm sm:text-[15px]">
              Sign in to manage clients, properties, reports, and inspections.
            </p>
          </div>

          {/* Inline Error Alert */}
          {loginMutation.isError && (
            <div className="mb-5 p-3.5 bg-red-950/60 border border-red-500/50 rounded-2xl flex items-start gap-3 text-red-200 text-sm animate-in fade-in slide-in-from-top-1 duration-200">
              <svg className="w-5 h-5 text-red-400 shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-red-100 text-xs uppercase tracking-wider">Authentication Error</p>
                <p className="text-xs text-red-200/90 mt-0.5 leading-relaxed break-words">
                  {loginMutation.error?.message || 'Invalid email or password. Please try again.'}
                </p>
              </div>
            </div>
          )}

          <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
            <Input
              icon={envelopeIcon}
              label="Email"
              type="email"
              placeholder="Enter your email..."
              autoComplete="email"
              error={errors.email?.message}
              {...register('email')}
            />

            <div className="flex flex-col gap-1.5">
              <Input
                icon={lockIcon}
                label="Password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                autoComplete="current-password"
                error={errors.password?.message}
                rightElement={
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-dark-200 hover:text-white transition-colors cursor-pointer"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? eyeIcon : eyeOffIcon}
                  </button>
                }
                {...register('password')}
              />
            </div>

            <div className="flex justify-end">
              <Link href="/forgot-password" className="text-[13px] text-gold-mid hover:text-gold-start transition-colors">
                Forgot password?
              </Link>
            </div>

            <Button
              variant="gold"
              size="lg"
              className="w-full mt-2 !rounded-full !py-3.5 !text-[15px] font-semibold tracking-wide cursor-pointer transition-all duration-200 hover:brightness-105 active:brightness-95 shadow-md shadow-gold-mid/10"
              type="submit"
              disabled={loginMutation.isPending}
            >
              {loginMutation.isPending ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  Signing in...
                </span>
              ) : (
                'Secure Login'
              )}
            </Button>
          </form>

          <div className="mt-8 text-center text-xs text-dark-300">
            Nexus PBS Lorenzo Admin Panel &copy; {new Date().getFullYear()}
          </div>
        </div>
      </div>
    </div>
  );
}
