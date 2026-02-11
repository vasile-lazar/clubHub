import React from "react";

export interface CategoryCardProps {
    icon: React.ReactNode;
    name: string;
    color: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({icon, name, color}) => {
    return (
        <div className="group p-6 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-orange-100 dark:hover:border-orange-900 hover:shadow-xl dark:hover:shadow-slate-900/20 transition-all duration-300 cursor-pointer bg-white dark:bg-slate-900">
            <div
                className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 text-2xl ${color} group-hover:scale-110 transition-transform`}
            >
                {icon}
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {name}
            </h3>
        </div>
    );
};

export default CategoryCard;