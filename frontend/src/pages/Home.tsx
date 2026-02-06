import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/main.css';

import pic01 from '../images/pic01.jpg';
import pic02 from '../images/pic02.jpg';
import pic03 from '../images/pic03.jpg';
import pic04 from '../images/pic04.jpg';
import pic05 from '../images/pic05.jpg';
import pic06 from '../images/pic06.jpg';
import bannerPic from '../images/pic10.jpg';

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
        { icon: 'fa-gem', title: 'Explore Opportunities', desc: 'Browse through all active university clubs and find the ones that match your interests.' },
        { icon: 'fa-paper-plane', title: 'Join & Participate', desc: 'Sign up for club activities, workshops, and events with just a few clicks.' },
        { icon: 'fa-rocket', title: 'Stay Updated', desc: 'Never miss an announcement or event — get real-time updates from your favorite clubs.' },
        { icon: 'fa-signal', title: 'Network & Learn', desc: 'Meet like-minded students, develop skills, and make lasting connections.' },
    ];
    
    const posts: Post[] = [
        { id: 1, image: pic01, title: 'Robotics Workshop', desc: 'Hands-on robotics workshop for beginners and advanced students. Learn to build and program robots!' },
        { id: 2, image: pic02, title: 'Photography Club Meetup', desc: 'Capture the perfect campus moments. Meet fellow photographers and share your work.' },
        { id: 3, image: pic03, title: 'Environmental Awareness Drive', desc: 'Join our volunteer campaign to make the campus greener and more sustainable.' },
        { id: 4, image: pic04, title: 'Music Jam Session', desc: 'Bring your instruments and collaborate with other musicians in a relaxed environment.' },
        { id: 5, image: pic05, title: 'Tech Talk: AI & Future', desc: 'Learn about the latest trends in AI from industry experts. Open for all students.' },
        { id: 6, image: pic06, title: 'Annual Cultural Festival', desc: 'Celebrate diversity and talent in our annual festival featuring dance, music, and art.' },
    ];

    return (
        <>
            {/* Banner */}
            <section id="banner">
                <div className="content">
                    <header>
                        <h1>Welcome to ClubHub</h1>
                        <p>Explore, Join, and Grow with University Clubs</p>
                    </header>
                    <p>Discover all the student clubs your university has to offer. From tech to sports, cultural to volunteering, ClubHub helps you find the perfect fit.</p>
                    <ul className="actions">
                        <li><Link to="/about" className="button big">Get Started</Link></li>
                    </ul>
                </div>
                <span className="image object">
          <img src={bannerPic} alt="Banner" />
        </span>
            </section>

            {/* Section: Features */}
            <section>
                <header className="major">
                    <h2>Why Join?</h2>
                </header>
                <div className="features">
                    {features.map((feature, index) => (
                        <article key={index}>
                            <span className={`icon ${feature.icon.includes('fa-gem') ? '' : 'solid'} ${feature.icon}`}></span>
                            <div className="content">
                                <h3>{feature.title}</h3>
                                <p>{feature.desc}</p>
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            {/* Section: Posts */}
            <section>
                <header className="major">
                    <h2>Announcements</h2>
                </header>
                <div className="posts">
                    {posts.map((post) => (
                        <article key={post.id}>
                            <Link to={`/post/${post.id}`} className="image">
                                <img src={post.image} alt={post.title} />
                            </Link>
                            <h3>{post.title}</h3>
                            <p>{post.desc}</p>
                            <ul className="actions">
                                <li><Link to={`/post/${post.id}`} className="button">More</Link></li>
                            </ul>
                        </article>
                    ))}
                </div>
            </section>
        </>
    );
};

export default Home;