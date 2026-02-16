import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../context/ToastContext';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { ROUTES } from '../../routes/routes';
import {
  validateRequired,
  validatePassword,
  validatePasswordConfirm,
} from '../../utils/validation';
import registerPhoto from '../../assets/images/loginPhoto.jpg';

export const Register: React.FC = () => {
  const { register } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [errors, setErrors] = useState<{
    username?: string;
    password?: string;
    confirmPassword?: string;
  }>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const usernameErr = validateRequired(username, 'Username');
    const passwordErr = validatePassword(password);
    const confirmErr = validatePasswordConfirm(password, confirmPassword);
    setErrors({
      username: usernameErr || undefined,
      password: passwordErr || undefined,
      confirmPassword: confirmErr || undefined,
    });
    if (usernameErr || passwordErr || confirmErr) return;

    setIsLoading(true);
    try {
      await register(username, password, rememberMe);
      toast.success('Account created successfully!');
      navigate(ROUTES.dashboard, { replace: true });
    } catch {
      toast.error('Registration failed. Please try again.');
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
          src={registerPhoto}
          alt="Register"
          className="object-cover w-full h-screen"
        />
      </div>

      <div className="flex-1 flex items-center justify-center bg-bg-primary p-6 sm:p-8">
        <div className="max-w-md w-full space-y-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-text-primary">
            Welcome to ClubHub
          </h2>
          <p className="text-text-secondary">
            Create your account to join the community
          </p>

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
            <Input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setErrors((prev) => ({ ...prev, password: undefined, confirmPassword: undefined }));
              }}
              error={errors.password}
              autoComplete="new-password"
              disabled={isLoading}
            />
            <div className="space-y-1">
              <Input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setErrors((prev) => ({ ...prev, confirmPassword: undefined }));
                }}
                error={errors.confirmPassword}
                autoComplete="new-password"
                disabled={isLoading}
              />
            </div>
            <p className="text-xs text-text-muted">
              Password must be at least 6 characters.
            </p>
            <label className="flex items-center gap-2 text-text-secondary text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="accent-brand-orange"
              />
              Keep me logged in
            </label>

            <Button
              type="submit"
              variant="primary"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? 'Creating account...' : 'Register'}
            </Button>
          </form>

          <p className="text-text-secondary text-center mt-6">
            Have an account?{' '}
            <Link to={ROUTES.login} className="text-brand-orange hover:underline font-semibold">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
