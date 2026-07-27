'use client';

import { createContext, ReactNode, useContext, useMemo, useState } from 'react';

import LoadingOverlay from './loading-overlay';

interface LoadingContextValue {
    open: () => void;
    close: () => void;
    setLoading: (loading: boolean) => void;
}

const LoadingContext = createContext<LoadingContextValue | null>(null);

export function LoadingOverlayProvider({ children }: { children: ReactNode }) {
    const [loading, setLoading] = useState(false);

    const value = useMemo(
        () => ({
            open: () => setLoading(true),
            close: () => setLoading(false),
            setLoading,
        }),
        [],
    );

    return (
        <LoadingContext.Provider value={value}>
            {children}

            <LoadingOverlay open={loading} />
        </LoadingContext.Provider>
    );
}

export function useLoadingOverlayContext() {
    const context = useContext(LoadingContext);

    if (!context) {
        throw new Error('useLoadingOverlay must be used inside LoadingOverlayProvider');
    }

    return context;
}
