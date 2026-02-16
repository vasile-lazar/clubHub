import Sidebar from "../components/Sidebar.tsx";
import { Navigate, Outlet } from "react-router-dom";
import type { User } from "../App";

interface LoggedInLayoutProps {
    user?: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const LoggedInLayout: React.FC<LoggedInLayoutProps> = ({ user, setUser }) => {
    if (!user) return <Navigate to="/" replace />;

    return (
        <div className="flex min-h-screen bg-bg-secondary">
            <Sidebar
                username={user.username}
                pfp={user.pfp}
                role={user.role}
                setLoggedInUser={setUser}
            />

            {/* Main content: all pages render here next to sidebar */}
            <main className="flex-1 overflow-auto">
                <div className="w-full h-full">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default LoggedInLayout;
