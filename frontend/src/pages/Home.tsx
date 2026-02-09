import React from "react";
import {Link} from "react-router-dom";

import Header from "../components/Header.tsx"
import Hero from "../components/Hero.tsx"
import Footer from "../components/Footer.tsx"

import pic01 from "../images/pic01.jpg";
import pic02 from "../images/pic02.jpg";
import pic03 from "../images/pic03.jpg";
import pic04 from "../images/pic04.jpg";
import pic05 from "../images/pic05.jpg";
import pic06 from "../images/pic06.jpg";


interface Feature {
    icon: string;
    title: string;
    desc: string;
}

interface Post {
    id: number;
    image: string;
    title: string;
    desc: string;
}

const Home: React.FC = () => {
    const features: Feature[] = [
        {
            icon: "fa-gem",
            title: "Explore Opportunities",
            desc: "Browse through all active university clubs and find the ones that match your interests.",
        },
        {
            icon: "fa-paper-plane",
            title: "Join & Participate",
            desc: "Sign up for club activities, workshops, and events with just a few clicks.",
        },
        {
            icon: "fa-rocket",
            title: "Stay Updated",
            desc: "Never miss an announcement or event — get real-time updates from your favorite clubs.",
        },
        {
            icon: "fa-signal",
            title: "Network & Learn",
            desc: "Meet like-minded students, develop skills, and make lasting connections.",
        },
    ];

    const posts: Post[] = [
        {
            id: 1,
            image: pic01,
            title: "Robotics Workshop",
            desc: "Hands-on robotics workshop for beginners and advanced students. Learn to build and program robots!"
        },
        {
            id: 2,
            image: pic02,
            title: "Photography Club Meetup",
            desc: "Capture the perfect campus moments. Meet fellow photographers and share your work."
        },
        {
            id: 3,
            image: pic03,
            title: "Environmental Awareness Drive",
            desc: "Join our volunteer campaign to make the campus greener and more sustainable."
        },
        {
            id: 4,
            image: pic04,
            title: "Music Jam Session",
            desc: "Bring your instruments and collaborate with other musicians in a relaxed environment."
        },
        {
            id: 5,
            image: pic05,
            title: "Tech Talk: AI & Future",
            desc: "Learn about the latest trends in AI from industry experts. Open for all students."
        },
        {
            id: 6,
            image: pic06,
            title: "Annual Cultural Festival",
            desc: "Celebrate diversity and talent in our annual festival featuring dance, music, and art."
        },
    ];

    return (
        <>
            <Header/>
            <main className="pt-20 px-6 bg-gray-50 min-h-screen">
                <Hero/>
                    {/* Features */}
                    <section className="mb-16">
                        <h2 className="text-3xl font-bold text-center mb-12">Why Join?</h2>
                        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                            {features.map((feature, index) => (
                                <div
                                    key={index}
                                    className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition transform hover:-translate-y-1"
                                >
                                    <div className="text-indigo-500 text-4xl mb-4">
                                        <i className={`fas ${feature.icon}`}></i>
                                    </div>
                                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                                    <p className="text-gray-600">{feature.desc}</p>
                                </div>
                            ))}
                        </div>
                    </section>
    
                    {/* Announcements / Posts */}
                    <section className="mb-16">
                        <h2 className="text-3xl font-bold text-center mb-12">Announcements</h2>
                        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {posts.map((post) => (
                                <div
                                    key={post.id}
                                    className="bg-white rounded-lg shadow hover:shadow-xl transition overflow-hidden flex flex-col"
                                >
                                    <Link to={`/post/${post.id}`} className="block overflow-hidden">
                                        <img src={post.image} alt={post.title}
                                             className="w-full h-48 object-cover hover:scale-105 transition-transform"/>
                                    </Link>
                                    <div className="p-6 flex-1 flex flex-col justify-between">
                                        <div>
                                            <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                                            <p className="text-gray-600">{post.desc}</p>
                                        </div>
                                        <Link
                                            to={`/post/${post.id}`}
                                            className="mt-4 inline-block bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition"
                                        >
                                            More
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </main>
            <Footer/>
        </>
    );
};

export default Home;
