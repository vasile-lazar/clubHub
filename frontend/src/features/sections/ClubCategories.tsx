import CategoryCard from "../../components/CategoryCard.tsx";
const CATEGORIES = [
    { id: 1, name: 'Academic', icon: '', count: '12 Clubs', color: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' },
    { id: 2, name: 'Sports', icon: '', count: '8 Clubs', color: 'bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400' },
    { id: 3, name: 'Arts & Culture', icon: '', count: '15 Clubs', color: 'bg-pink-50 dark:bg-pink-900/20 text-pink-600 dark:text-pink-400' },
    { id: 4, name: 'Technology', icon: '', count: '10 Clubs', color: 'bg-violet-50 dark:bg-violet-900/20 text-violet-600 dark:text-violet-400' },
    { id: 5, name: 'Social', icon: '', count: '20 Clubs', color: 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400' },
    { id: 6, name: 'Career', icon: '', count: '5 Clubs', color: 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400' },
    { id: 7, name: 'Music', icon: '', count: '6 Clubs', color: 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400' },
    { id: 8, name: 'Global', icon: '', count: '9 Clubs', color: 'bg-cyan-50 dark:bg-cyan-900/20 text-cyan-600 dark:text-cyan-400' },
];


const ClubCategories = () => {
    return (
        <section className="py-20 bg-white dark:bg-slate-950 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Explore Clubs</h2>
                    <p className="text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
                        Whether you're into coding, painting, or playing basketball, there's a community waiting for you.
                    </p>
                </div>


                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {CATEGORIES.map((category) => (
                        <CategoryCard
                            key={category.id}
                            icon={category.icon}
                            name={category.name}
                            color={category.color}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};
export default ClubCategories;