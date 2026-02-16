import ctaBG from "../../assets/images/call_to_action_bgImg.png";

const CallToAction = () => {
    return (
        <section
            className="min-h-screen flex items-center justify-center py-20 relative overflow-hidden transition-colors duration-300"
            style={{
                backgroundImage: `url(${ctaBG})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}
        >
            {/* Optional overlay */}
            <div className="absolute inset-0 bg-black/85"></div> {/* Dark overlay for readability */}

            {/* Content */}
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                <h2 className="text-4xl md:text-5xl font-extrabold text-text-orange mb-6 tracking-tight">
                    Ready to Shape Campus Life?
                </h2>

                <p className="text-xl text-slate-500 mb-10 max-w-2xl mx-auto">
                    Explore active clubs, attend exciting events, or step up as an organizer and lead your own community.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button className="px-8 py-4 bg-button-primary hover:bg-button-primaryHover text-button-textPrimary rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto flex items-center justify-center">
                        Get Started
                        <span className="ml-2">→</span>
                    </button>
                    <button className="px-8 py-4 bg-button-secondary text-button-textSecondary hover:bg-button-secondary-hover rounded-xl font-bold text-lg transition-all duration-300 w-full sm:w-auto">
                        Read Guidelines
                    </button>
                </div>
            </div>
        </section>
    );
};

export default CallToAction;
