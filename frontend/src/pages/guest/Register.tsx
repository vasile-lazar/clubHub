import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '../../hooks';
import { useToast } from '../../context/ToastContext';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { PATHS } from '../../routes/paths';
import registerPhoto from '../../assets/images/loginPhoto.jpg';

const registerSchema = z
    .object({
      username: z.string().min(1, 'Username is required'),
      password: z.string().min(6, 'Password must be at least 6 characters'),
      confirmPassword: z.string().min(1, 'Please confirm your password'),
      rememberMe: z.boolean(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: 'Passwords do not match',
      path: ['confirmPassword'],
    });

type RegisterFormData = z.infer<typeof registerSchema>;

export const Register: React.FC = () => {
  const { register: registerUser } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: { rememberMe: true },
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await registerUser(data.username, data.password, data.rememberMe);
      toast.success('Account created successfully!');
      navigate(PATHS.app.dashboard, { replace: true });
    } catch {
      toast.error('Registration failed. Please try again.');
    }
  };

  return (
      <div className="relative flex min-h-screen w-full">
        <div className="hidden md:flex md:w-1/2 flex-shrink-0 relative">
          <div className="absolute top-6 left-6 z-20 text-text-primary text-2xl font-bold">
            ClubHub
          </div>
          <img src={registerPhoto} alt="Register" className="object-cover w-full h-screen" />
        </div>

        <div className="flex-1 flex items-center justify-center bg-bg-primary p-6 sm:p-8">
          <div className="max-w-md w-full space-y-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-text-primary">
              Welcome to ClubHub
            </h2>
            <p className="text-text-secondary">Create your account to join the community</p>

            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <Input
                  type="text"
                  placeholder="Username"
                  autoComplete="username"
                  disabled={isSubmitting}
                  error={errors.username?.message}
                  {...register('username')}
              />
              <Input
                  type="password"
                  placeholder="Password"
                  autoComplete="new-password"
                  disabled={isSubmitting}
                  error={errors.password?.message}
                  {...register('password')}
              />
              <Input
                  type="password"
                  placeholder="Confirm Password"
                  autoComplete="new-password"
                  disabled={isSubmitting}
                  error={errors.confirmPassword?.message}
                  {...register('confirmPassword')}
              />

              <p className="text-xs text-text-muted">Password must be at least 6 characters.</p>

              <label className="flex items-center gap-2 text-text-secondary text-sm cursor-pointer">
                <input
                    type="checkbox"
                    className="accent-brand-orange"
                    {...register('rememberMe')}
                />
                Keep me logged in
              </label>

              <Button type="submit" variant="primary" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? 'Creating account...' : 'Register'}
              </Button>
            </form>

            <p className="text-text-secondary text-center mt-6">
              Have an account?{' '}
              <Link to={PATHS.public.login} className="text-brand-orange hover:underline font-semibold">
                Log In
              </Link>
            </p>
          </div>
        </div>
      </div>
  );
};