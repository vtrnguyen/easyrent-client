'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

import Avatar from '@/shared/components/avatar/avatar';

import { authStorage } from '@/common/helpers/helper';
import { useAuthStore } from '@/stores/auth.store';
import ChangePassword from '../change-password/change-password';

export default function UserMenu() {
    const router = useRouter();

    const user = useAuthStore((state) => state.user);
    const logout = useAuthStore((state) => state.logout);

    const [isOpen, setIsOpen] = useState(false);
    const [openChangePassword, setOpenChangePassword] = useState(false);

    const menuRef = useRef<HTMLDivElement>(null);

    const handleLogout = () => {
        authStorage.clear();
        logout();
        router.replace('/auth/login');
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (!menuRef.current?.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div ref={menuRef} className="relative">
            <Avatar src={user?.avatarUrl} name={user?.fullName} showName onClick={() => setIsOpen((prev) => !prev)} />

            {isOpen && (
                <div className="absolute top-full right-0 z-50 mt-2 w-52 rounded-xl border border-slate-200 bg-white py-2 shadow-lg">
                    <button
                        onClick={() => {
                            setIsOpen(false);
                            setOpenChangePassword(true);
                        }}
                        className="w-full cursor-pointer px-4 py-2 text-left text-sm transition-colors hover:bg-slate-100"
                    >
                        Đổi mật khẩu
                    </button>

                    <button
                        onClick={handleLogout}
                        className="w-full cursor-pointer px-4 py-2 text-left text-sm text-red-600 transition-colors hover:bg-red-50"
                    >
                        Đăng xuất
                    </button>
                </div>
            )}

            {openChangePassword && (
                <ChangePassword
                    open={openChangePassword}
                    onClose={() => setOpenChangePassword(false)}
                    onConfirm={async (values) => {
                        console.log(values);
                        setOpenChangePassword(false);
                    }}
                />
            )}
        </div>
    );
}
