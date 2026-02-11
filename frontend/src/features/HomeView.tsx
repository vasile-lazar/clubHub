import React from "react";

import Header from "../sections/Header.tsx"
import Hero from "../sections/Hero.tsx"
import Footer from "../sections/Footer.tsx"
import RoleFeatures from "../sections/RoleFeatures.tsx"
import ClubCategories from "../sections/ClubCategories.tsx"
import FeaturedEvents from "../sections/FeaturedEvents.tsx";
import CallToAction from "../sections/CallToAction.tsx";

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
