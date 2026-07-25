"use client";

import { AccountRole } from "@/common/enums/appEnums";
import AuthGuard from "@/shared/guards/auth-guard";
import TenantLayout from "@/shared/layouts/tenant-layout";

export default function Home() {
    return (
        <AuthGuard allowedRoles={[AccountRole.Tenant]}>
            <TenantLayout>
                <section className="space-y-4">
                    <h1 className="text-3xl font-semibold">Trang chủ Tenant</h1>
                    <p className="text-zinc-600">
                        Đây là trang chính dành cho người dùng có role Tenant.
                    </p>
                </section>
            </TenantLayout>
        </AuthGuard>
    );
}