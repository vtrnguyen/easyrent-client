'use client';

import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FiChevronLeft, FiChevronRight, FiMapPin, FiMaximize2, FiPlay, FiUsers } from 'react-icons/fi';

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
    const [activeMediaIndex, setActiveMediaIndex] = useState(0);

    useEffect(() => {
        let active = true;
        Promise.all([
            propertyApi.getById(id),
            postApi.searchPublished({
                page: 1,
                limit: 12,
                filter_logic: FilterLogics.And,
                filters: [{ field: 'property_id', operator: SearchOperator.Equals, value: id }],
                sorts: [{ field: 'published_at', direction: SortOrder.Descending }],
            }),
        ])
            .then(([propertyData, postData]) => {
                if (active) {
                    setProperty(propertyData);
                    setPosts(postData.items);
                    setActiveMediaIndex(0);
                }
            })
            .catch((error) => toast.error((error as Error).message))
            .finally(() => {
                if (active) setLoading(false);
            });
        return () => {
            active = false;
        };
    }, [id]);

    if (loading)
        return (
            <TenantLayout>
                <div className="mx-auto h-96 max-w-7xl animate-pulse rounded-2xl bg-white" />
            </TenantLayout>
        );
    if (!property)
        return (
            <TenantLayout>
                <div className="py-20 text-center text-slate-500">Không tìm thấy chỗ ở.</div>
            </TenantLayout>
        );

    const location = [property.address, property.ward, property.district, property.province].filter(Boolean).join(', ');
    const sortedImages = [...property.images].sort((first, second) => {
        if (first.isThumbnail !== second.isThumbnail) return first.isThumbnail ? -1 : 1;
        return first.displayOrder - second.displayOrder;
    });
    const media = [
        ...sortedImages.map((image) => ({ id: image.id, type: 'image' as const, url: image.imageUrl })),
        ...property.videos.map((video) => ({ id: video.id, type: 'video' as const, url: video.videoUrl })),
    ];
    const activeMedia = media[activeMediaIndex];
    const changeMedia = (direction: -1 | 1) => {
        if (media.length < 2) return;
        setActiveMediaIndex((current) => (current + direction + media.length) % media.length);
    };
    return (
        <TenantLayout>
            <div className="mx-auto max-w-7xl space-y-10">
                <section className="grid gap-7 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:grid-cols-[1.1fr_0.9fr]">
                    <div className="min-w-0 space-y-3">
                        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-slate-100 lg:aspect-auto lg:min-h-[430px]">
                            {activeMedia?.type === 'image' && (
                                <Image
                                    src={activeMedia.url}
                                    alt={property.title}
                                    fill
                                    unoptimized
                                    className="object-contain"
                                />
                            )}

                            {activeMedia?.type === 'video' && (
                                <video
                                    key={activeMedia.url}
                                    src={activeMedia.url}
                                    controls
                                    className="absolute inset-0 h-full w-full bg-black object-contain"
                                />
                            )}

                            {!activeMedia && (
                                <div className="flex h-full items-center justify-center text-slate-400">
                                    Chưa có hình ảnh hoặc video
                                </div>
                            )}

                            {media.length > 1 && (
                                <>
                                    <button
                                        type="button"
                                        aria-label="Media trước"
                                        onClick={() => changeMedia(-1)}
                                        className="absolute top-1/2 left-3 z-10 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/90 text-xl text-slate-800 shadow-md transition hover:bg-white"
                                    >
                                        <FiChevronLeft />
                                    </button>
                                    <button
                                        type="button"
                                        aria-label="Media tiếp theo"
                                        onClick={() => changeMedia(1)}
                                        className="absolute top-1/2 right-3 z-10 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/90 text-xl text-slate-800 shadow-md transition hover:bg-white"
                                    >
                                        <FiChevronRight />
                                    </button>
                                    <span className="absolute right-3 bottom-3 rounded-full bg-slate-900/70 px-3 py-1 text-xs font-medium text-white">
                                        {activeMediaIndex + 1} / {media.length}
                                    </span>
                                </>
                            )}
                        </div>

                        {media.length > 1 && (
                            <div className="flex gap-2 overflow-x-auto pb-1">
                                {media.map((item, index) => (
                                    <button
                                        key={`${item.type}-${item.id}`}
                                        type="button"
                                        onClick={() => setActiveMediaIndex(index)}
                                        aria-label={`Xem ${item.type === 'image' ? 'ảnh' : 'video'} ${index + 1}`}
                                        className={`relative h-20 w-28 shrink-0 cursor-pointer overflow-hidden rounded-xl border-2 bg-slate-100 transition ${index === activeMediaIndex ? 'border-blue-600 ring-2 ring-blue-100' : 'border-transparent hover:border-slate-300'}`}
                                    >
                                        {item.type === 'image' ? (
                                            <Image
                                                src={item.url}
                                                alt={`${property.title} ${index + 1}`}
                                                fill
                                                unoptimized
                                                className="object-cover"
                                            />
                                        ) : (
                                            <>
                                                <video
                                                    src={item.url}
                                                    preload="metadata"
                                                    muted
                                                    className="h-full w-full object-cover"
                                                />
                                                <span className="absolute inset-0 flex items-center justify-center bg-black/25 text-xl text-white">
                                                    <FiPlay className="fill-current" />
                                                </span>
                                            </>
                                        )}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="space-y-5 py-2">
                        <div>
                            <p className="text-sm font-semibold text-blue-700">Chỗ ở đang cho thuê</p>
                            <h1 className="mt-1 text-3xl font-semibold text-slate-900">{property.title}</h1>
                        </div>
                        <p className="flex gap-2 text-slate-600">
                            <FiMapPin className="mt-1 shrink-0" />
                            {location}
                        </p>
                        <div className="flex flex-wrap gap-5 text-slate-600">
                            <span className="flex items-center gap-2">
                                <FiMaximize2 />
                                {property.area} m²
                            </span>
                            <span className="flex items-center gap-2">
                                <FiUsers />
                                Tối đa {property.maxPeople} người
                            </span>
                        </div>
                        <p className="text-2xl font-semibold text-blue-700">
                            {new Intl.NumberFormat('vi-VN', {
                                style: 'currency',
                                currency: 'VND',
                                maximumFractionDigits: 0,
                            }).format(property.price)}{' '}
                            <span className="text-sm font-normal text-slate-500">/ tháng</span>
                        </p>
                        <div className="border-t border-slate-100 pt-5">
                            <h2 className="font-semibold text-slate-900">Mô tả</h2>
                            <p className="mt-2 text-sm leading-7 whitespace-pre-wrap text-slate-600">
                                {property.description || 'Chưa có mô tả.'}
                            </p>
                        </div>
                    </div>
                </section>
                <section className="space-y-5">
                    <div>
                        <p className="text-sm font-semibold tracking-wider text-slate-500 uppercase">
                            Bài đăng liên quan
                        </p>
                        <h2 className="mt-1 text-2xl font-semibold text-slate-900">Thông tin cho thuê tại chỗ ở này</h2>
                    </div>
                    {posts.length ? (
                        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {posts.map((post) => (
                                <PostCard key={post.id} post={post} />
                            ))}
                        </div>
                    ) : (
                        <div className="rounded-2xl border border-dashed border-slate-300 bg-white py-12 text-center text-slate-500">
                            Chưa có bài đăng nào cho chỗ ở này.
                        </div>
                    )}
                </section>
            </div>
        </TenantLayout>
    );
}
