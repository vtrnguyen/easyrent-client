"use client";

import { getHomeRoute } from "@/common/helpers/helper";
import { useAuthStore } from "@/stores/auth.store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface GuestGuardProps {
    children: React.ReactNode;
}

export default function GuestGuard({ children }: GuestGuardProps) {
    const router = useRouter();

    const user = useAuthStore((state) => state.user);
    const isHydrated = useAuthStore((state) => state.isHydrated);

    useEffect(() => {
        if (!isHydrated) {
            return;
        }

        if (user) {
            router.replace(getHomeRoute(user.role));
        }
    }, [isHydrated, user, router]);

    if (!isHydrated) {
        return null;
    }

    return children;
}