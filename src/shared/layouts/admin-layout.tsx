"use client";

import Sidebar from "./sidebar";

import Header from "./header";

interface AdminLayoutProps {
    children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
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