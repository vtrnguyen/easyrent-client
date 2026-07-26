'use client';

import { animationDuration } from '@/common/constants/appConstants';
import { ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface DialogProps {
    open: boolean;
    onClose: () => void;
    children: ReactNode;
    width?: string;
    className?: string;
    contentClassName?: string;
    overlayClassName?: string;
    closeOnOverlayClick?: boolean;
}

export default function Dialog({
    open,
    onClose,
    children,
    width = 'max-w-lg',
    className,
    contentClassName,
    overlayClassName,
    closeOnOverlayClick = false,
}: DialogProps) {
    const [mounted, setMounted] = useState(false);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        let timer: ReturnType<typeof setTimeout>;
        let frame: number;

        if (open) {
            frame = requestAnimationFrame(() => {
                setMounted(true);

                requestAnimationFrame(() => {
                    setVisible(true);
                });
            });
        } else if (mounted) {
            frame = requestAnimationFrame(() => {
                setVisible(false);
            });

            timer = setTimeout(() => {
                setMounted(false);
            }, animationDuration);
        }

        return () => {
            cancelAnimationFrame(frame);
            clearTimeout(timer);
        };
    }, [open, mounted]);

    useEffect(() => {
        if (!mounted) {
            return;
        }

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'hidden';

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = '';
        };
    }, [mounted, onClose]);

    if (!mounted) {
        return null;
    }

    return createPortal(
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${
                visible ? 'bg-black/50 opacity-100' : 'bg-black/0 opacity-0'
            } ${overlayClassName ?? ''}`}
            onClick={() => {
                if (closeOnOverlayClick) {
                    onClose();
                }
            }}
        >
            <div
                className={`w-full ${width} rounded-2xl bg-white shadow-xl transition-all duration-300 ease-out ${
                    visible ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-4 scale-95 opacity-0'
                } ${className ?? ''}`}
                onClick={(e) => e.stopPropagation()}
            >
                <div className={contentClassName}>{children}</div>
            </div>
        </div>,
        document.body,
    );
}
