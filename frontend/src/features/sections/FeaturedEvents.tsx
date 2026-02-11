import EventCard from "./assets/EventCard.tsx";

const EVENTS = [
    {
        id: 1,
        title: "Annual Hackathon 2024",
        category: "Technology",
        date: "Mar 15, 9:00 AM",
        location: "Engineering Hall",
        image: "https://images.unsplash.com/photo-1561089489-f13d5e730d72?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwaGFja2F0aG9uJTIwY29kaW5nJTIwZXZlbnR8ZW58MXx8fHwxNzcwMjkzNjEyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        color: "bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300"
    },
    {
        id: 2,
        title: "Spring Music Fest",
        category: "Music",
        date: "Mar 18, 7:00 PM",
        location: "Amphitheater",
        image: "https://images.unsplash.com/photo-1648408340796-a015aa0a8241?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaXZlJTIwbXVzaWMlMjBjb25jZXJ0JTIwc21hbGwlMjB2ZW51ZSUyMHVuaXZlcnNpdHl8ZW58MXx8fHwxNzcwMjkzNjE2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        color: "bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300"
    },
    {
        id: 3,
        title: "Varsity Basketball Finals",
        category: "Sports",
        date: "Mar 20, 6:30 PM",
        location: "Main Arena",
        image: "https://images.unsplash.com/photo-1638569795530-d617985ed7b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwYmFza2V0YmFsbCUyMGdhbWUlMjBzdHVkZW50c3xlbnwxfHx8fDE3NzAyOTM2MjN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        color: "bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-300"
    },
    {
        id: 4,
        title: "Oil Painting Workshop",
        category: "Arts",
        date: "Mar 22, 2:00 PM",
        location: "Art Studio B",
        image: "https://images.unsplash.com/photo-1649479117144-49ae67b86632?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnQlMjBzdHVkZW50cyUyMHBhaW50aW5nJTIwc3R1ZGlvfGVufDF8fHx8MTc3MDI5MzYxOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        color: "bg-pink-100 dark:bg-pink-900/40 text-pink-700 dark:text-pink-300"
    }
];

export const FeaturedEvents = () => {
    
    return (
        <section className="py-20 bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Happening This Week</h2>
                        <p className="text-slate-600 dark:text-slate-400">Don't miss out on the most popular campus activities.</p>
                    </div>
                    <button className="hidden sm:flex items-center text-orange-600 dark:text-orange-500 font-medium hover:text-orange-700 dark:hover:text-orange-400 transition-colors">
                        View all events <div className="w-4 h-4 ml-1" />
                    </button>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {EVENTS.map(event => (
                        <EventCard
                            key={event.id}
                            {...event}
                        />
                    ))}
                </div>

                <div className="mt-8 text-center sm:hidden">
                    <button className="inline-flex items-center text-orange-600 dark:text-orange-500 font-medium hover:text-orange-700 dark:hover:text-orange-400 transition-colors">
                        View all events <div className="w-4 h-4 ml-1" />
                    </button>
                </div>
            </div>
        </section>
    );
};
export default FeaturedEvents;