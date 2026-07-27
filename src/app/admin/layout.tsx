'use client';

import { AccountRole } from '@/common/enums/appEnums';

import AuthGuard from '@/shared/guards/auth-guard';
import Header from '@/shared/layouts/header';
import Sidebar from '@/shared/layouts/sidebar';

import { adminMenus } from './useAdminConstants';

interface LayoutProps {
    children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    return (
        <AuthGuard allowedRoles={[AccountRole.Admin]}>
            <div className="flex h-screen flex-col overflow-hidden">
                <Header />

                <div className="flex flex-1 overflow-hidden">
                    <Sidebar menus={adminMenus} />

                    <main className="flex-1 overflow-y-auto p-6">{children}</main>
                </div>
            </div>
        </AuthGuard>
    );
}
