'use client';

import { useCallback, useMemo, useState } from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiChevronDown } from 'react-icons/fi';

import { SidebarMenu } from '@/types/sidebar';

interface SidebarProps {
    menus: SidebarMenu[];
}

export default function Sidebar({ menus }: SidebarProps) {
    const pathname = usePathname();

    const activeDestination = useMemo(() => {
        const destinations: string[] = [];

        menus.forEach((menu) => {
            if ('destination' in menu) {
                destinations.push(menu.destination);
            } else {
                menu.submenu.forEach((submenu) => {
                    destinations.push(submenu.destination);
                });
            }
        });

        return (
            destinations
                .filter((destination) => pathname === destination || pathname.startsWith(`${destination}/`))
                .sort((a, b) => b.length - a.length)[0] ?? ''
        );
    }, [menus, pathname]);

    const isActive = useCallback((destination: string) => destination === activeDestination, [activeDestination]);

    const defaultOpenMenus = useMemo(
        () =>
            menus
                .filter((menu) => 'submenu' in menu && menu.submenu.some((submenu) => isActive(submenu.destination)))
                .map((menu) => menu.text),
        [menus, isActive],
    );

    const [openMenus, setOpenMenus] = useState<string[]>([]);

    const toggleMenu = (menuText: string) => {
        setOpenMenus((prev) =>
            prev.includes(menuText) ? prev.filter((item) => item !== menuText) : [...prev, menuText],
        );
    };

    return (
        <aside className="flex h-full w-64 flex-col border-r border-slate-200 bg-white">
            <nav className="flex-1 overflow-y-auto p-3">
                <div className="space-y-1">
                    {menus.map((menu) => {
                        const MenuIcon = menu.icon;

                        if ('destination' in menu) {
                            const active = isActive(menu.destination);

                            return (
                                <Link
                                    key={menu.text}
                                    href={menu.destination}
                                    className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                                        active ? 'bg-blue-50 text-blue-600' : 'text-slate-700 hover:bg-slate-100'
                                    }`}
                                >
                                    <MenuIcon className="h-5 w-5 shrink-0" />

                                    <span className="flex-1">{menu.text}</span>
                                </Link>
                            );
                        }

                        const hasActiveSubmenu = menu.submenu.some((submenu) => isActive(submenu.destination));

                        const isOpen =
                            hasActiveSubmenu || defaultOpenMenus.includes(menu.text) || openMenus.includes(menu.text);

                        return (
                            <div key={menu.text}>
                                <button
                                    type="button"
                                    onClick={() => toggleMenu(menu.text)}
                                    className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium transition ${
                                        hasActiveSubmenu
                                            ? 'bg-blue-50 text-blue-600'
                                            : 'text-slate-700 hover:bg-slate-100'
                                    }`}
                                >
                                    <MenuIcon className="h-5 w-5 shrink-0" />

                                    <span className="flex-1">{menu.text}</span>

                                    <FiChevronDown
                                        className={`h-4 w-4 transition-transform duration-200 ${
                                            isOpen ? 'rotate-180' : ''
                                        }`}
                                    />
                                </button>

                                <div
                                    className={`overflow-hidden transition-all duration-300 ${
                                        isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                                    }`}
                                >
                                    <div className="mt-1 ml-5 space-y-1 border-l border-slate-200 pl-3">
                                        {menu.submenu.map((submenu) => {
                                            const SubmenuIcon = submenu.icon;
                                            const submenuActive = isActive(submenu.destination);

                                            return (
                                                <Link
                                                    key={submenu.text}
                                                    href={submenu.destination}
                                                    className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition ${
                                                        submenuActive
                                                            ? 'bg-blue-50 font-medium text-blue-600'
                                                            : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                                                    }`}
                                                >
                                                    <SubmenuIcon className="h-4 w-4 shrink-0" />

                                                    <span>{submenu.text}</span>
                                                </Link>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </nav>
        </aside>
    );
}
