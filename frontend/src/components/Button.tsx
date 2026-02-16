import React from "react";
import { Link } from "react-router-dom";

type Variant = "primary" | "secondary" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";

type BaseProps = {
    children: React.ReactNode;
    className?: string;
    variant?: Variant;
    size?: Size;
};

type ButtonAsButton = BaseProps & {
    type?: "button";
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    disabled?: boolean;
};

type ButtonAsExternalLink = BaseProps & {
    type: "external";
    href: string;
};

type ButtonAsInternalLink = BaseProps & {
    type: "internal";
    to: string;
};

type ButtonProps =
    | ButtonAsButton
    | ButtonAsExternalLink
    | ButtonAsInternalLink;

export const Button: React.FC<ButtonProps> = ({
                                                  children,
                                                  className = "",
                                                  variant = "primary",
                                                  size = "md",
                                                  ...props
                                              }) => {
    const baseStyles =
        "rounded-xl font-bold transition-all flex items-center justify-center gap-2";

    const sizeStyles: Record<Size, string> = {
        sm: "px-4 py-2 text-sm",
        md: "px-8 py-3.5 text-lg",
        lg: "px-12 py-5 text-xl",
    };

    const variants: Record<Variant, string> = {
        primary:
            "bg-button-primary hover:bg-button-primaryHover text-white transform hover:-translate-y-0.5",
        secondary:
            "bg-button-secondary hover:bg-button-secondaryHover text-white",
        ghost:
            "bg-transparent border border-gray-300 text-gray-800 hover:bg-gray-100",
        danger:
            "bg-red-600 hover:bg-red-700 text-white",
    };

    const classes = `${baseStyles} ${sizeStyles[size]} ${variants[variant]} ${className}`;

    // Regular button
    if (!props.type || props.type === "button") {
        return (
            <button
                onClick={(props as ButtonAsButton).onClick}
                disabled={(props as ButtonAsButton).disabled}
                className={classes}
            >
                {children}
            </button>
        );
    }

    // External link
    if (props.type === "external") {
        return (
            <a
                href={(props as ButtonAsExternalLink).href}
                target="_blank"
                rel="noopener noreferrer"
                className={classes}
            >
                {children}
            </a>
        );
    }

    // Internal link (React Router)
    if (props.type === "internal") {
        return (
            <Link to={(props as ButtonAsInternalLink).to} className={classes}>
                {children}
            </Link>
        );
    }

    return null;
};
