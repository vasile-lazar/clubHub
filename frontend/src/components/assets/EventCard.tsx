import React from "react"
interface EventCardProps {
    id: number;
    title: string;
    category: string;
    date: string;
    location: string;
    image: string;
    color: string;
}

const EventCard: React.FC<EventCardProps> = ({id, title, category, date, location, image, color}) => {
    return (
        <div className="group bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg dark:hover:shadow-slate-900/30 transition-all duration-300 border border-slate-100 dark:border-slate-700 cursor-pointer">
            <div className="relative h-48 overflow-hidden">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
          <span className={`px-3 py-1 rounded-full text-xs font-bold ${color} backdrop-blur-md`}>
            {category}
          </span>
                </div>
            </div>

            <div className="p-5">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3 line-clamp-1">{title}</h3>

                <div className="space-y-2">
                    <div className="flex items-center text-slate-500 dark:text-slate-400 text-sm">
                        <div className="w-4 h-4 mr-2 text-slate-400 dark:text-slate-500" />
                        {date}
                    </div>
                    <div className="flex items-center text-slate-500 dark:text-slate-400 text-sm">
                        <div className="w-4 h-4 mr-2 text-slate-400 dark:text-slate-500" />
                        {location}
                    </div>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-50 dark:border-slate-700 flex justify-between items-center">
                    <div className="flex -space-x-2">
                        {[1, 2, 3].map((i) => (
                            <div
                                key={i}
                                className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-600 border-2 border-white dark:border-slate-800 flex items-center justify-center text-[8px] text-slate-500 dark:text-slate-300 overflow-hidden"
                            >
                                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${id}-${i}`} alt="user" />
                            </div>
                        ))}
                        <div className="w-6 h-6 rounded-full bg-slate-50 dark:bg-slate-700 border-2 border-white dark:border-slate-800 flex items-center justify-center text-[9px] font-bold text-slate-500 dark:text-slate-300">
                            jhjbh
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    );
};
export default EventCard;