'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useResetPassword } from '@/hooks/api/useAuth';
import { Input } from '@/components/shared/Input';
import { Button } from '@/components/shared/Button';

const resetPasswordSchema = z
  .object({
    token: z.string().min(1, 'Token is required'),
    newPassword: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string().min(1, 'Please confirm your new password'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const tokenParam = searchParams.get('token') || '';

  const [showPassword, setShowPassword] = useState(false);
  const resetPasswordMutation = useResetPassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      token: tokenParam,
      newPassword: '',
      confirmPassword: '',
    },
  });

  const onSubmit = (data: ResetPasswordFormData) => {
    resetPasswordMutation.mutate({
      token: data.token,
      newPassword: data.newPassword,
    });
  };

  return (
    <div className="min-h-screen w-full bg-dark-bg flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md bg-dark-600 border border-dark-400/80 rounded-2xl p-8 shadow-2xl relative z-10 backdrop-blur-md">
        {/* Header */}
        <div className="flex flex-col items-center mb-8 text-center">
          <div className="mb-4">
            <Image
              src="/assets/sidebar-logo.png"
              alt="Lorenzo Logo"
              width={140}
              height={100}
              priority
              unoptimized
              className="object-contain h-16 w-auto"
            />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Reset Password</h1>
          <p className="text-sm text-dark-200">
            Enter your reset token and new password.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          <Input
            label="Reset Token *"
            type="text"
            placeholder="Paste reset token here"
            error={errors.token?.message}
            {...register('token')}
          />

          <div className="relative">
            <Input
              label="New Password *"
              type={showPassword ? 'text' : 'password'}
              placeholder="Minimum 8 characters"
              error={errors.newPassword?.message}
              {...register('newPassword')}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-[38px] text-dark-200 hover:text-white transition-colors"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24M1 1l22 22" />
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              )}
            </button>
          </div>

          <Input
            label="Confirm New Password *"
            type="password"
            placeholder="Confirm new password"
            error={errors.confirmPassword?.message}
            {...register('confirmPassword')}
          />

          <Button
            type="submit"
            variant="gold"
            disabled={resetPasswordMutation.isPending}
            className="w-full py-3 text-sm font-semibold mt-2 flex items-center justify-center"
          >
            {resetPasswordMutation.isPending ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                Resetting Password...
              </span>
            ) : (
              'Reset Password'
            )}
          </Button>

          <div className="flex items-center justify-center mt-4">
            <Link
              href="/login"
              className="text-xs text-dark-200 hover:text-white transition-colors flex items-center gap-1"
            >
              &larr; Back to Sign In
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
