import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = '' }) => (
  <div
    className={`border border-border-default rounded-2xl shadow-sm hover:shadow-md 
      transition-shadow duration-300 bg-bg-primary overflow-hidden ${className}`}
  >
    {children}
  </div>
);

export const CardHeader: React.FC<CardProps> = ({ children, className = '' }) => (
  <div className={`p-4 flex justify-between items-center border-b border-border-default ${className}`}>
    {children}
  </div>
);

export const CardContent: React.FC<CardProps> = ({ children, className = '' }) => (
  <div className={`p-4 ${className}`}>{children}</div>
);

export const CardTitle: React.FC<CardProps> = ({ children, className = '' }) => (
  <h3 className={`text-text-primary font-semibold ${className}`}>{children}</h3>
);

interface BadgeProps extends CardProps {
  variant?: 'default' | 'outline';
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  className = '',
}) => (
  <span
    className={`px-2 py-0.5 text-xs text-text-secondary rounded ${
      variant === 'outline' ? 'border border-border-default' : 'bg-bg-secondary'
    } ${className}`}
  >
    {children}
  </span>
);
