import "./Home.css";

export default function Home() {
    return (
        <div className="layout">
            <header className="header">
                <div className="header-left">
                    <span className="logo">ClubHub</span>
                </div>

                <div className="profile">V</div>
            </header>

            <main className="content center">
                <section className="hero">
                    <h1>Everything clubs need, in one place</h1>
                    <p>
                        Discover student clubs, manage events, and stay connected —
                        without clutter.
                    </p>
                </section>

                <section className="action-grid">
                    <button className="action-card primary">
                        Explore Clubs
                    </button>

                    <button className="action-card">
                        My Clubs
                    </button>

                    <button className="action-card">
                        Upcoming Events
                    </button>

                    <button className="action-card">
                        Create a Club
                    </button>

                    <button className="action-card">
                        My Profile
                    </button>

                    <button className="action-card admin">
                        Admin Panel
                    </button>
                </section>
            </main>
        </div>
    );
}
