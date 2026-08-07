import Image from 'next/image';
import Link from 'next/link';
import { FiMapPin, FiMaximize2, FiUsers } from 'react-icons/fi';

import { getPropertyTypeValue } from '@/common/helpers/helper';
import { PropertyTypes } from '@/common/constants/appConstants';
import { Property } from '@/types/property';

export default function PropertyCard({ property }: { property: Property }) {
    const thumbnail = property.images.find((image) => image.isThumbnail) ?? property.images[0];
    const location = [property.address, property.ward, property.district, property.province].filter(Boolean).join(', ');

    return (
        <Link href={`/properties/${property.id}`} className="block overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            <div className="relative aspect-[4/3] bg-slate-100">
                {thumbnail ? (
                    <Image
                        src={thumbnail.imageUrl}
                        alt={property.title}
                        fill
                        unoptimized
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    />
                ) : (
                    <div className="flex h-full items-center justify-center text-sm text-slate-400">
                        Chưa có hình ảnh
                    </div>
                )}
                <span className="absolute top-3 left-3 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-slate-700 shadow-sm">
                    {getPropertyTypeValue(property.type as PropertyTypes)}
                </span>
            </div>

            <div className="space-y-3 p-4">
                <h2 className="line-clamp-2 text-lg font-semibold text-slate-900">{property.title}</h2>
                <p className="flex min-h-10 items-start gap-2 text-sm text-slate-500">
                    <FiMapPin className="mt-0.5 shrink-0" />
                    <span className="line-clamp-2">{location}</span>
                </p>
                <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600">
                    <span className="flex items-center gap-1.5">
                        <FiMaximize2 /> {property.area} m²
                    </span>
                    <span className="flex items-center gap-1.5">
                        <FiUsers /> Tối đa {property.maxPeople} người
                    </span>
                </div>
                <p className="text-lg font-semibold text-blue-700">
                    {new Intl.NumberFormat('vi-VN', {
                        style: 'currency',
                        currency: 'VND',
                        maximumFractionDigits: 0,
                    }).format(property.price)}
                    <span className="text-sm font-normal text-slate-500"> / tháng</span>
                </p>
            </div>
        </Link>
    );
}
