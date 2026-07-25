"use client";

import { useAuthStore } from "@/stores/auth.store";
import { useRouter } from "next/navigation";
import Button from "../components/buttons/button";
import { authStorage } from "@/common/helpers/helper";

export default function Header() {
    const router = useRouter();
    const user = useAuthStore((state) => state.user);
    const logout = useAuthStore((state) => state.logout);

    const handleLogout = () => {
        authStorage.clear();
        logout();
        router.replace("/auth/login");
    };

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
            <Button onClick={handleLogout}>Đăng xuất</Button>
        </header>
    );
}