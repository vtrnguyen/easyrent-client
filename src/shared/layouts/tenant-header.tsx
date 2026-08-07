'use client';

import { useAuthStore } from '@/stores/auth.store';
import { useRouter } from 'next/navigation';
import { getHomeRoute } from '@/common/helpers/helper';
import Image from 'next/image';
import UserMenu from '../components/user-menu/user-menu';
import { FiMail, FiPhone } from 'react-icons/fi';
import PostFavoriteMenu from '../components/post-favorite/post-favorite-menu';

export default function TenantHeader() {
    const router = useRouter();
    const user = useAuthStore((state) => state.user);

    const handleGoHome = () => {
        router.push(getHomeRoute(user?.role));
    };

    return (
        <header className="sticky top-0 z-40 shrink-0 border-b border-slate-200 bg-white shadow-sm">
            <div className="flex h-16 items-center justify-between gap-3 px-4 sm:px-6 lg:h-20 lg:px-10">
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

                <div className="flex items-center gap-1 sm:gap-3">
                    <div className="hidden items-center gap-5 text-sm text-slate-600 md:flex">
                        <a
                            href="tel:0686868688"
                            className="group flex items-center gap-2 transition hover:text-blue-600"
                        >
                            <FiPhone className="h-4 w-4 text-slate-400 transition group-hover:text-blue-600" />
                            0686868688
                        </a>
                        <a
                            href="mailto:info@easyrent.com.vn"
                            className="group flex items-center gap-2 transition hover:text-blue-600"
                        >
                            <FiMail className="h-4 w-4 text-slate-400 transition group-hover:text-blue-600" />
                            info@easyrent.com.vn
                        </a>
                    </div>
                    <select
                        aria-label="Chọn ngôn ngữ"
                        defaultValue="vi"
                        className="h-9 cursor-pointer rounded-lg border border-slate-200 bg-white px-1.5 text-xs text-slate-700 transition outline-none sm:px-2"
                    >
                        <option value="vi">🇻🇳 VN</option>
                        <option value="en">🇬🇧 EN</option>
                        <option value="ja">🇯🇵 JA</option>
                    </select>
                    <PostFavoriteMenu />
                    <UserMenu />
                </div>
            </div>
        </header>
    );
}
