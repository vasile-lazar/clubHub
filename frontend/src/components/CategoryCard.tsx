// CategoryCard.tsx
import React from "react";
import {Card} from "./Card.tsx";

export interface CategoryCardProps {
    icon: React.ReactNode;
    name?: string;
    iconColor?: string;
    bgColor?: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ icon, name, iconColor, bgColor }) => (
    <Card className={`border-2 group p-6 rounded-2xl  hover:shadow-xl transition-all duration-300 cursor-pointer ${bgColor}`}>
        <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 bg-bg-secondary group-hover:scale-110 transition-transform">
            <div className={iconColor}>{icon}</div>
        </div>
        <h3 className="text-lg font-bold text-text-primary">{name}</h3>
    </Card>
);

export default CategoryCard;
