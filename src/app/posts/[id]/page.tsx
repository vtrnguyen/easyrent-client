'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { FiHeart } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { postApi } from '@/api/post.api';
import PostContentPreview from '@/shared/components/post-content-preview/post-content-preview';
import TenantLayout from '@/shared/layouts/tenant-layout';
import useLoadingOverlay from '@/shared/hooks/useLoadingOverlay';
import { usePostFavoriteStore } from '@/stores/post-favorite.store';
import { Post } from '@/types/post';

export default function PostDetailPage() {
    const { id } = useParams<{ id: string }>();
    const loading = useLoadingOverlay();
    const [post, setPost] = useState<Post | null>(null);
    const ids = usePostFavoriteStore((s) => s.ids);
    const load = usePostFavoriteStore((s) => s.load);
    const toggle = usePostFavoriteStore((s) => s.toggle);
    useEffect(() => {
        void load();
    }, [load]);
    useEffect(() => {
        let active = true;
        loading.open();
        postApi
            .getById(id)
            .then((data) => {
                if (active) setPost(data);
            })
            .catch((error) => toast.error((error as Error).message))
            .finally(() => {
                if (active) loading.close();
            });
        return () => {
            active = false;
        };
    }, [id, loading]);
    const favorite = ids.includes(id);
    return (
        <TenantLayout>
            <article className="mx-auto max-w-4xl space-y-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
                {post && (
                    <>
                        <div className="flex flex-wrap items-start justify-between gap-4">
                            <div>
                                <p className="text-sm text-slate-500">{post.propertyTitle}</p>
                                <h1 className="mt-1 text-2xl font-semibold sm:text-3xl">{post.title}</h1>
                            </div>
                            <button
                                type="button"
                                onClick={() => void toggle(id).catch((error) => toast.error((error as Error).message))}
                                className={`flex h-10 items-center gap-2 rounded-lg border px-4 text-sm font-semibold ${favorite ? 'border-rose-200 bg-rose-50 text-rose-600' : 'border-slate-200 text-slate-600'}`}
                            >
                                <FiHeart className={favorite ? 'fill-current' : ''} />
                                {favorite ? 'Đã yêu thích' : 'Yêu thích'}
                            </button>
                        </div>
                        <div className="border-t border-slate-100 pt-5">
                            <PostContentPreview content={post.content} contentType={post.contentType} />
                        </div>
                    </>
                )}
            </article>
        </TenantLayout>
    );
}
