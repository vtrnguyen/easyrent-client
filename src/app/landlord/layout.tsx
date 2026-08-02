'use client';

import { AccountRole } from '@/common/enums/appEnums';
import AuthGuard from '@/shared/guards/auth-guard';
import Header from '@/shared/layouts/header';
import Sidebar from '@/shared/layouts/sidebar';
import { landlordMenus } from './useLandlordConstants';

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <AuthGuard allowedRoles={[AccountRole.Landlord]}>
            <div className="flex h-screen flex-col overflow-hidden">
                <Header />

                <div className="flex flex-1 overflow-hidden">
                    <Sidebar menus={landlordMenus} />

                    <main className="flex-1 overflow-y-auto p-6">{children}</main>
                </div>
            </div>
        </AuthGuard>
    );
}
