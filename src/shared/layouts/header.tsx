'use client';

import { useRouter } from 'next/navigation';

import Avatar from '@/shared/components/avatar/avatar';
import Button from '@/shared/components/buttons/button';

import { authStorage } from '@/common/helpers/helper';
import { useAuthStore } from '@/stores/auth.store';
import Image from 'next/image';

export default function Header() {
    const router = useRouter();
    const user = useAuthStore((state) => state.user);
    const logout = useAuthStore((state) => state.logout);

    const handleLogout = () => {
        authStorage.clear();
        logout();
        router.replace('/auth/login');
    };

    return (
        <header className="flex h-20 items-center justify-between border-b bg-white px-12">
            <div className="flex items-center gap-1 text-xl font-bold text-slate-900">
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
            </div>

            <div className="flex items-center gap-4">
                <Avatar src={user?.avatarUrl} name={user?.fullName} showName size="md" />

                <Button onClick={handleLogout}>Đăng xuất</Button>
            </div>
        </header>
    );
}
