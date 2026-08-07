'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { FiMapPin, FiMaximize2 } from 'react-icons/fi';

import Button from '@/shared/components/buttons/button';
import RentalRequestDialog from '@/shared/components/rental-request/rental-request-dialog';
import { Post } from '@/types/post';

export default function PostCard({ post }: { post: Post }) {
    const [renting, setRenting] = useState(false);
    const price = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 }).format(post.propertyPrice);

    return (
        <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            <Link href={`/posts/${post.id}`} className="block">
                <div className="relative aspect-[4/3] bg-slate-100">
                    {post.thumbnailUrl ? (
                        <Image src={post.thumbnailUrl} alt={post.title} fill unoptimized className="object-cover" sizes="(max-width: 640px) 100vw, 25vw" />
                    ) : (
                        <div className="flex h-full items-center justify-center text-sm text-slate-400">Chưa có hình ảnh</div>
                    )}
                </div>
                <div className="space-y-3 p-4 pb-3">
                    <p className="line-clamp-1 text-xs font-medium text-blue-700">{post.propertyTitle}</p>
                    <h3 className="line-clamp-2 min-h-12 font-semibold text-slate-900">{post.title}</h3>
                    <p className="flex items-start gap-2 text-sm text-slate-500"><FiMapPin className="mt-0.5 shrink-0" /><span className="line-clamp-2">{post.propertyAddress}</span></p>
                    <div className="flex items-center justify-between gap-2">
                        <span className="font-semibold text-blue-700">{price}<small className="font-normal text-slate-500"> / tháng</small></span>
                        <span className="flex items-center gap-1 text-xs text-slate-500"><FiMaximize2 />{post.propertyArea} m²</span>
                    </div>
                </div>
            </Link>
            <div className="px-4 pb-4"><Button variant="blue" fullWidth onClick={() => setRenting(true)}>Thuê ngay</Button></div>
            <RentalRequestDialog open={renting} propertyId={post.propertyId} propertyTitle={post.propertyTitle} onClose={() => setRenting(false)} />
        </article>
    );
}
