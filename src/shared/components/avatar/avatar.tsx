'use client';

import Image from 'next/image';
import { cn } from '@/common/helpers/helper';

interface AvatarProps {
    src?: string | null;
    name?: string | null;
    showName?: boolean;
    namePosition?: 'left' | 'right';
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}

export default function Avatar({
    src,
    name,
    showName = false,
    namePosition = 'right',
    size = 'md',
    className,
}: AvatarProps) {
    const sizeClass = {
        sm: 'w-8 h-8 text-xs',
        md: 'w-10 h-10 text-sm',
        lg: 'w-14 h-14 text-lg',
    };

    const firstLetter = name?.trim()?.charAt(0)?.toUpperCase() ?? '?';

    const avatar = (
        <div
            className={cn(
                `relative flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-slate-200 font-semibold text-slate-600`,
                sizeClass[size],
                className,
            )}
        >
            {src ? <Image src={src} alt={name ?? 'Avatar'} fill className="object-cover" /> : firstLetter}
        </div>
    );

    if (!showName) {
        return avatar;
    }

    return (
        <div className={cn('flex items-center gap-3', namePosition === 'left' ? 'flex-row-reverse' : 'flex-row')}>
            <span className="text-sm font-medium whitespace-nowrap text-slate-800">{name}</span>

            {avatar}
        </div>
    );
}
