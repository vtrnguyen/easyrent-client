'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import Avatar from '@/shared/components/avatar/avatar';
import Button from '@/shared/components/buttons/button';

import { authStorage, getHomeRoute } from '@/common/helpers/helper';
import { useAuthStore } from '@/stores/auth.store';

export default function Header() {
    const router = useRouter();

    const user = useAuthStore((state) => state.user);
    const logout = useAuthStore((state) => state.logout);

    const handleLogout = () => {
        authStorage.clear();
        logout();
        router.replace('/auth/login');
    };

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

            <div className="flex items-center gap-4">
                <Avatar src={user?.avatarUrl} name={user?.fullName} showName size="md" />

                <Button onClick={handleLogout}>Đăng xuất</Button>
            </div>
        </header>
    );
}
