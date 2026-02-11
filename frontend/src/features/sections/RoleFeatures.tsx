import RoleCard from "../../components/RoleCard.tsx"

const ROLES = [
    {
        title: "For Students",
        description: "Discover your passion and build your network.",
        features: ["Browse 100+ active clubs", "One-click event RSVP", "Track extracurricular transcript"],
        color: "bg-orange-50 text-orange-600",
        iconColor: "text-orange-600",
        button: "Find a Club",
    },
    {
        title: "For Organizers",
        description: "Powerful tools to lead and grow your community.",
        features: ["Easy event scheduling", "Real-time attendance tracking", "Member communication tools"],
        color: "bg-slate-100 text-slate-700",
        iconColor: "text-slate-700",
        button: "Manage Club",
    },
    {
        title: "For Admins",
        description: "Oversight and insights for the entire institution.",
        features: ["Campus-wide analytics", "Safety & compliance workflows", "Grant & funding management"],
        color: "bg-gray-50 text-gray-600",
        iconColor: "text-gray-600",
        button: "Admin Portal",
    }
];

const RoleFeatures = () => {
    return (
        <section className="py-24 bg-orange-600 bg-opacity-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-black  mb-4">Built for the Entire Campus</h2>
                    <p className="text-slate-600 max-w-2xl mx-auto">
                        ClubHub connects every part of the university ecosystem, from students to administration.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {ROLES.map((role, index) => (
                        <RoleCard
                            key={index}
                            title={role.title}
                            description={role.description}
                            features={role.features}
                            buttonText={role.button}
                            color={role.color}
                            icon={
                                <div
                                    className={`w-7 h-7 rounded-full ${role.iconColor}`}
                                />
                            }
                            onClick={() => {
                                // optional: route / action
                            }}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};
export default RoleFeatures;
