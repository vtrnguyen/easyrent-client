"use client";

import Sidebar from "./sidebar";
import Header from "./header";

interface TenantLayoutProps {
    children: React.ReactNode;
}

export default function TenantLayout({ children }: TenantLayoutProps) {
    return (
        <div className="flex">
            <Sidebar />

            <div className="flex-1">
                <Header />

                <main className="p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}