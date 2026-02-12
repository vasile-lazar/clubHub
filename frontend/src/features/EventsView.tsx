import rawEvents from "../_mock/EventsAnnouncements.json";

export type Event = {
    id: number;
    title: string;
    description: string;
    date: string;
    imageUrl?: string;
};
const eventsAnnouncements = rawEvents


const EventsPage: React.FC = () => {
    return (
        <div className="min-h-screen flex justify-center bg-bg-primary py-16">
            <div className="p-5 overflow-x-auto">
                <div className="flex space-x-6">
                    {eventsAnnouncements.map((event: Event) => (
                        <div
                            key={event.id}
                            className="flex-shrink-0 h-[500px] w-[400px] bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer hover:shadow-2xl transition"
                        >
                            {/* Image on the left */}
                            {event.imageUrl && (
                                <div
                                    className="h-72 w-full bg-cover bg-center"
                                    style={{ backgroundImage: `url(${event.imageUrl})` }}
                                />
                            )}

                            {/* Event details */}
                            <div className="p-4 flex flex-col justify-between h-[150px]">
                                <h2 className="text-xl font-bold mb-2">{event.title}</h2>
                                <p className="text-sm text-gray-600">{event.description}</p>
                                <div className="mt-2 flex justify-between text-xs text-gray-500">
                                    <span>{event.date}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default EventsPage;
