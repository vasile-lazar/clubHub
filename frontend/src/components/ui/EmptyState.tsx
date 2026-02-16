import React from 'react';
import { Button } from './Button';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  message?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  message,
  actionLabel,
  onAction,
}) => (
  <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
    {icon && (
      <div className="w-16 h-16 rounded-full bg-bg-secondary flex items-center justify-center text-text-muted mb-4">
        {icon}
      </div>
    )}
    <h3 className="text-lg font-semibold text-text-primary mb-2">{title}</h3>
    {message && <p className="text-text-secondary text-sm mb-6 max-w-sm">{message}</p>}
    {actionLabel && onAction && (
      <Button variant="primary" onClick={onAction}>
        {actionLabel}
      </Button>
    )}
  </div>
);
