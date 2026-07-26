"use client";

import { AccountRole } from "@/common/enums/appEnums";
import AuthGuard from "../guards/auth-guard";
import TenantHeader from "./tenant-header";

interface TenantLayoutProps {
    children: React.ReactNode;
}

export default function TenantLayout({ children }: TenantLayoutProps) {
    return (
        <AuthGuard allowedRoles={[AccountRole.Tenant]}>
            <div className="flex-1">
                <TenantHeader />

                <main className="p-6">
                    {children}
                </main>
            </div>
        </AuthGuard>
    );
}