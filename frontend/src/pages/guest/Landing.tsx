import React from 'react';
import Hero from '../../features/sections/Hero';
import RoleFeatures from '../../features/sections/RoleFeatures';
import ClubCategories from '../../features/sections/ClubCategories';
import FeaturedEvents from '../../features/sections/FeaturedEvents';
import CallToAction from '../../features/sections/CallToAction';
import Footer from '../../features/sections/Footer';

export const Landing: React.FC = () => (
    <>
        <main className="bg-bg-primary min-h-screen">
            <Hero/>
            <RoleFeatures/>
            <ClubCategories/>
            <FeaturedEvents/>
            <CallToAction/>
        </main>
        <Footer/>
    </>
);
