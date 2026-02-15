import React from "react";

const Hero: React.FC = () => {
    return (
        <section className="relative h-screen flex items-center overflow-hidden ">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 items-center">

                    {/* Left: Content */}
                    <div className="max-w-2xl py-12 lg:py-0 relative z-10">
                            <h1 className="text-5xl lg:text-6xl font-extrabold text-text-primary  tracking-tight mb-6 leading-[1.15]">
                                Discover Your <br/>
                                <span className="text-text-orange">Campus Community</span>
                            </h1>

                            <p className="text-lg text-text-secondary mb-8 leading-relaxed max-w-lg">
                                Join over 12,000 students using Club Hub to find events, join organizations, and make the most of university life.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 mb-10">
                                <button className="px-8 py-3.5 bg-button-primary hover:bg-button-primaryHover text-white rounded-xl font-bold text-lg transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2">
                                    Find a Club <div className="w-5 h-5" />
                                </button>
                                <button className="px-8 py-3.5 bg-button-secondary text-white border:none hover:bg-button-secondaryHover rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2">
                                    View Events
                                </button>
                            </div>
                        
                    </div>

                </div>
            </div>

            {/* Right: Background Image */}
            <div className="absolute top-0 right-0 w-full lg:w-[45%] h-full z-0 hidden lg:block">
                <div className="relative h-full w-full">
                    <img
                        src="https://images.unsplash.com/photo-1662148965079-7fbb45160973?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIwdW5pdmVyc2l0eSUyMHN0dWRlbnRzJTIwdGFsa2luZyUyMG91dGRvb3JzJTIwY2FtcHVzfGVufDF8fHx8MTc3MDQ5NTE3Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                        alt="Students on campus"
                        className="h-full w-full object-cover"
                    />

                    {/* Overlay Gradient to blend with white background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-bg-primary via-bg-secondary/30 to-transparent transition-colors duration-500" />
                </div>
            </div>
        </section>
    );
};

export default Hero;
