import React from "react";
import MyProfile from "../features/MyProfileView.tsx";
import type {User} from "../App.tsx";

interface MyProfileProps {
    user: User;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
}
const MyProfilePage:React.FC<MyProfileProps> = ({ user, setUser }) => {
    return (
        <MyProfile user={user} setUser={setUser} />
    )
}

export default MyProfilePage;