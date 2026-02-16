import React from 'react';
import { ShieldExclamationIcon } from '@heroicons/react/24/outline';
import { Button } from '../components/ui/Button';
import { ROUTES } from '../routes/routes';

export const Forbidden: React.FC = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-bg-primary px-4">
    <ShieldExclamationIcon className="h-24 w-24 text-text-warning mb-4" />
    <h1 className="text-6xl font-bold text-text-primary">403</h1>
    <p className="text-xl text-text-secondary mt-2 text-center">Access Forbidden</p>
    <p className="text-text-muted mt-1 text-center max-w-md">
      You do not have permission to access this page.
    </p>
    <div className="mt-8 flex flex-col sm:flex-row gap-4">
      <Button type="internal" to={ROUTES.dashboard} variant="primary">
        Go to Dashboard
      </Button>
      <Button type="internal" to={ROUTES.landing} variant="secondary">
        Go Home
      </Button>
    </div>
  </div>
);
