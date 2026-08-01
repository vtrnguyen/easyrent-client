'use client';

import clsx from 'clsx';

import Button from '../buttons/button';
import Dialog from '../dialog/dialog';

interface ConfirmationProps {
    open: boolean;
    title?: string;
    message?: string;
    cancelText?: string;
    confirmText?: string;
    loading?: boolean;
    width?: string;
    className?: string;
    closeOnOverlayClick?: boolean;
    onCancel: () => void;
    onConfirm: () => void;
}

export default function Confirmation({
    open,
    title = 'Xác nhận',
    message,
    cancelText = 'Hủy',
    confirmText = 'OK',
    loading = false,
    width = 'max-w-md',
    className,
    closeOnOverlayClick = false,
    onCancel,
    onConfirm,
}: ConfirmationProps) {
    return (
        <Dialog open={open} onClose={onCancel} width={width} closeOnOverlayClick={closeOnOverlayClick}>
            <div className={clsx('flex min-h-72 flex-col p-6 text-center', className)}>
                <div className="flex flex-1 items-center justify-center">
                    <div>
                        <h3 className="text-2xl font-semibold text-slate-900">{title}</h3>

                        {message && <p className="mt-2 text-base leading-6 text-slate-500">{message}</p>}
                    </div>
                </div>

                <div className="mt-6 flex justify-center gap-3">
                    <Button variant="primary" disabled={loading} onClick={onCancel}>
                        {cancelText}
                    </Button>

                    <Button variant="blue" disabled={loading} onClick={onConfirm}>
                        {confirmText}
                    </Button>
                </div>
            </div>
        </Dialog>
    );
}
