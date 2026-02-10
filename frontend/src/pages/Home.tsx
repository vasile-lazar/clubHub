import React from "react";

import Header from "../components/Header.tsx"
import Hero from "../components/Hero.tsx"
import Footer from "../components/Footer.tsx"
import RoleFeatures from "../components/RoleFeatures.tsx"
import ClubCategories from "../components/ClubCategories.tsx"
import FeaturedEvents from "../components/FeaturedEvents.tsx";
import CallToAction from "../components/CallToAction.tsx";

const Home: React.FC = () => {
    
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

export default Home;
