import CategoryCard from "../../components/CategoryCard.tsx";
import {
    BookOpenIcon,
    PaintBrushIcon,
    TrophyIcon,
    CodeBracketIcon,
    ChatBubbleOvalLeftIcon,
    BriefcaseIcon,
    MusicalNoteIcon,
    GlobeAltIcon
} from "@heroicons/react/24/outline";

const CATEGORIES = [
    { id: 1, name: 'Academic', icon: BookOpenIcon, color: 'text-blue-600' },
    { id: 2, name: 'Sports', icon: TrophyIcon, color: 'text-orange-600' },
    { id: 3, name: 'Arts & Culture', icon: PaintBrushIcon, color: 'text-pink-600' },
    { id: 4, name: 'Technology', icon: CodeBracketIcon, color: 'text-violet-600' },
    { id: 5, name: 'Social', icon: ChatBubbleOvalLeftIcon, color: 'text-green-600' },
    { id: 6, name: 'Career', icon: BriefcaseIcon, color: 'text-purple-600' },
    { id: 7, name: 'Music', icon: MusicalNoteIcon, color: 'text-red-600' },
    { id: 8, name: 'Global', icon: GlobeAltIcon, color: 'text-cyan-600' },
];





const ClubCategories = () => {
    return (
        <section className="bg-bg-secondary py-20 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-text-orange mb-4">Explore Clubs</h2>
                    <p className="text-text-secondary max-w-3xl mx-auto">
                        Whether you're into coding, painting, or playing basketball, there's a community waiting for you.
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {CATEGORIES.map((category) => {
                        const Icon = category.icon; // rename component to JSX-friendly variable
                        return (
                            <CategoryCard
                                key={category.id}
                                name={category.name}
                                bgColor="bg-bg-primary"
                                iconColor={category.color}
                                icon={<Icon className="w-8 h-8" />} // render as JSX
                            />
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default ClubCategories;
