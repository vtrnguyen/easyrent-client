'use client';

import Image from 'next/image';
import { ChangeEvent } from 'react';
import { FiImage } from 'react-icons/fi';

import Button from '../buttons/button';

interface AvatarUploadProps {
    previewUrl?: string;
    onChange?: (file: File) => void;
}

export default function AvatarUpload({ previewUrl, onChange }: AvatarUploadProps) {
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (!file) {
            return;
        }

        onChange?.(file);
    };

    return (
        <div className="flex flex-col items-center gap-4">
            <div className="relative h-40 w-40 overflow-hidden rounded-full border border-slate-300 bg-slate-100">
                {previewUrl ? (
                    <Image src={previewUrl} alt="Avatar" fill className="object-cover" />
                ) : (
                    <div className="flex h-full w-full items-center justify-center text-slate-400">
                        <FiImage size={56} />
                    </div>
                )}
            </div>

            <label>
                <input hidden type="file" accept="image/*" onChange={handleChange} />

                <Button type="button" variant="secondary">
                    Chọn ảnh
                </Button>
            </label>
        </div>
    );
}
