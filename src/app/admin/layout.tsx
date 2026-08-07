'use client';

import { useCallback, useState } from 'react';

import AuthGuard from '@/shared/guards/auth-guard';
import Header from '@/shared/layouts/header';
import Sidebar from '@/shared/layouts/sidebar';

import { adminMenus } from './useAdminConstants';
import { Roles } from '@/common/constants/appConstants';

interface LayoutProps {
    children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const closeSidebar = useCallback(() => setSidebarOpen(false), []);

    return (
        <AuthGuard allowedRoles={[Roles.Admin]}>
            <div className="flex h-dvh flex-col overflow-hidden bg-slate-50">
                <Header onOpenSidebar={() => setSidebarOpen(true)} />

                <div className="flex flex-1 overflow-hidden">
                    <Sidebar menus={adminMenus} open={sidebarOpen} onClose={closeSidebar} />

                    <main className="min-w-0 flex-1 overflow-y-auto p-4 sm:p-6">{children}</main>
                </div>
            </div>
        </AuthGuard>
    );
}
