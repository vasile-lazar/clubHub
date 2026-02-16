import RoleCard from "../../components/RoleCard.tsx"
import {
    ShieldCheckIcon,
    AcademicCapIcon,
    CalendarIcon,
    CheckCircleIcon} 
    from "@heroicons/react/24/outline";

const ROLES = [
    {
        title: "For Students",
        description: "Discover your passion and build your network.",
        features: ["Browse 100+ active clubs", "One-click event RSVP", "Track extracurricular transcript"],
        icon: AcademicCapIcon,
        borderColor: "border-orange-400",
    },
    {
        title: "For Organizers",
        description: "Powerful tools to lead and grow your community.",
        features: ["Easy event scheduling", "Real-time attendance tracking", "Member communication tools"],
        icon: CalendarIcon,
        borderColor: "border-green-500",
    },
    {
        title: "For Admins",
        description: "Oversight and insights for the entire institution.",
        features: ["Campus-wide analytics", "Safety & compliance workflows", "Grant & funding management"],
        icon: ShieldCheckIcon,
        borderColor: "border-blue-200",
    }
];

const RoleFeatures = () => {
    return (
        <section className="bg-bg-secondary min-h-auto py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-text-orange  mb-4">Built for the Entire Campus</h2>
                    <p className="text-text-secondary max-w-2xl mx-auto">
                        ClubHub connects every part of the university ecosystem, from students to administration.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {ROLES.map((role, index) => {
                        const Icon = role.icon;

                        return (
                            <RoleCard
                                key={index}
                                title={role.title}
                                description={role.description}
                                features={role.features}
                                color = "bg-bg-primary"
                                borderColor={`border-2 ${role.borderColor}`}
                                listElementIcon= {<CheckCircleIcon className="w-5 h-5 text-text-orange" />}
                                icon={
                                    Icon && (
                                        <div className="w-10 h-10 rounded-full flex items-center justify-center">
                                            <Icon className="w-8 h-8 text-text-primary" />
                                        </div>
                                    )
                                }
                                onClick={() => {}}
                            />
                        );
                    })}
                </div>
            </div>
        </section>
    );
};
export default RoleFeatures;
