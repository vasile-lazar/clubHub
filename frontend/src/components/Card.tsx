// Card.tsx
import React from "react";

export const Card: React.FC<{ className?: string; children: React.ReactNode }> = ({ children, className }) => (
    <div className={`border-border-default rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 ${className || ""}`}>{children}</div>
);

export const CardHeader: React.FC<{ className?: string; children: React.ReactNode }> = ({ children, className }) => (
    <div className={`mb-1 flex justify-between items-center ${className || ""}`}>{children}</div>
);

export const CardContent: React.FC<{ className?: string; children: React.ReactNode }> = ({ children, className }) => (
    <div className={className || ""}>{children}</div>
);

export const CardTitle: React.FC<{ className?: string; children: React.ReactNode }> = ({ children, className }) => (
    <h3 className={`text-text-primary font-semibold ${className || ""}`}>{children}</h3>
);

export const Badge: React.FC<{ variant?: "outline"; className?: string; children: React.ReactNode }> = ({ children, variant, className }) => (
    <span className={`px-2 py-0.5 text-xs text-text-secondary rounded ${variant === "outline" ? "border" : "bg-gray-200"} ${className || ""}`}>
        {children}
    </span>
);
