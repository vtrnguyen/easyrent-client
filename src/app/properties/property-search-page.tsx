'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';

import { propertyApi } from '@/api/property.api';
import Pagination from '@/shared/components/pagination/pagination';
import PropertyCard from '@/shared/components/property-search/property-card';
import PropertySearchForm from '@/shared/components/property-search/property-search-form';
import useLoadingOverlay from '@/shared/hooks/useLoadingOverlay';
import { Property } from '@/types/property';
import { emptyPropertySearchValues, PropertySearchValues } from '@/types/property-search';
import { FilterLogics, SearchFilter, SearchOperator, SortOrder } from '@/types/search';

const pageSize = 12;

function getSearchValues(params: URLSearchParams): PropertySearchValues {
    return Object.fromEntries(
        Object.keys(emptyPropertySearchValues).map((key) => [key, params.get(key) ?? '']),
    ) as unknown as PropertySearchValues;
}

function toPositiveNumber(value: string): number | null {
    const parsedValue = Number(value);
    return value !== '' && Number.isFinite(parsedValue) && parsedValue >= 0 ? parsedValue : null;
}

function buildFilters(values: PropertySearchValues): SearchFilter[] {
    const filters: SearchFilter[] = [];
    const addTextFilter = (field: string, value: string, operator: SearchOperator) => {
        if (value.trim()) filters.push({ field, operator, value: value.trim() });
    };

    addTextFilter('title', values.keyword, SearchOperator.Contains);
    addTextFilter('type', values.type, SearchOperator.Equals);
    addTextFilter('province', values.province, SearchOperator.Equals);
    addTextFilter('district', values.district, SearchOperator.Equals);
    addTextFilter('ward', values.ward, SearchOperator.Equals);
    addTextFilter('address', values.address, SearchOperator.Contains);

    const minPrice = toPositiveNumber(values.minPrice);
    const maxPrice = toPositiveNumber(values.maxPrice);
    const minArea = toPositiveNumber(values.minArea);
    if (minPrice !== null)
        filters.push({ field: 'price', operator: SearchOperator.GreaterThanOrEqual, value: minPrice });
    if (maxPrice !== null) filters.push({ field: 'price', operator: SearchOperator.LessThanOrEqual, value: maxPrice });
    if (minArea !== null) filters.push({ field: 'area', operator: SearchOperator.GreaterThanOrEqual, value: minArea });
    return filters;
}

export default function PropertySearchPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const loading = useLoadingOverlay();
    const queryString = searchParams.toString();
    const values = useMemo(() => getSearchValues(new URLSearchParams(queryString)), [queryString]);
    const currentPage = Math.max(1, Number(searchParams.get('page')) || 1);
    const [properties, setProperties] = useState<Property[]>([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        let cancelled = false;
        const loadProperties = async () => {
            loading.open();
            try {
                const response = await propertyApi.search({
                    page: currentPage,
                    limit: pageSize,
                    filter_logic: FilterLogics.And,
                    filters: buildFilters(values),
                    sorts: [{ field: 'created_at', direction: SortOrder.Descending }],
                });
                if (!cancelled) {
                    setProperties(response.items);
                    setTotal(response.total);
                }
            } catch (error) {
                if (!cancelled) toast.error((error as Error).message || 'Không thể tải danh sách chỗ ở.');
            } finally {
                if (!cancelled) loading.close();
            }
        };
        void loadProperties();
        return () => {
            cancelled = true;
        };
    }, [currentPage, loading, values]);

    const handlePageChange = (page: number) => {
        const params = new URLSearchParams(queryString);
        if (page === 1) params.delete('page');
        else params.set('page', String(page));
        const nextQuery = params.toString();
        router.push(nextQuery ? `/properties?${nextQuery}` : '/properties');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="mx-auto max-w-7xl space-y-6">
            <div>
                <p className="text-sm font-semibold tracking-[0.16em] text-slate-500 uppercase">EasyRent</p>
                <h1 className="mt-1 text-2xl font-semibold text-slate-900 sm:text-3xl">Tìm kiếm chỗ ở</h1>
            </div>
            <PropertySearchForm key={queryString} initialValues={values} />
            <section className="space-y-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                        <h2 className="text-xl font-semibold text-slate-900">Kết quả tìm kiếm</h2>
                        <p className="mt-1 text-sm text-slate-500">Tìm thấy {total} chỗ ở phù hợp</p>
                    </div>
                    <Pagination
                        totalRecords={total}
                        pageSize={pageSize}
                        currentPage={currentPage}
                        onPageChange={handlePageChange}
                    />
                </div>
                {properties.length > 0 ? (
                    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                        {properties.map((property) => (
                            <PropertyCard key={property.id} property={property} />
                        ))}
                    </div>
                ) : (
                    <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
                        <h3 className="font-semibold text-slate-800">Không tìm thấy chỗ ở phù hợp</h3>
                        <p className="mt-2 text-sm text-slate-500">
                            Hãy thử thay đổi khu vực, mức giá hoặc loại chỗ ở.
                        </p>
                    </div>
                )}
                {total > pageSize && (
                    <Pagination
                        totalRecords={total}
                        pageSize={pageSize}
                        currentPage={currentPage}
                        onPageChange={handlePageChange}
                    />
                )}
            </section>
        </div>
    );
}
