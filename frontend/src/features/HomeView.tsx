import React from "react";

import Header from "./sections/Header"
import Hero from "./sections/Hero"
import Footer from "./sections/Footer"
import RoleFeatures from "./sections/RoleFeatures"
import ClubCategories from "./sections/ClubCategories"
import FeaturedEvents from "./sections/FeaturedEvents";
import CallToAction from "./sections/CallToAction";

const HomeView: React.FC = () => {
    
    return (
        <>
            <Header/>
                <main className="pt-14 bg-gray-50 min-h-screen">
                    <Hero/>
                    <RoleFeatures/>
                    <ClubCategories/>
                    <FeaturedEvents/>
                    <CallToAction/>
                </main>
            <Footer/>
        </>
    );
};

export default HomeView;
