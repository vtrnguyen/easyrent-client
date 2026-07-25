"use client";

import { appRoutes } from "@/common/constants/appConstants";
import { AccountRole } from "@/common/enums/appEnums";
import { getHomeRoute } from "@/common/helpers/helper";
import { useAuthStore } from "@/stores/auth.store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface AuthGuardProps {
    allowedRoles: AccountRole[];
    children: React.ReactNode;
}

export default function AuthGuard({
    allowedRoles,
    children,
}: AuthGuardProps) {
    const router = useRouter();

    const user = useAuthStore((state) => state.user);
    const isHydrated = useAuthStore((state) => state.isHydrated);
    const hasPermission = user ? allowedRoles.includes(user.role) : false;

    useEffect(() => {
        if (!isHydrated) {
            return;
        }

        if (!user) {
            router.replace(`/${appRoutes.auth}/${appRoutes.login}`);
            return;
        }

        if (!hasPermission) {
            router.replace(getHomeRoute(user.role));
        }
    }, [hasPermission, isHydrated, user, router]);

    if (!isHydrated) {
        return null;
    }

    if (!user || !hasPermission) {
        return null;
    }

    return children;
};