'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FiHeart } from 'react-icons/fi';
import { postFavoriteApi } from '@/api/post-favorite.api';
import { usePostFavoriteStore } from '@/stores/post-favorite.store';
import { Post } from '@/types/post';

export default function PostFavoriteMenu() {
    const pathname = usePathname();
    const ids = usePostFavoriteStore((s) => s.ids);
    const initialized = usePostFavoriteStore((s) => s.initialized);
    const load = usePostFavoriteStore((s) => s.load);
    const [posts, setPosts] = useState<Post[]>([]);
    useEffect(() => {
        void load();
    }, [load]);
    useEffect(() => {
        if (!initialized || pathname === '/favorites') return;
        let active = true;
        postFavoriteApi
            .search(1, 4)
            .then((result) => {
                if (active) setPosts(result.items);
            })
            .catch(() => undefined);
        return () => {
            active = false;
        };
    }, [ids, initialized, pathname]);
    return (
        <div className="group relative">
            <Link
                href="/favorites"
                className="flex h-10 items-center gap-2 rounded-lg px-2.5 text-sm font-medium text-slate-700 hover:bg-slate-100"
            >
                <span className="relative">
                    <FiHeart className="h-5 w-5" />
                    {ids.length > 0 && (
                        <span className="absolute -top-2 -right-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-rose-500 px-1 text-[10px] text-white">
                            {ids.length}
                        </span>
                    )}
                </span>
                <span className="hidden lg:inline">Yêu thích</span>
            </Link>
            <div className="invisible absolute top-full right-0 z-50 w-[min(360px,calc(100vw-2rem))] pt-2 opacity-0 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl">
                    <p className="border-b border-slate-200 px-4 py-3 font-semibold">Bài đăng yêu thích</p>
                    <div className="max-h-80 overflow-y-auto p-2">
                        {posts.length ? (
                            posts.map((post) => (
                                <Link
                                    key={post.id}
                                    href={`/posts/${post.id}`}
                                    className="block rounded-lg p-3 hover:bg-slate-50"
                                >
                                    <p className="line-clamp-2 text-sm font-medium">{post.title}</p>
                                    <p className="mt-1 text-xs text-slate-500">{post.propertyTitle}</p>
                                </Link>
                            ))
                        ) : (
                            <p className="px-3 py-8 text-center text-sm text-slate-500">
                                Bạn chưa có bài đăng yêu thích.
                            </p>
                        )}
                    </div>
                    <Link
                        href="/favorites"
                        className="block border-t border-slate-200 px-4 py-3 text-center text-sm font-semibold text-gray-600 hover:bg-gray-50"
                    >
                        Xem tất cả
                    </Link>
                </div>
            </div>
        </div>
    );
}
