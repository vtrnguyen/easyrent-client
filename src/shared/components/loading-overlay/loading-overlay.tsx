'use client';

interface LoadingOverlayProps {
    open: boolean;
    loadingText?: string;
}

export default function LoadingOverlay({ open, loadingText }: LoadingOverlayProps) {
    if (!open) {
        return null;
    }

    return (
        <div className="pointer-events-none fixed inset-0 z-[9999] flex items-center justify-center">
            <div className="flex flex-col items-center gap-3">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-300 border-t-blue-600" />

                {loadingText && <p className="text-sm font-medium text-slate-700">{loadingText}</p>}
            </div>
        </div>
    );
}
