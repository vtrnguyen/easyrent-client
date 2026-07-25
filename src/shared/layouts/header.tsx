"use client";

import LogoutButton from "@/shared/components/buttons/logout-button";
import { useAuthStore } from "@/stores/auth.store";

export default function Header() {
    const user = useAuthStore(
        (state) => state.user
    );

    return (
        <header className="border-b p-4 flex items-center justify-between gap-4">
            <div>
                <h1 className="font-semibold">
                    Xin chào
                </h1>
                <div className="text-sm text-zinc-500">
                    {user?.userId}
                </div>
            </div>
            <LogoutButton />
        </header>
    );
}