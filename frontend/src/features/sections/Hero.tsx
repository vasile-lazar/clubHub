import React from "react";

const Hero: React.FC = () => {
    return (
        <section className="relative min-h-[700px] flex items-center bg-white dark:bg-slate-900 overflow-hidden ">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 items-center">

                    {/* Left: Content */}
                    <div className="max-w-2xl py-12 lg:py-0 relative z-10">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 dark:bg-orange-900/30 border border-orange-100 dark:border-orange-800 text-orange-600 dark:text-orange-400 text-sm font-medium mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                </span>
                                Fall Semester 2024
                            </div>

                            <h1 className="text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-6 leading-[1.15]">
                                Discover Your <br/>
                                <span className="text-orange-600">Campus Community</span>
                            </h1>

                            <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 leading-relaxed max-w-lg">
                                Join over 12,000 students using Club Hub to find events, join organizations, and make the most of university life.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 mb-10">
                                <button className="px-8 py-3.5 bg-orange-600 hover:bg-orange-700 text-white rounded-xl font-bold text-lg shadow-lg shadow-orange-200 dark:shadow-none transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2">
                                    Find a Club <div className="w-5 h-5" />
                                </button>
                                <button className="px-8 py-3.5 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 hover:border-slate-300 dark:hover:border-slate-600 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2">
                                    View Events
                                </button>
                            </div>

                            <div className="flex items-center gap-6 text-sm font-medium text-slate-500 dark:text-slate-400">
                                <div className="flex items-center gap-2">
                                    <div className="bg-orange-100 dark:bg-orange-900/40 p-2 rounded-lg text-orange-600 dark:text-orange-400">
                                        <div className="w-5 h-5" />
                                    </div>
                                    <span>500+ Active Clubs</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="bg-slate-100 dark:bg-slate-800 p-2 rounded-lg text-slate-600 dark:text-slate-400">
                                        <div className="w-5 h-5" />
                                    </div>
                                    <span>Weekly Events</span>
                                </div>
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
                    <div className="absolute inset-0 bg-gradient-to-r from-white dark:from-slate-900 via-white/20 dark:via-slate-900/20 to-transparent transition-colors duration-300" />
                </div>
            </div>
        </section>
    );
};

export default Hero;
