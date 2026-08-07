'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FiMenu } from 'react-icons/fi';

import UserMenu from '@/shared/components/user-menu/user-menu';

import { getHomeRoute } from '@/common/helpers/helper';
import { useAuthStore } from '@/stores/auth.store';

interface HeaderProps {
    onOpenSidebar?: () => void;
}

export default function Header({ onOpenSidebar }: HeaderProps) {
    const router = useRouter();

    const user = useAuthStore((state) => state.user);

    const handleGoHome = () => {
        router.push(getHomeRoute(user?.role));
    };

    return (
        <header className="flex h-16 shrink-0 items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-6 lg:h-20 lg:px-12">
            <button
                type="button"
                onClick={onOpenSidebar}
                className="mr-2 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-slate-700 transition hover:bg-slate-100 lg:hidden"
                aria-label="Mở menu điều hướng"
            >
                <FiMenu className="h-6 w-6" />
            </button>
            <button
                type="button"
                onClick={handleGoHome}
                className="mr-auto flex min-w-0 cursor-pointer items-center gap-1 text-lg font-bold text-slate-900 sm:text-xl"
                aria-label="Về trang chủ"
            >
                <div className="relative h-14 w-14 shrink-0 lg:h-20 lg:w-20">
                    <Image
                        src="/easyrent_logo_without_text.png"
                        alt="EasyRent"
                        fill
                        className="object-contain"
                        priority
                    />
                </div>

                <p className="hidden text-green-500 sm:block">EasyRent</p>
            </button>

            <UserMenu />
        </header>
    );
}
