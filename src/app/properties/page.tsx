import { Suspense } from 'react';

import TenantLayout from '@/shared/layouts/tenant-layout';
import PropertySearchPage from './property-search-page';

export default function PropertiesPage() {
    return (
        <TenantLayout>
            <Suspense fallback={<div className="mx-auto min-h-96 max-w-7xl animate-pulse rounded-2xl bg-white" />}>
                <PropertySearchPage />
            </Suspense>
        </TenantLayout>
    );
}
