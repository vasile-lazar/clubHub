import React from "react";

export interface CardProps {
    title: string;
    description?: string;
    features?: string[];

    /** Optional icon element (SVG, image, etc.) */
    icon?: React.ReactNode;
    listElementIcon?: React.ReactNode;

    /** CTA */
    buttonText?: string;
    onClick?: () => void;

    /** Styling */
    color?: string;
    borderColor?: string;
    className?: string;
}

const RoleCard: React.FC<CardProps> = ({
                                       title,
                                       description,
                                       features = [],
                                       icon,
                                       buttonText,
                                       onClick,
                                       color,borderColor, listElementIcon,
                                       className = ""
                                   }) => {
    return (
        <div
            className={`relative p-8 rounded-3xl  hover:shadow-xl transition-all duration-300  ${className} ${borderColor} ${color}`}
        >
            {/* Icon Slot */}
            {icon && (
                <div
                    className={`border-2 border-border-default w-14 h-14 rounded-2xl flex items-center justify-center mb-6`}
                >
                    {icon}
                </div>
            )}

            {/* Title */}
            <h3 className="text-xl font-bold text-text-orange mb-3">
                {title}
            </h3>

            {/* Description */}
            {description && (
                <p className="text-text-secondary mb-8 leading-relaxed">
                    {description}
                </p>
            )}

            {/* Features */}
            {features.length > 0 && (
                <ul className="space-y-4 mb-10">
                    {features.map((feature, index) => (
                        <li
                            key={index}
                            className="flex items-center gap-2 text-sm text-text-secondary"
                        >
                            {/* Render the list element icon if provided */}
                            {listElementIcon && (
                                <span className="mt-1 w-5 h-5 text-text-primary flex-shrink-0">
            {listElementIcon}
          </span>
                            )}
                            <span>{feature}</span>
                        </li>
                    ))}
                </ul>
            )}

            {/* CTA */}
            {buttonText && (
                <button
                    onClick={onClick}
                    className="inline-flex items-center gap-2 text-sm font-bold text-text-primary hover:gap-3 transition-all"
                >
                    {buttonText}
                    <span aria-hidden>→</span>
                </button>
            )}
        </div>
    );
};

export default RoleCard;
