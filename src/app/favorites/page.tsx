'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FiHeart } from 'react-icons/fi';
import { postFavoriteApi } from '@/api/post-favorite.api';
import Pagination from '@/shared/components/pagination/pagination';
import TenantLayout from '@/shared/layouts/tenant-layout';
import useLoadingOverlay from '@/shared/hooks/useLoadingOverlay';
import { usePostFavoriteStore } from '@/stores/post-favorite.store';
import { Post } from '@/types/post';

const pageSize = 12;
export default function FavoritesPage() {
    const loading = useLoadingOverlay();
    const [page, setPage] = useState(1);
    const [posts, setPosts] = useState<Post[]>([]);
    const [total, setTotal] = useState(0);
    const ids = usePostFavoriteStore((s) => s.ids);
    const initialized = usePostFavoriteStore((s) => s.initialized);
    const load = usePostFavoriteStore((s) => s.load);
    const toggle = usePostFavoriteStore((s) => s.toggle);
    useEffect(() => {
        void load();
    }, [load]);
    useEffect(() => {
        if (!initialized) return;
        let active = true;
        loading.open();
        postFavoriteApi
            .search(page, pageSize)
            .then((result) => {
                if (active) {
                    setPosts(result.items);
                    setTotal(result.total);
                }
            })
            .catch((error) => {
                if (active) toast.error((error as Error).message);
            })
            .finally(() => {
                if (active) loading.close();
            });
        return () => {
            active = false;
        };
    }, [ids, initialized, loading, page]);
    return (
        <TenantLayout>
            <div className="mx-auto max-w-5xl space-y-6">
                <div className="flex flex-wrap items-end justify-between gap-4">
                    <div>
                        <h1 className="mt-1 text-3xl font-semibold">Bài đăng yêu thích</h1>
                        <p className="mt-2 text-sm text-slate-500">Bạn đang lưu {total} bài đăng.</p>
                    </div>
                    <Pagination totalRecords={total} pageSize={pageSize} currentPage={page} onPageChange={setPage} />
                </div>
                {posts.length ? (
                    <div className="grid gap-4 md:grid-cols-2">
                        {posts.map((post) => (
                            <article
                                key={post.id}
                                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                            >
                                <div className="flex items-start justify-between gap-3">
                                    <div>
                                        <h2 className="line-clamp-2 text-lg font-semibold">{post.title}</h2>
                                        <p className="mt-1 text-sm text-slate-500">{post.propertyTitle}</p>
                                    </div>
                                    <button
                                        type="button"
                                        aria-label="Bỏ yêu thích"
                                        onClick={() => void toggle(post.id)}
                                        className="text-rose-500"
                                    >
                                        <FiHeart className="h-5 w-5 fill-current" />
                                    </button>
                                </div>
                                <p className="mt-4 line-clamp-3 text-sm text-slate-600">{post.content}</p>
                                <Link
                                    href={`/posts/${post.id}`}
                                    className="mt-4 inline-block text-sm font-semibold text-blue-600"
                                >
                                    Xem chi tiết
                                </Link>
                            </article>
                        ))}
                    </div>
                ) : (
                    <div className="rounded-2xl border border-dashed bg-white py-20 text-center text-slate-500">
                        Bạn chưa có bài đăng yêu thích.
                    </div>
                )}
            </div>
        </TenantLayout>
    );
}
