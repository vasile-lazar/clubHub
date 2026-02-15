export interface CategoryCardProps {
    icon: React.ReactNode;
    name?: string;
    color?: string;
    bgColor?: string;
}
const CategoryCard: React.FC<CategoryCardProps> = ({
                                                       icon,
                                                       name,
                                                       color,
                                                       bgColor
                                                   }) => {
    return (
        <div
            className={`group p-6 rounded-2xl border border-border-default 
      hover:shadow-xl transition-all duration-300 
      cursor-pointer ${bgColor}`}
        >
            <div
                className="w-14 h-14 rounded-xl flex items-center justify-center mb-4  bg-bg-secondary group-hover:scale-110 transition-transform"
            >
                {/* Apply color ONLY here */}
                <div className={color}>
                    {icon}
                </div>
            </div>

            <h3 className="text-lg font-bold text-text-primary">
                {name}
            </h3>
        </div>
    );
};

export default CategoryCard;