'use client';

import Image from 'next/image';
import { MouseEventHandler } from 'react';

import { cn } from '@/common/helpers/helper';

interface AvatarProps {
    src?: string | null;
    name?: string | null;
    showName?: boolean;
    namePosition?: 'left' | 'right';
    size?: 'sm' | 'md' | 'lg';
    className?: string;
    onClick?: MouseEventHandler<HTMLButtonElement>;
}

export default function Avatar({
    src,
    name,
    showName = false,
    namePosition = 'right',
    size = 'md',
    className,
    onClick,
}: AvatarProps) {
    const sizeClass = {
        sm: 'h-8 w-8 text-xs',
        md: 'h-10 w-10 text-sm',
        lg: 'h-14 w-14 text-lg',
    };

    const firstLetter = name?.trim()?.charAt(0)?.toUpperCase() ?? '?';

    const avatar = (
        <div
            className={cn(
                'relative flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-slate-200 font-semibold text-slate-600',
                sizeClass[size],
            )}
        >
            {src ? <Image src={src} alt={name ?? 'Avatar'} fill className="object-cover" /> : firstLetter}
        </div>
    );

    const content = showName ? (
        <>
            <span className="text-sm font-medium whitespace-nowrap text-slate-800">{name}</span>

            {avatar}
        </>
    ) : (
        avatar
    );

    const wrapperClass = cn(
        'flex items-center gap-3 outline-none',
        showName && (namePosition === 'left' ? 'flex-row-reverse' : 'flex-row'),
        onClick && 'cursor-pointer transition-opacity hover:opacity-90',
        className,
    );

    if (onClick) {
        return (
            <button type="button" onClick={onClick} className={wrapperClass}>
                {content}
            </button>
        );
    }

    return <div className={wrapperClass}>{content}</div>;
}
