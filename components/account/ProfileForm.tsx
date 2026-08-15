'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '@/components/shared/Input';
import { Button } from '@/components/shared/Button';
import { useGetSelfProfile, useUpdateSelfProfile } from '@/hooks/api/useUser';
import type { UpdateUserProfileInput } from '@/lib/api/services/user.service';

const profileSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().optional(),
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  phone: z.string().optional(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export default function ProfileForm() {
  const { data: profile, isLoading, isError, error } = useGetSelfProfile();
  const updateProfileMutation = useUpdateSelfProfile();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
    },
  });

  useEffect(() => {
    if (profile) {
      reset({
        firstName: profile.firstName || '',
        lastName: profile.lastName || '',
        email: profile.email || '',
        phone: profile.phone || '',
      });
    }
  }, [profile, reset]);

  const onSubmit = async (data: ProfileFormData) => {
    const payload: UpdateUserProfileInput = {
      firstName: data.firstName,
      email: data.email,
    };
    if (data.lastName !== undefined) payload.lastName = data.lastName;
    if (data.phone !== undefined) payload.phone = data.phone;

    await updateProfileMutation.mutateAsync(payload);
  };

  if (isLoading) {
    return (
      <div className="space-y-4 animate-pulse">
        <div className="h-10 bg-dark-400 rounded w-full" />
        <div className="h-10 bg-dark-400 rounded w-full" />
        <div className="h-10 bg-dark-400 rounded w-full" />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-5">
      {isError && (
        <div className="p-4 bg-red-950/40 border border-red-800/50 rounded text-red-400 text-sm">
          Failed to load profile: {error?.message || 'Unknown error'}
        </div>
      )}

      <div className="grid grid-cols-2 gap-5">
        <Input label="First Name *" error={errors.firstName?.message} {...register('firstName')} />
        <Input label="Last Name" error={errors.lastName?.message} {...register('lastName')} />
      </div>
      <Input label="Email Address *" type="email" error={errors.email?.message} {...register('email')} />
      <Input label="Phone Number" error={errors.phone?.message} {...register('phone')} />
      <Button
        variant="gold"
        type="submit"
        disabled={isSubmitting || updateProfileMutation.isPending}
      >
        {isSubmitting || updateProfileMutation.isPending ? 'Saving...' : 'Save Changes'}
      </Button>
    </form>
  );
}
