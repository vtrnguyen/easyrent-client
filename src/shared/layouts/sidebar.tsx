"use client";

import Link from "next/link";

export default function Sidebar() {
    return (
        <aside className="w-64 h-screen border-r p-4">
            <h2 className="font-bold text-xl">
                EasyRent
            </h2>

            <nav className="mt-6 flex flex-col gap-3">
                <Link href="/admin">Dashboard</Link>
                <Link href="/admin/users">Người dùng</Link>
            </nav>
        </aside>
    );
}