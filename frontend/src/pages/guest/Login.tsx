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
import { validateRequired } from '../../utils/validation';
import loginPhoto from '../../assets/images/loginPhoto.jpg';

const loginSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
  rememberMe: z.boolean(),
});

type LoginFormData = z.infer<typeof loginSchema>;

export const Login: React.FC = () => {
  const { login } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { rememberMe: true },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data.username, data.password, data.rememberMe);
      toast.success('Welcome back!');
      navigate(PATHS.app.dashboard, { replace: true });
    } catch {
      toast.error('Invalid username or password. Try user/user or admin/admin.');
    }
  };

  return (
      <div className="relative flex min-h-screen w-full">
        <div className="hidden md:flex md:w-1/2 flex-shrink-0 relative">
          <div className="absolute top-6 left-6 z-20 text-text-primary text-2xl font-bold">
            ClubHub
          </div>
          <img src={loginPhoto} alt="Login" className="object-cover w-full h-screen" />
        </div>

        <div className="flex-1 flex items-center justify-center bg-bg-primary p-6 sm:p-8">
          <div className="max-w-md w-full space-y-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-text-primary">
              Welcome Back to ClubHub
            </h2>
            <p className="text-text-secondary">Please log in to your account</p>

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
                  autoComplete="current-password"
                  disabled={isSubmitting}
                  error={errors.password?.message}
                  {...register('password')}
              />

              <div className="flex justify-between items-center text-sm">
                <label className="flex items-center gap-2 text-text-secondary cursor-pointer">
                  <input
                      type="checkbox"
                      className="accent-brand-orange"
                      {...register('rememberMe')}
                  />
                  Remember me
                </label>
              </div>

              <Button type="submit" variant="primary" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? 'Signing in...' : 'Log In'}
              </Button>
            </form>

            <p className="text-text-secondary text-center mt-6">
              No account?{' '}
              <Link to={PATHS.public.register} className="text-brand-orange hover:underline font-semibold">
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
  );
};