// RoleCard.tsx
import React from "react";
import {Card, CardContent,CardHeader} from "./Card.tsx";

export interface RoleCardProps {
    title: string;
    description?: string;
    features?: string[];
    icon?: React.ReactNode;
    listElementIcon?: React.ReactNode;
    buttonText?: string;
    onClick?: () => void;
    color?: string;
    borderColor?: string;
    className?: string;
}

const RoleCard: React.FC<RoleCardProps> = ({
                                               title,
                                               description,
                                               features = [],
                                               icon,
                                               buttonText,
                                               onClick,
                                               color,
                                               borderColor,
                                               listElementIcon,
                                               className = "",
                                           }) => (
    <Card className={`relative p-8 rounded-3xl  ${className} ${borderColor} ${color}`}>
        <CardHeader>
        {icon && <div className="border-2 border-border-default w-14 h-14 rounded-2xl flex items-center justify-center mb-6">{icon}</div>}
        </CardHeader>
        <CardContent>
        <h3 className="text-xl font-bold text-text-orange mb-3">{title}</h3>
        {description && <p className="text-text-secondary mb-8 leading-relaxed">{description}</p>}
        {features.length > 0 && (
            <ul className="space-y-4 mb-10">
                {features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-text-secondary">
                        {listElementIcon && <span className="mt-1 w-5 h-5 text-text-primary flex-shrink-0">{listElementIcon}</span>}
                        <span>{feature}</span>
                    </li>
                ))}
            </ul>
        )}
        {buttonText && (
            <button onClick={onClick} className="inline-flex items-center gap-2 text-sm font-bold text-text-primary hover:gap-3 transition-all">
                {buttonText}
                <span aria-hidden>→</span>
            </button>
        )}</CardContent>
    </Card>
);

export default RoleCard;
