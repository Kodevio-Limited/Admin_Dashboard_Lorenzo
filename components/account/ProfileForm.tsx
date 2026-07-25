'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '@/components/shared/Input';
import { Button } from '@/components/shared/Button';
import { useUIStore } from '@/store/uiStore';

const profileSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().min(1, 'Email is required').email('Invalid email'),
  phone: z.string().optional(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export default function ProfileForm() {
  const addToast = useUIStore((s) => s.addToast);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: 'Nexus',
      lastName: 'Admin',
      email: 'admin@nexusproperty.com',
      phone: '+1 (876) 555-0199',
    },
  });

  const onSubmit = async () => {
    await new Promise((r) => setTimeout(r, 500));
    addToast('Profile updated successfully', 'success');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-5">
      <div className="grid grid-cols-2 gap-5">
        <Input label="First Name" error={errors.firstName?.message} {...register('firstName')} />
        <Input label="Last Name" error={errors.lastName?.message} {...register('lastName')} />
      </div>
      <Input label="Email" type="email" error={errors.email?.message} {...register('email')} />
      <Input label="Phone" error={errors.phone?.message} {...register('phone')} />
      <Button variant="gold" type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Saving...' : 'Save Changes'}
      </Button>
    </form>
  );
}
