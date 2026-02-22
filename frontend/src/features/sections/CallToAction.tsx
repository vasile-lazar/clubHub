import ctaBG from "../../assets/images/call_to_action_bgImg.png";
import { PATHS } from "../../routes/paths";
import { Button } from "../../components/ui/Button";

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
            <div className="absolute inset-0 bg-black/85"></div>

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                <h2 className="text-4xl md:text-5xl font-extrabold text-text-orange mb-6 tracking-tight">
                    Ready to Shape Campus Life?
                </h2>

                <p className="text-xl text-slate-500 mb-10 max-w-2xl mx-auto">
                    Explore active clubs, attend exciting events, or step up as an organizer and lead your own community.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Button
                        type="internal"
                        to={PATHS.public.register}
                        variant="primary"
                        size="lg"
                        className="w-full sm:w-auto shadow-xl hover:shadow-2xl hover:-translate-y-1"
                    >
                        Get Started
                        <span>→</span>
                    </Button>
                    <Button
                        type="internal"
                        to={PATHS.public.home}
                        variant="secondary"
                        size="lg"
                        className="w-full sm:w-auto"
                    >
                        Read Guidelines
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default CallToAction;