"use client";

import { useRouter } from "next/navigation";

import { useAuthStore } from "@/stores/auth.store";
import { authStorage } from "@/common/helpers/helper";

export default function LogoutButton() {
    const router = useRouter();

    const logout = useAuthStore((state) => state.logout);

    const handleLogout = () => {
        authStorage.clear();
        logout();
        router.replace("/auth/login");
    };

    return (
        <button onClick={handleLogout}>
            Đăng xuất
        </button>
    );
}