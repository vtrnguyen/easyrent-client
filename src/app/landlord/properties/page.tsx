'use client';

import { useCallback, useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';
import { FiPlus, FiSearch, FiTrash2 } from 'react-icons/fi';
import toast from 'react-hot-toast';

import { propertyApi } from '@/api/property.api';
import Badge from '@/shared/components/badge/badge';
import Button from '@/shared/components/buttons/button';
import Confirmation from '@/shared/components/confirmation/confirmation';
import FilterSettings from '@/shared/components/filter-settings/filter-settings';
import Pagination from '@/shared/components/pagination/pagination';
import Table from '@/shared/components/table/table';
import useLoadingOverlay from '@/shared/hooks/useLoadingOverlay';
import { appRoutes, paginatedLimit } from '@/common/constants/appConstants';
import { getFilterDisplayValue } from '@/common/helpers/helper';
import { FilterCondition } from '@/types/filter';
import { FilterLogics, SearchOperator, SearchRequest, SearchSort } from '@/types/search';
import { Property } from '@/types/property';

import { usePropertiesConstants } from './usePropertiesConstants';

export default function AdminPropertiesPage() {
    const router = useRouter();
    const loading = useLoadingOverlay();

    const { propertyFilters, columns } = usePropertiesConstants();

    const [properties, setProperties] = useState<Property[]>([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [sort, setSort] = useState<SearchSort[]>([]);
    const [filters, setFilters] = useState<SearchRequest['filters']>([]);
    const [filterLogic, setFilterLogic] = useState<FilterLogics>(FilterLogics.And);
    const [searchConditions, setSearchConditions] = useState<FilterCondition[]>([]);
    const [draftConditions, setDraftConditions] = useState<FilterCondition[]>([]);
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [isOpenFilterSettings, setIsOpenFilterSettings] = useState(false);
    const [reloadKey, setReloadKey] = useState(0);
    const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);

    useEffect(() => {
        let cancelled = false;

        const loadProperties = async () => {
            loading.open();

            try {
                const response = await propertyApi.search({
                    page,
                    limit: paginatedLimit,
                    filter_logic: filterLogic,
                    filters,
                    sorts: sort,
                });

                if (!cancelled) {
                    setProperties(response.items);
                    setTotal(response.total);
                }
            } finally {
                if (!cancelled) {
                    loading.close();
                }
            }
        };

        loadProperties();

        return () => {
            cancelled = true;
        };
    }, [loading, page, filters, sort, filterLogic, reloadKey]);

    const handleNavigateToPropertyPage = useCallback(
        (propertyId: string) => {
            router.push(`/${appRoutes.landlord}/${appRoutes.properties}/${propertyId}`);
        },
        [router],
    );

    const handleDeleteSelected = async () => {
        if (selectedIds.length === 0) {
            return;
        }

        try {
            loading.open();

            await Promise.all(selectedIds.map((id) => propertyApi.delete(id)));

            toast.success('Xóa chỗ ở thành công.');
            setSelectedIds([]);
            setReloadKey((value) => value + 1);
        } catch (error) {
            toast.error((error as Error).message);
        } finally {
            setOpenDeleteConfirm(false);
            loading.close();
        }
    };

    return (
        <section className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
                <h1 className="text-2xl font-semibold text-slate-900">Quản lý chỗ ở</h1>

                <div className="flex flex-wrap items-center justify-end gap-2">
                    {searchConditions.map((condition) => {
                        const filter = propertyFilters.find((item) => item.key === condition.key);

                        return (
                            <Badge key={`${condition.key}-${String(condition.value)}`} variant="info">
                                {filter?.label ?? condition.key}:{' '}
                                {getFilterDisplayValue(condition.key, condition.value)}
                            </Badge>
                        );
                    })}

                    <Button
                        variant="blue"
                        icon={<FiSearch />}
                        onClick={() => {
                            setDraftConditions(searchConditions);
                            setIsOpenFilterSettings(true);
                        }}
                    >
                        Tìm kiếm
                    </Button>
                </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
                <Button
                    icon={<FiPlus />}
                    variant="blue"
                    onClick={() => router.push(`/${appRoutes.landlord}/${appRoutes.properties}/${appRoutes.create}`)}
                >
                    Tạo mới
                </Button>

                <Button
                    icon={<FiTrash2 />}
                    variant="primary"
                    disabled={selectedIds.length === 0}
                    onClick={() => setOpenDeleteConfirm(true)}
                >
                    Xóa
                </Button>
            </div>

            <div className="flex justify-end">
                <Pagination totalRecords={total} pageSize={paginatedLimit} currentPage={page} onPageChange={setPage} />
            </div>

            <Table
                columns={columns}
                data={properties}
                selectable
                getRowId={(property) => property.id}
                selectedIds={selectedIds}
                onSelectionChange={setSelectedIds}
                sortField={sort[0]?.field}
                sortDirection={sort[0]?.direction}
                rowClickable
                onRowClick={(property) => handleNavigateToPropertyPage(property.id)}
                onSort={(field, direction) => {
                    if (!direction || !field) {
                        setSort([]);
                        return;
                    }

                    setSort([
                        {
                            field,
                            direction,
                        },
                    ]);
                }}
            />

            {isOpenFilterSettings && (
                <FilterSettings
                    key={JSON.stringify(draftConditions)}
                    open={isOpenFilterSettings}
                    onClose={() => setIsOpenFilterSettings(false)}
                    filters={propertyFilters}
                    value={draftConditions}
                    filterLogic={filterLogic}
                    onSearch={(conditions, logic) => {
                        setPage(1);
                        setDraftConditions(conditions);
                        setSearchConditions(conditions);
                        setFilterLogic(logic);

                        setFilters(
                            conditions.map((item) => ({
                                field: item.key,
                                operator: SearchOperator.Equals,
                                value: item.value,
                            })),
                        );
                    }}
                />
            )}

            <Confirmation
                open={openDeleteConfirm}
                title="Xóa chỗ ở"
                message={`Bạn có chắc chắn muốn xóa ${selectedIds.length} chỗ ở đã chọn?`}
                confirmText="Xóa"
                onCancel={() => setOpenDeleteConfirm(false)}
                onConfirm={handleDeleteSelected}
            />
        </section>
    );
}
