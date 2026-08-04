'use client';

import { useCallback, useEffect, useState } from 'react';

import { FiPlus, FiSearch } from 'react-icons/fi';

import Button from '@/shared/components/buttons/button';
import Pagination from '@/shared/components/pagination/pagination';
import Table from '@/shared/components/table/table';

import { userApi } from '@/api/user.api';
import { User, UserSearchFilter, UserSearchSort } from '@/types/user';
import { paginatedLimit } from '@/common/constants/appConstants';
import FilterSettings from '@/shared/components/filter-settings/filter-settings';
import { useUsersConstants } from './useUsersConstants';
import { FilterCondition } from '@/types/filter';
import Badge from '@/shared/components/badge/badge';
import { getFilterDisplayValue } from '@/common/helpers/helper';
import { useRouter } from 'next/navigation';
import useLoadingOverlay from '@/shared/hooks/useLoadingOverlay';
import { FilterLogics, SearchOperator } from '@/types/search';

export default function AdminUsersPage() {
    const router = useRouter();
    const loading = useLoadingOverlay();

    const [users, setUsers] = useState<User[]>([]);
    const [isOpenFilterSettings, setIsOpenFilterSettings] = useState(false);
    const [page, setPage] = useState(1);

    const { userFilters, columns } = useUsersConstants();

    const [total, setTotal] = useState(0);
    const [filters, setFilters] = useState<UserSearchFilter[]>([]);
    const [searchConditions, setSearchConditions] = useState<FilterCondition[]>([]);
    const [draftConditions, setDraftConditions] = useState<FilterCondition[]>([]);
    const [filterLogic, setFilterLogic] = useState<FilterLogics>(FilterLogics.And);
    const [sort, setSort] = useState<UserSearchSort[]>([]);
    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    useEffect(() => {
        let cancelled = false;

        const loadUsers = async () => {
            loading.open();

            try {
                const response = await userApi.search({
                    page,
                    limit: paginatedLimit,
                    filter_logic: filterLogic,
                    filters,
                    sorts: sort,
                });

                if (!cancelled) {
                    setUsers(response.items);
                    setTotal(response.total);
                }
            } finally {
                if (!cancelled) {
                    loading.close();
                }
            }
        };

        loadUsers();

        return () => {
            cancelled = true;
        };
    }, [loading, page, filters, sort, filterLogic]);

    const handleNavigateToUserPage = useCallback(
        (userId: string) => {
            router.push(`/admin/users/${userId}`);
        },
        [router],
    );

    return (
        <section className="space-y-4">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold text-slate-900">Quản lý người dùng</h1>

                <div className="flex flex-wrap items-center justify-end gap-2">
                    {searchConditions.map((condition) => {
                        const filter = userFilters.find((x) => x.key === condition.key);

                        return (
                            <Badge key={condition.key} variant="info">
                                {filter?.label}: {getFilterDisplayValue(condition.key, condition.value)}
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

            <div className="flex items-center gap-2">
                <Button icon={<FiPlus />} variant="blue" onClick={() => handleNavigateToUserPage('create')}>
                    Tạo mới
                </Button>
            </div>

            <div className="flex justify-end">
                <Pagination totalRecords={total} pageSize={paginatedLimit} currentPage={page} onPageChange={setPage} />
            </div>

            <Table
                columns={columns}
                data={users}
                selectable={false}
                getRowId={(user) => user.id}
                selectedIds={selectedIds}
                onSelectionChange={setSelectedIds}
                sortField={sort[0]?.field}
                sortDirection={sort[0]?.direction}
                rowClickable
                onRowClick={(user) => handleNavigateToUserPage(user.id)}
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
                    filters={userFilters}
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
        </section>
    );
}
