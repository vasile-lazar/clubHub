const CallToAction = () => {
    return (
        <section className="py-24 bg-white dark:bg-slate-950 relative overflow-hidden transition-colors duration-300">
            <div className="absolute inset-0 bg-orange-600 skew-y-3 origin-bottom-left transform translate-y-20 z-0 opacity-5 dark:opacity-10"></div>

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-300 text-sm font-bold mb-8">
                    <div className="w-4 h-4" />
                    <span>Ready to make an impact?</span>
                </div>

                <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-6 tracking-tight">
                    Start Your Own Club Today
                </h2>

                <p className="text-xl text-slate-600 dark:text-slate-300 mb-10 max-w-2xl mx-auto">
                    Have an idea for a community? We provide the tools, funding, and support you need to launch and grow your student organization.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button className="px-8 py-4 bg-orange-600 hover:bg-orange-700 text-white rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto flex items-center justify-center">
                        Create a Club
                        <div className="ml-2 w-5 h-5" />
                    </button>
                    <button className="px-8 py-4 bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-700 dark:text-slate-200 rounded-xl font-bold text-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-all duration-300 w-full sm:w-auto">
                        Read Guidelines
                    </button>
                </div>
            </div>
        </section>
    );
};
export default CallToAction;