'use client';

import { useAuthStore } from '@/stores/auth.store';
import { useRouter } from 'next/navigation';
import { getHomeRoute } from '@/common/helpers/helper';
import Image from 'next/image';
import UserMenu from '../components/user-menu/user-menu';

export default function TenantHeader() {
    const router = useRouter();
    const user = useAuthStore((state) => state.user);

    const handleGoHome = () => {
        router.push(getHomeRoute(user?.role));
    };

    return (
        <header className="flex h-16 shrink-0 items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-6 lg:h-20 lg:px-10">
            <button
                type="button"
                onClick={handleGoHome}
                className="flex min-w-0 cursor-pointer items-center gap-1 text-lg font-bold text-slate-900 sm:text-xl"
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

            <div className="flex items-center gap-4">
                <UserMenu />
            </div>
        </header>
    );
}
