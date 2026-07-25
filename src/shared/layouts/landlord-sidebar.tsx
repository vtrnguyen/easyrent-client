"use client";

import Link from "next/link";

export default function LandlordSidebar() {
    return (
        <aside className="w-64 h-screen border-r p-4">
            <h2 className="font-bold text-xl">
                EasyRent Landlord
            </h2>

            <nav className="mt-6 flex flex-col gap-3">
                <Link href="/landlord">Dashboard</Link>
                <Link href="/landlord/properties">Nơi ở</Link>
            </nav>
        </aside>
    );
}