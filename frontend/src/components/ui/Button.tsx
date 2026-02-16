import React from 'react';
import { Link } from 'react-router-dom';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline';
type Size = 'sm' | 'md' | 'lg';

interface BaseButtonProps {
  children: React.ReactNode;
  className?: string;
  variant?: Variant;
  size?: Size;
}

interface ButtonAsButton extends BaseButtonProps {
  type?: 'button' | 'submit';
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
}

interface ButtonAsInternalLink extends BaseButtonProps {
  type: 'internal';
  to: string;
}

interface ButtonAsExternalLink extends BaseButtonProps {
  type: 'external';
  href: string;
}

type ButtonProps = ButtonAsButton | ButtonAsInternalLink | ButtonAsExternalLink;

const baseStyles =
  'rounded-xl font-bold transition-all flex items-center justify-center gap-2';

const sizeStyles: Record<Size, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
};

const variantStyles: Record<Variant, string> = {
  primary: 'bg-button-primary hover:bg-button-primaryHover text-text-inverse',
  secondary: 'bg-button-secondary hover:bg-button-secondaryHover text-text-inverse',
  ghost: 'bg-transparent border border-border-default text-text-primary hover:bg-bg-secondary',
  danger: 'bg-danger hover:bg-danger-hover text-button-textPrimary',
  outline: 'border-2 border-brand-orange text-text-orange hover:bg-brand-orange hover:text-text-inverse',
};

export const Button: React.FC<ButtonProps> = (props) => {
  const {
    children,
    className = '',
    variant = 'primary',
    size = 'md',
  } = props;

  const classes = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`;

  if (props.type === 'internal') {
    return (
      <Link to={props.to} className={classes}>
        {children}
      </Link>
    );
  }

  if (props.type === 'external') {
    return (
      <a href={props.href} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button
      type={props.type ?? 'button'}
      onClick={props.onClick}
      disabled={props.disabled}
      className={classes}
    >
      {children}
    </button>
  );
};
