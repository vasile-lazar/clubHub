import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../context/ToastContext';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { ROUTES } from '../../routes/routes';
import { validateRequired } from '../../utils/validation';
import loginPhoto from '../../assets/images/loginPhoto.jpg';

export const Login: React.FC = () => {
  const { login } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [errors, setErrors] = useState<{ username?: string; password?: string }>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const usernameErr = validateRequired(username, 'Username');
    const passwordErr = validateRequired(password, 'Password');
    setErrors({ username: usernameErr || undefined, password: passwordErr || undefined });
    if (usernameErr || passwordErr) return;

    setIsLoading(true);
    try {
      await login(username, password, rememberMe);
      toast.success('Welcome back!');
      navigate(ROUTES.dashboard, { replace: true });
    } catch {
      toast.error('Invalid username or password. Try user/user or admin/admin.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen w-full">
      <div className="hidden md:flex md:w-1/2 flex-shrink-0 relative">
        <div className="absolute top-6 left-6 z-20 text-text-primary text-2xl font-bold">
          ClubHub
        </div>
        <img
          src={loginPhoto}
          alt="Login"
          className="object-cover w-full h-screen"
        />
      </div>

      <div className="flex-1 flex items-center justify-center bg-bg-primary p-6 sm:p-8">
        <div className="max-w-md w-full space-y-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-text-primary">
            Welcome Back to ClubHub
          </h2>
          <p className="text-text-secondary">Please log in to your account</p>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <Input
              type="text"
              name="username"
              placeholder="Username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setErrors((prev) => ({ ...prev, username: undefined }));
              }}
              error={errors.username}
              autoComplete="username"
              disabled={isLoading}
            />
            <div className="space-y-1">
              <Input
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrors((prev) => ({ ...prev, password: undefined }));
                }}
                error={errors.password}
                autoComplete="current-password"
                disabled={isLoading}
              />
            </div>

            <div className="flex justify-between items-center text-sm">
              <label className="flex items-center gap-2 text-text-secondary cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="accent-brand-orange"
                />
                Remember me
              </label>
            </div>

            <Button
              type="submit"
              variant="primary"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Log In'}
            </Button>
          </form>

          <p className="text-text-secondary text-center mt-6">
            No account?{' '}
            <Link to={ROUTES.register} className="text-brand-orange hover:underline font-semibold">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
