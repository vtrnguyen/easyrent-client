'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import UserMenu from '@/shared/components/user-menu/user-menu';

import { getHomeRoute } from '@/common/helpers/helper';
import { useAuthStore } from '@/stores/auth.store';

export default function Header() {
    const router = useRouter();

    const user = useAuthStore((state) => state.user);

    const handleGoHome = () => {
        router.push(getHomeRoute(user?.role));
    };

    return (
        <header className="flex h-20 items-center justify-between border-b border-slate-200 bg-white px-12">
            <button
                type="button"
                onClick={handleGoHome}
                className="flex cursor-pointer items-center gap-1 text-xl font-bold text-slate-900"
                aria-label="Về trang chủ"
            >
                <div className="relative h-20 w-20">
                    <Image
                        src="/easyrent_logo_without_text.png"
                        alt="EasyRent"
                        fill
                        className="object-contain"
                        priority
                    />
                </div>

                <p className="text-green-500">EasyRent</p>
            </button>

            <UserMenu />
        </header>
    );
}
