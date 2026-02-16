import React from 'react';
import { Button } from '../components/ui/Button';
import { ROUTES } from '../routes/routes';

export const NotFound: React.FC = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-bg-primary px-4">
    <h1 className="text-6xl font-bold text-text-primary">404</h1>
    <p className="text-xl text-text-secondary mt-2 text-center">
      Page not found
    </p>
    <p className="text-text-muted mt-1 text-center max-w-md">
      The page you are looking for does not exist or has been moved.
    </p>
    <div className="mt-8 flex flex-col sm:flex-row gap-4">
      <Button type="internal" to={ROUTES.landing} variant="primary">
        Go Home
      </Button>
      <Button type="internal" to={ROUTES.login} variant="secondary">
        Log In
      </Button>
    </div>
  </div>
);
