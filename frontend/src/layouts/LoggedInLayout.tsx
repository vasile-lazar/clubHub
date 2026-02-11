import Sidebar from "../components/Sidebar.tsx";
import {Navigate, Outlet} from "react-router-dom";
import type {User} from "../App.tsx";

interface LoggedInLayoutProps {
    user?: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const LoggedInLayout: React.FC<LoggedInLayoutProps> = ({ user, setUser}) => {
    if (!user) return( <Navigate to="/" replace />)
    return (
        <div className="flex">
            <Sidebar username={user.username} pfp={user.pfp} role={user.role} setLoggedInUser={setUser} />
            <div className="flex-1 transition-all min-h-screen ml-64">
                <Outlet />
            </div>
        </div>
    );
};

export default LoggedInLayout;