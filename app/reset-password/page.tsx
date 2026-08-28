'use client';

import { useState, useEffect, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useResetPassword } from '@/hooks/api/useAuth';
import { Input } from '@/components/shared/Input';
import { Button } from '@/components/shared/Button';

const lockIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#989898" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const keyIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#989898" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m21 2-2 2m-1.5 1.5L12 11a5 5 0 1 0 4 4l5.5-5.5v-3H19v-2.5h-2.5V4Z" />
    <circle cx="7" cy="17" r="1" />
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

function ResetPasswordContent() {
  const searchParams = useSearchParams();
  const tokenFromUrl = searchParams.get('token') || '';

  const [token, setToken] = useState(tokenFromUrl);
  const [pass1, setPass1] = useState('');
  const [pass2, setPass2] = useState('');
  const [showPass1, setShowPass1] = useState(false);
  const [showPass2, setShowPass2] = useState(false);
  const [validationError, setValidationError] = useState('');

  const router = useRouter();
  const resetPasswordMutation = useResetPassword();

  useEffect(() => {
    if (tokenFromUrl) {
      setToken(tokenFromUrl);
    }
  }, [tokenFromUrl]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError('');

    if (!token) {
      setValidationError('Reset token is required. Please check your reset link or enter the token.');
      return;
    }

    if (!pass1 || !pass2) {
      setValidationError('Please enter and confirm your new password.');
      return;
    }

    if (pass1.length < 8) {
      setValidationError('Password must be at least 8 characters long.');
      return;
    }

    if (pass1 !== pass2) {
      setValidationError('Passwords do not match.');
      return;
    }

    resetPasswordMutation.mutate(
      {
        token,
        newPassword: pass1,
      },
      {
        onSuccess: () => {
          setTimeout(() => {
            router.push('/login');
          }, 1500);
        },
      }
    );
  };

  const errorMessage = validationError || resetPasswordMutation.error?.message;

  return (
    <div className="min-h-screen bg-[#000B03] flex flex-col lg:flex-row relative">
      {/* Mobile: full-screen background image with dark overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center lg:hidden"
        style={{ backgroundImage: 'url(/assets/set-new-pass.png)' }}
      />
      <div className="absolute inset-0 bg-black/75 lg:hidden" />

      {/* Desktop: left side hero image */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden min-h-screen flex-col justify-end p-12 xl:p-16">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'url(/assets/set-new-pass.png)',
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
            Password Update
          </h2>
          <p className="text-sm xl:text-base text-white/80 leading-relaxed">
            Choose a new secure password for your administrator account.
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
              Set New Password
            </h1>
            <p className="text-dark-200 text-sm sm:text-[15px]">
              Please choose a strong password to secure your Nexus account.
            </p>
          </div>

          {errorMessage && (
            <div className="mb-5 p-3.5 bg-red-950/60 border border-red-500/50 rounded-2xl flex items-start gap-3 text-red-200 text-sm animate-in fade-in">
              <svg className="w-5 h-5 text-red-400 shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-red-100 text-xs uppercase tracking-wider">Update Failed</p>
                <p className="text-xs text-red-200/90 mt-0.5 leading-relaxed break-words">
                  {errorMessage}
                </p>
              </div>
            </div>
          )}

          {resetPasswordMutation.isSuccess && (
            <div className="mb-5 p-4 rounded-2xl bg-emerald-950/60 border border-emerald-500/50 text-emerald-200 text-sm flex items-start gap-3 animate-in fade-in">
              <svg className="w-5 h-5 shrink-0 mt-0.5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <div className="flex-1">
                <p className="font-semibold text-white">Password Changed Successfully</p>
                <p className="text-[13px] text-emerald-200/90 mt-0.5 leading-relaxed">
                  Your password has been updated. Redirecting to login...
                </p>
              </div>
            </div>
          )}

          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            {!tokenFromUrl && (
              <Input
                icon={keyIcon}
                label="Reset Token"
                type="text"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                placeholder="Enter or paste reset token..."
                required
              />
            )}

            <Input
              icon={lockIcon}
              label="New Password"
              type={showPass1 ? 'text' : 'password'}
              value={pass1}
              onChange={(e) => setPass1(e.target.value)}
              placeholder="••••••••"
              autoComplete="new-password"
              required
              rightElement={
                <button
                  type="button"
                  onClick={() => setShowPass1(!showPass1)}
                  className="text-dark-200 hover:text-white transition-colors cursor-pointer"
                  aria-label={showPass1 ? 'Hide password' : 'Show password'}
                >
                  {showPass1 ? eyeIcon : eyeOffIcon}
                </button>
              }
            />

            <Input
              icon={lockIcon}
              label="Confirm New Password"
              type={showPass2 ? 'text' : 'password'}
              value={pass2}
              onChange={(e) => setPass2(e.target.value)}
              placeholder="••••••••"
              autoComplete="new-password"
              required
              rightElement={
                <button
                  type="button"
                  onClick={() => setShowPass2(!showPass2)}
                  className="text-dark-200 hover:text-white transition-colors cursor-pointer"
                  aria-label={showPass2 ? 'Hide password' : 'Show password'}
                >
                  {showPass2 ? eyeIcon : eyeOffIcon}
                </button>
              }
            />

            <Button
              variant="gold"
              size="lg"
              className="w-full mt-2 !rounded-full !py-3.5 !text-[15px] font-semibold tracking-wide cursor-pointer transition-all duration-200 hover:brightness-105 active:brightness-95 shadow-md shadow-gold-mid/10"
              type="submit"
              disabled={resetPasswordMutation.isPending}
            >
              {resetPasswordMutation.isPending ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  Resetting Password...
                </span>
              ) : (
                'Set New Password'
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

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-bg flex items-center justify-center text-dark-200">Loading...</div>}>
      <ResetPasswordContent />
    </Suspense>
  );
}
