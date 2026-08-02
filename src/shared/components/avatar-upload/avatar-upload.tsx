'use client';

import Image from 'next/image';
import { ChangeEvent, useRef } from 'react';
import { FiImage } from 'react-icons/fi';

import Button from '../buttons/button';

interface AvatarUploadProps {
    value?: string;
    onChange: (file: File) => void;
}

export default function AvatarUpload({ value, onChange }: AvatarUploadProps) {
    const inputRef = useRef<HTMLInputElement>(null);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (!file) {
            return;
        }

        onChange(file);
    };

    return (
        <div className="flex flex-col items-center gap-4">
            <div className="relative h-40 w-40 overflow-hidden rounded-full border border-slate-300 bg-slate-100">
                {value ? (
                    <Image src={value} alt="Avatar" fill className="object-cover" unoptimized />
                ) : (
                    <div className="flex h-full w-full items-center justify-center text-slate-400">
                        <FiImage size={56} />
                    </div>
                )}
            </div>

            <input ref={inputRef} hidden type="file" accept="image/*" onChange={handleChange} />

            <Button type="button" variant="secondary" onClick={() => inputRef.current?.click()}>
                Chọn ảnh
            </Button>
        </div>
    );
}
