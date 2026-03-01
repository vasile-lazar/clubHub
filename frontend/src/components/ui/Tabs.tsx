import React, { useState, createContext, useContext } from 'react';

// ── Context ───────────────────────────────────────────────────────────────

interface TabsContextType {
    active: string;
    setActive: (value: string) => void;
}

const TabsContext = createContext<TabsContextType>({
    active: '',
    setActive: () => {},
});

// ── Components ────────────────────────────────────────────────────────────

interface TabsProps {
    defaultValue: string;
    className?: string;
    children: React.ReactNode;
}

export const Tabs: React.FC<TabsProps> = ({ defaultValue, className = '', children }) => {
    const [active, setActive] = useState(defaultValue);
    return (
        <TabsContext.Provider value={{ active, setActive }}>
            <div className={className}>{children}</div>
        </TabsContext.Provider>
    );
};

interface TabsListProps {
    className?: string;
    children: React.ReactNode;
}

export const TabsList: React.FC<TabsListProps> = ({ className = '', children }) => (
    <div className={`flex gap-1 border-b border-border-default rounded-full bg-bg-primary ${className}`}>
        {children}
    </div>
);

interface TabsTriggerProps {
    value: string;
    children: React.ReactNode;
}

export const TabsTrigger: React.FC<TabsTriggerProps> = ({ value, children }) => {
    const { active, setActive } = useContext(TabsContext);
    return (
        <button
            onClick={() => setActive(value)}
            className={`px-4 py-2.5 text-sm font-medium capitalize transition -mb-px ${
                active === value
                    ? 'text-text-primary'
                    : 'border-transparent text-text-secondary hover:text-text-primary'
            }`}
        >
            {children}
        </button>
    );
};

interface TabsContentProps {
    value: string;
    className?: string;
    children: React.ReactNode;
}

export const TabsContent: React.FC<TabsContentProps> = ({ value, className = '', children }) => {
    const { active } = useContext(TabsContext);
    if (active !== value) return null;
    return <div className={className}>{children}</div>;
};