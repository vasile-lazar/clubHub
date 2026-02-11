import React from "react";

export interface CardProps {
    title: string;
    description?: string;
    features?: string[];

    /** Optional icon element (SVG, image, etc.) */
    icon?: React.ReactNode;

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
                                       color = "bg-slate-100",
                                       className = ""
                                   }) => {
    return (
        <div
            className={`relative p-8 rounded-3xl border-2 bg-bg-primary hover:shadow-xl transition-all duration-300  ${className}`}
        >
            {/* Icon Slot */}
            {icon && (
                <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${color}`}
                >
                    {icon}
                </div>
            )}

            {/* Title */}
            <h3 className="text-xl font-bold text-orange-600 mb-3">
                {title}
            </h3>

            {/* Description */}
            {description && (
                <p className="text-slate-600 mb-8 leading-relaxed">
                    {description}
                </p>
            )}

            {/* Features */}
            {features.length > 0 && (
                <ul className="space-y-4 mb-10">
                    {features.map((feature, index) => (
                        <li
                            key={index}
                            className="flex items-start gap-3 text-sm text-slate-700"
                        >
                            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-black" />
                            <span>{feature}</span>
                        </li>
                    ))}
                </ul>
            )}

            {/* CTA */}
            {buttonText && (
                <button
                    onClick={onClick}
                    className="inline-flex items-center gap-2 text-sm font-bold text-slate-900 hover:gap-3 transition-all"
                >
                    {buttonText}
                    <span aria-hidden>→</span>
                </button>
            )}
        </div>
    );
};

export default RoleCard;
