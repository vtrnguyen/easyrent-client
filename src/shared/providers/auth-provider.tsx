"use client";

import { authStorage } from "@/common/helpers/helper";
import { useAuthStore } from "@/stores/auth.store";
import { useEffect } from "react";
import "@/services/interceptor";

export default function AuthProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const setUser = useAuthStore((state) => state.setUser);
    const setHydrated = useAuthStore((state) => state.setHydrated);

    useEffect(() => {
        const authData = authStorage.get();

        if (authData) {
            setUser(authData);
        }

        setHydrated(true);
    }, [setHydrated, setUser]);

    return children;
}