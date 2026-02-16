import React from 'react';
import {Outlet} from 'react-router-dom';
import {GuestHeader} from '../components/navigation/GuestHeader';

export const GuestLayout: React.FC = () => (
    <div className="min-h-screen flex flex-col bg-bg-primary">
        <GuestHeader/>
        <main className="flex-1 pt-16">
            <Outlet/>
        </main>
    </div>
);
