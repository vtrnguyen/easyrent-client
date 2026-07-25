"use client";

import Header from "./header";
import LandlordSidebar from "./landlord-sidebar";

interface LandlordLayoutProps {
    children: React.ReactNode;
}

export default function LandlordLayout({ children }: LandlordLayoutProps) {
    return (
        <div className="flex min-h-screen">
            <LandlordSidebar />

            <div className="flex-1">
                <Header />

                <main className="p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}