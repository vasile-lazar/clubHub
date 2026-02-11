import React from "react";
import LogInView from "../features/LogInView";

interface LogInPageProps {
    setLoggedInUser: (user: any) => void;
}

const LogInPage: React.FC<LogInPageProps> = ({ setLoggedInUser }) => {
    return (
        <LogInView setLoggedInUser={setLoggedInUser} />
    )
};

export default LogInPage;
