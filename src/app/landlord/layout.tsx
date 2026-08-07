'use client';

import { useCallback, useState } from 'react';

import AuthGuard from '@/shared/guards/auth-guard';
import Header from '@/shared/layouts/header';
import Sidebar from '@/shared/layouts/sidebar';
import { landlordMenus } from './useLandlordConstants';
import { Roles } from '@/common/constants/appConstants';

export default function Layout({ children }: { children: React.ReactNode }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const closeSidebar = useCallback(() => setSidebarOpen(false), []);

    return (
        <AuthGuard allowedRoles={[Roles.Landlord]}>
            <div className="flex h-dvh flex-col overflow-hidden bg-slate-50">
                <Header onOpenSidebar={() => setSidebarOpen(true)} />

                <div className="flex flex-1 overflow-hidden">
                    <Sidebar menus={landlordMenus} open={sidebarOpen} onClose={closeSidebar} />

                    <main className="min-w-0 flex-1 overflow-y-auto p-4 sm:p-6">{children}</main>
                </div>
            </div>
        </AuthGuard>
    );
}
