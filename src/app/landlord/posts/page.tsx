'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FiPlus, FiSearch, FiTrash2 } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { postApi } from '@/api/post.api';
import { appRoutes, paginatedLimit } from '@/common/constants/appConstants';
import Badge from '@/shared/components/badge/badge';
import Button from '@/shared/components/buttons/button';
import Confirmation from '@/shared/components/confirmation/confirmation';
import FilterSettings from '@/shared/components/filter-settings/filter-settings';
import Pagination from '@/shared/components/pagination/pagination';
import Table from '@/shared/components/table/table';
import useLoadingOverlay from '@/shared/hooks/useLoadingOverlay';
import { FilterCondition } from '@/types/filter';
import { Post } from '@/types/post';
import { FilterLogics, SearchOperator, SearchRequest, SearchSort } from '@/types/search';
import { usePostsConstants } from './usePostsConstants';

export default function LandlordPostsPage() {
    const router = useRouter();
    const loading = useLoadingOverlay();
    const { postFilters, columns } = usePostsConstants();
    const [posts, setPosts] = useState<Post[]>([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [sorts, setSorts] = useState<SearchSort[]>([]);
    const [filters, setFilters] = useState<SearchRequest['filters']>([]);
    const [conditions, setConditions] = useState<FilterCondition[]>([]);
    const [draftConditions, setDraftConditions] = useState<FilterCondition[]>([]);
    const [logic, setLogic] = useState(FilterLogics.And);
    const [filterOpen, setFilterOpen] = useState(false);
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [reload, setReload] = useState(0);
    useEffect(() => {
        let cancelled = false;
        loading.open();
        postApi
            .search({ page, limit: paginatedLimit, filter_logic: logic, filters, sorts })
            .then((data) => {
                if (!cancelled) {
                    setPosts(data.items);
                    setTotal(data.total);
                }
            })
            .finally(() => {
                if (!cancelled) loading.close();
            });
        return () => {
            cancelled = true;
        };
    }, [page, logic, filters, sorts, reload, loading]);
    const base = `/${appRoutes.landlord}/${appRoutes.posts}`;
    const getConditionDisplayValue = (condition: FilterCondition) => {
        const filter = postFilters.find((item) => item.key === condition.key);
        const option = filter?.options?.find((item) => item.value === condition.value);

        return option?.label ?? String(condition.value);
    };
    const remove = async () => {
        try {
            loading.open();
            await Promise.all(selectedIds.map(postApi.delete));
            toast.success('Xóa bài viết thành công.');
            setSelectedIds([]);
            setReload((v) => v + 1);
        } catch (error) {
            toast.error((error as Error).message);
        } finally {
            setDeleteOpen(false);
            loading.close();
        }
    };
    return (
        <section className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
                <h1 className="text-2xl font-semibold text-slate-900">Quản lý bài viết</h1>

                <div className="flex flex-wrap items-center justify-end gap-2">
                    {conditions.map((condition) => {
                        const filter = postFilters.find((item) => item.key === condition.key);

                        return (
                            <Badge key={`${condition.key}-${String(condition.value)}`} variant="info">
                                {filter?.label ?? condition.key}: {getConditionDisplayValue(condition)}
                            </Badge>
                        );
                    })}

                    <Button
                        variant="blue"
                        icon={<FiSearch />}
                        onClick={() => {
                            setDraftConditions(conditions);
                            setFilterOpen(true);
                        }}
                    >
                        Tìm kiếm
                    </Button>
                </div>
            </div>
            <div className="flex gap-2">
                <Button variant="blue" icon={<FiPlus />} onClick={() => router.push(`${base}/create`)}>
                    Tạo mới
                </Button>
                <Button
                    variant="primary"
                    icon={<FiTrash2 />}
                    disabled={!selectedIds.length}
                    onClick={() => setDeleteOpen(true)}
                >
                    Xóa
                </Button>
            </div>
            <div className="flex justify-end">
                <Pagination totalRecords={total} pageSize={paginatedLimit} currentPage={page} onPageChange={setPage} />
            </div>
            <Table
                columns={columns}
                data={posts}
                selectable
                getRowId={(post) => post.id}
                selectedIds={selectedIds}
                onSelectionChange={setSelectedIds}
                sortField={sorts[0]?.field}
                sortDirection={sorts[0]?.direction}
                rowClickable
                onRowClick={(post) => router.push(`${base}/${post.id}`)}
                onSort={(field, direction) => setSorts(field && direction ? [{ field, direction }] : [])}
            />
            {filterOpen && (
                <FilterSettings
                    key={JSON.stringify(draftConditions)}
                    open={filterOpen}
                    onClose={() => setFilterOpen(false)}
                    filters={postFilters}
                    value={draftConditions}
                    filterLogic={logic}
                    onSearch={(values, selectedLogic) => {
                        setPage(1);
                        setDraftConditions(values);
                        setConditions(values);
                        setLogic(selectedLogic);
                        setFilters(
                            values.map((item) => ({
                                field: item.key,
                                operator: item.key === 'title' ? SearchOperator.Contains : SearchOperator.Equals,
                                value: item.value,
                            })),
                        );
                    }}
                />
            )}
            <Confirmation
                open={deleteOpen}
                title="Xóa bài viết"
                message={`Bạn có chắc chắn muốn xóa ${selectedIds.length} bài viết đã chọn?`}
                confirmText="Xóa"
                onCancel={() => setDeleteOpen(false)}
                onConfirm={remove}
            />
        </section>
    );
}
