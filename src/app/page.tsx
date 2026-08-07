'use client';

import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import { postApi } from '@/api/post.api';
import PostCard from '@/shared/components/post/post-card';
import PropertySearchForm from '@/shared/components/property-search/property-search-form';
import TenantLayout from '@/shared/layouts/tenant-layout';
import { Post } from '@/types/post';
import { FilterLogics, SortOrder } from '@/types/search';

export default function Home() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let active = true;
        postApi
            .searchPublished({ page: 1, limit: 8, filter_logic: FilterLogics.And, filters: [], sorts: [{ field: 'published_at', direction: SortOrder.Descending }] })
            .then((result) => { if (active) setPosts(result.items); })
            .catch((error) => toast.error((error as Error).message))
            .finally(() => { if (active) setLoading(false); });
        return () => { active = false; };
    }, []);

    return (
        <TenantLayout>
            <div className="mx-auto max-w-7xl space-y-10">
                <PropertySearchForm />
                <section className="space-y-5">
                    <div>
                        <p className="text-sm font-semibold tracking-[0.18em] text-slate-500 uppercase">Nơi ở dành cho bạn</p>
                        <h2 className="mt-1 text-2xl font-semibold text-slate-900">Bài đăng mới nhất</h2>
                    </div>
                    {loading ? (
                        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                            {Array.from({ length: 8 }).map((_, index) => <div key={index} className="h-96 animate-pulse rounded-2xl bg-slate-200" />)}
                        </div>
                    ) : posts.length ? (
                        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                            {posts.map((post) => <PostCard key={post.id} post={post} />)}
                        </div>
                    ) : (
                        <div className="rounded-2xl border border-dashed border-slate-300 bg-white py-14 text-center text-slate-500">Chưa có bài đăng phù hợp.</div>
                    )}
                </section>
            </div>
        </TenantLayout>
    );
}
