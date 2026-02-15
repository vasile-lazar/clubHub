import React from "react"
import{
    CalendarIcon,
    MapPinIcon,
}from "@heroicons/react/24/outline"
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
        <div className="group bg-bg-primary  rounded-2xl overflow-hidden shadow-sm hover:shadow-lg  transition-all duration-300 border-2 border-border-default">
            <div className="relative h-48 overflow-hidden">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
          <span className={`px-3 py-1 rounded-full text-xs font-bold ${color} bg-bg-secondary`}>
            {category}
          </span>
                </div>
            </div>

            <div className="p-5">
                <h3 className="text-lg font-bold text-text-primary  mb-3 line-clamp-1">{title}</h3>

                <div className="space-y-2">
                    <div className="flex items-center text-text-secondary text-sm">
                        <CalendarIcon className={`w-4 h-4 mr-2 text-text-secondary`} />
                        {date}
                    </div>
                    <div className="flex items-center text-text-secondary text-sm">
                        <MapPinIcon className={`w-4 h-4 mr-2 text-text-secondary`} />
                        {location}
                    </div>
                </div>

                <div className="mt-5 pt-4 border-t border-border-default  flex justify-between items-center">
                    <div className="flex -space-x-2">
                        {[1, 2, 3].map((i) => (
                            <div
                                key={i}
                                className="w-6 h-6 rounded-full bg-bg-primary  border-2 border-border-default flex items-center justify-center text-[8px] text-text-secondary overflow-hidden"
                            >
                                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${id}-${i}`} alt="user" />
                            </div>
                        ))}
                        <div className="w-6 h-6 rounded-full bg-bg-primary flex items-center justify-center text-[9px] font-bold text-text-secondary">
                            +50
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    );
};
export default EventCard;