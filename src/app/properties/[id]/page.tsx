'use client';

import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FiMapPin, FiMaximize2, FiUsers } from 'react-icons/fi';

import { postApi } from '@/api/post.api';
import { propertyApi } from '@/api/property.api';
import PostCard from '@/shared/components/post/post-card';
import TenantLayout from '@/shared/layouts/tenant-layout';
import { Post } from '@/types/post';
import { Property } from '@/types/property';
import { FilterLogics, SearchOperator, SortOrder } from '@/types/search';

export default function TenantPropertyDetailPage() {
    const { id } = useParams<{ id: string }>();
    const [property, setProperty] = useState<Property | null>(null);
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let active = true;
        Promise.all([
            propertyApi.getById(id),
            postApi.searchPublished({ page: 1, limit: 12, filter_logic: FilterLogics.And, filters: [{ field: 'property_id', operator: SearchOperator.Equals, value: id }], sorts: [{ field: 'published_at', direction: SortOrder.Descending }] }),
        ]).then(([propertyData, postData]) => {
            if (active) { setProperty(propertyData); setPosts(postData.items); }
        }).catch((error) => toast.error((error as Error).message)).finally(() => { if (active) setLoading(false); });
        return () => { active = false; };
    }, [id]);

    if (loading) return <TenantLayout><div className="mx-auto h-96 max-w-7xl animate-pulse rounded-2xl bg-white" /></TenantLayout>;
    if (!property) return <TenantLayout><div className="py-20 text-center text-slate-500">Không tìm thấy chỗ ở.</div></TenantLayout>;

    const location = [property.address, property.ward, property.district, property.province].filter(Boolean).join(', ');
    const thumbnail = property.images.find((image) => image.isThumbnail) ?? property.images[0];
    return (
        <TenantLayout>
            <div className="mx-auto max-w-7xl space-y-10">
                <section className="grid gap-7 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:grid-cols-[1.1fr_0.9fr]">
                    <div className="relative min-h-72 overflow-hidden rounded-2xl bg-slate-100 lg:min-h-[430px]">
                        {thumbnail ? <Image src={thumbnail.imageUrl} alt={property.title} fill unoptimized className="object-cover" /> : <div className="flex h-full items-center justify-center text-slate-400">Chưa có hình ảnh</div>}
                    </div>
                    <div className="space-y-5 py-2">
                        <div><p className="text-sm font-semibold text-blue-700">Chỗ ở đang cho thuê</p><h1 className="mt-1 text-3xl font-semibold text-slate-900">{property.title}</h1></div>
                        <p className="flex gap-2 text-slate-600"><FiMapPin className="mt-1 shrink-0" />{location}</p>
                        <div className="flex flex-wrap gap-5 text-slate-600"><span className="flex items-center gap-2"><FiMaximize2 />{property.area} m²</span><span className="flex items-center gap-2"><FiUsers />Tối đa {property.maxPeople} người</span></div>
                        <p className="text-2xl font-semibold text-blue-700">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 }).format(property.price)} <span className="text-sm font-normal text-slate-500">/ tháng</span></p>
                        <div className="border-t border-slate-100 pt-5"><h2 className="font-semibold text-slate-900">Mô tả</h2><p className="mt-2 whitespace-pre-wrap text-sm leading-7 text-slate-600">{property.description || 'Chưa có mô tả.'}</p></div>
                    </div>
                </section>
                <section className="space-y-5">
                    <div><p className="text-sm font-semibold tracking-wider text-slate-500 uppercase">Bài đăng liên quan</p><h2 className="mt-1 text-2xl font-semibold text-slate-900">Thông tin cho thuê tại chỗ ở này</h2></div>
                    {posts.length ? <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{posts.map((post) => <PostCard key={post.id} post={post} />)}</div> : <div className="rounded-2xl border border-dashed border-slate-300 bg-white py-12 text-center text-slate-500">Chưa có bài đăng nào cho chỗ ở này.</div>}
                </section>
            </div>
        </TenantLayout>
    );
}
