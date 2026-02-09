import React from 'react';
import { Link } from "react-router-dom";



const Hero: React.FC = () => {
    return (
        
    <section className="relative  overflow-hidden shadow-lg mb-16">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center p-8 md:p-16">
            <div className="md:w-1/2">
                <h1 className=" text - black text-4xl md:text-5xl font-bold mb-4">
                    Discover Your
                </h1>
                <h1 className="text-orange-600 text-4xl md:text-5xl font-bold mb-4">
                    Campus Community
                </h1>
                <p className="text-lg md:text-xl mb-6">
                    Join over 12,000 students using Club Hub to find events, join organizations, and make the most of university life.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <Link
                    to="/about"
                    className="inline-block bg-orange-600 text-white font-semibold px-6 py-3 rounded-lg shadow-orange-500 hover:bg-orange-800 transition"
                >
                    Find a Club
                </Link>
                <Link
                    to="/about"
                    className="inline-block border-solid 1px border-gray-500 text-black font-semibold px-6 py-3 rounded-lg shadow hover:bg-gray-100 transition"
                >
                    View Events
                </Link>
                </div>
            </div>
        </div>
    </section>
    );
}

export default Hero;
