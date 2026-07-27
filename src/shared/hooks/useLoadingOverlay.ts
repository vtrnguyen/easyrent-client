'use client';

import { useLoadingOverlayContext } from '@/shared/components/loading-overlay/loading-overlay-provider';

export default function useLoadingOverlay() {
    return useLoadingOverlayContext();
}
