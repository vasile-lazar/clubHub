import React from "react";
import MyClubs from "../features/MyClubsView.tsx";
import type {User} from "../App.tsx";

interface MyClubsProps {
    user: User;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
}
const MyClubsPage:React.FC<MyClubsProps> = ({ user, setUser }) => {
    return (
        <MyClubs user={user} setUser={setUser} />
    )
}

export default MyClubsPage;