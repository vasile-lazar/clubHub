import { PATHS } from '../routes/paths';
import React from "react";
import {ShieldExclamationIcon} from "@heroicons/react/24/outline";
import {Button} from "../components/ui/Button.tsx";
export const Unauthorised: React.FC = () => (
    <div className="min-h-screen flex flex-col items-center justify-center bg-bg-primary px-4">
        <ShieldExclamationIcon className="h-24 w-24 text-text-warning mb-4" />
        <h1 className="text-6xl font-bold text-text-primary">401</h1>
        <p className="text-xl text-text-secondary mt-2 text-center">Session expired</p>
        <p className="text-text-muted mt-1 text-center max-w-md">
            Your session has expired. Please log in again.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Button type="internal" to={PATHS.public.login} variant="secondary">
                Log In
                </Button>
        </div>
    </div>
);