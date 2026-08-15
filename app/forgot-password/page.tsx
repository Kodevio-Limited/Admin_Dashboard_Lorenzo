'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useForgotPassword } from '@/hooks/api/useAuth';
import { Input } from '@/components/shared/Input';
import { Button } from '@/components/shared/Button';

const forgotPasswordSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
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
    forgotPasswordMutation.mutate(data);
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
          <h1 className="text-2xl font-bold text-white mb-2">Forgot Password?</h1>
          <p className="text-sm text-dark-200">
            Enter your account email address to receive a password reset link.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          <Input
            label="Email Address *"
            type="email"
            placeholder="client@gmail.com"
            error={errors.email?.message}
            {...register('email')}
          />

          <Button
            type="submit"
            variant="gold"
            disabled={forgotPasswordMutation.isPending}
            className="w-full py-3 text-sm font-semibold mt-2 flex items-center justify-center"
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
