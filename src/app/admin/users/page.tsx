'use client';

import { useEffect, useState } from 'react';

import { FiPlus, FiSearch } from 'react-icons/fi';

import Button from '@/shared/components/buttons/button';
import Pagination from '@/shared/components/pagination/pagination';
import Table from '@/shared/components/table/table';

import { userApi } from '@/api/user.api';
import { User, UserSearchFilter, UserSearchSort } from '@/types/user';
import { FilterLogics, paginatedLimit, SearchOperator } from '@/common/constants/appConstants';
import FilterSettings from '@/shared/components/filter-settings/filter-settings';
import { useUsersConstants } from './useUsersConstants';

export default function AdminUsersPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);
    const [openFilter, setOpenFilter] = useState(false);
    const [page, setPage] = useState(1);

    const { userFilters, columns } = useUsersConstants();

    const [total, setTotal] = useState(0);
    const [filters, setFilters] = useState<UserSearchFilter[]>([]);
    const [sort, setSort] = useState<UserSearchSort[]>([]);
    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    useEffect(() => {
        let cancelled = false;

        const loadUsers = async () => {
            setLoading(true);

            try {
                const response = await userApi.search({
                    page,
                    limit: paginatedLimit,
                    filter_logic: FilterLogics.And,
                    filters,
                    sorts: sort,
                });

                if (!cancelled && response.data) {
                    setUsers(response.data.items);
                    setTotal(response.data.total);
                }
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        };

        loadUsers();

        return () => {
            cancelled = true;
        };
    }, [page, filters, sort]);

    return (
        <section className="space-y-4">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold text-slate-900">Quản lý người dùng</h1>

                <Button variant="blue" icon={<FiSearch />} onClick={() => setOpenFilter(true)}>
                    Tìm kiếm
                </Button>
            </div>

            <div className="flex items-center gap-2">
                <Button icon={<FiPlus />} variant="blue">
                    Tạo mới
                </Button>
            </div>

            <div className="flex justify-end">
                <Pagination totalRecords={total} pageSize={paginatedLimit} currentPage={page} onPageChange={setPage} />
            </div>

            <Table
                columns={columns}
                data={users}
                loading={loading}
                selectable={false}
                getRowId={(user) => user.id}
                selectedIds={selectedIds}
                onSelectionChange={setSelectedIds}
                sortField={sort[0]?.field}
                sortDirection={sort[0]?.direction}
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

            <FilterSettings
                open={openFilter}
                onClose={() => setOpenFilter(false)}
                filters={userFilters}
                onSearch={(conditions) => {
                    setPage(1);
                    setFilters(
                        conditions.map((item) => ({
                            field: item.key,
                            operator: SearchOperator.Equals,
                            value: item.value,
                        })),
                    );
                }}
            />
        </section>
    );
}
