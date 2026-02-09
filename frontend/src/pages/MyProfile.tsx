import React, { useState } from 'react';
import type { User } from '../App';

interface MyProfileProps {
    user: User;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const MyProfile: React.FC<MyProfileProps> = ({ user, setUser }) => {
    const [editingField, setEditingField] = useState<string | null>(null);
    const [newValue, setNewValue] = useState('');

    const handleChangeClick = (field: string, currentValue: string) => {
        setEditingField(field);
        setNewValue(currentValue);
    };

    const handleSave = () => {
        setUser({ ...user, [editingField!]: newValue });
        setEditingField(null);
    };

    return (
        <div className="p-6 space-y-8">
            <h1 className="text-3xl font-bold text-text-primary">My Profile</h1>
            
            {/* Profile Picture */}
            <div className="flex justify-between items-center p-4 border border-card-border rounded">
                <div className="flex items-center gap-4">
                    <img
                        src={user.pfp || '/default-avatar.png'}
                        alt="Profile"
                        className="w-16 h-16 rounded-full"
                    />
                    <span className="text-text-primary font-semibold">Profile Picture</span>
                </div>
                <button className="text-button-orange font-semibold hover:underline">
                    Change
                </button>
            </div>
            {/* Account Info */}
            <div className="space-y-4">
                {['username', 'email', 'role'].map((field) => (
                    <div
                        key={field}
                        className="flex justify-between items-center p-4 border border-card-border rounded"
                    >
                        <div className="text-text-primary capitalize">
                            <span className="font-semibold">{field}:</span>{' '}
                            {editingField === field ? (
                                <input
                                    type={field === 'email' ? 'email' : 'text'}
                                    value={newValue}
                                    onChange={(e) => setNewValue(e.target.value)}
                                    className="border border-input-border focus:border-input-focus rounded p-1"
                                />
                            ) : (
                                //@ts-ignore
                                user[field]
                            )}
                        </div>

                        {editingField === field ? (
                            <button
                                onClick={handleSave}
                                className="text-button-orange font-semibold hover:underline"
                            >
                                Save
                            </button>
                        ) : (
                            <button
                                onClick={() =>
                                    //@ts-ignore
                                    handleChangeClick(field, user[field])
                                }
                                className="text-button-orange font-semibold hover:underline"
                            >
                                Change
                            </button>
                        )}
                    </div>
                ))}

                {/* Security / Password */}
                <div className="flex justify-between items-center p-4 border border-card-border rounded">
                    <div className="text-text-primary">
                        <span className="font-semibold">Password:</span> ********
                    </div>
                    <button className="text-button-orange font-semibold hover:underline">
                        Change
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;
