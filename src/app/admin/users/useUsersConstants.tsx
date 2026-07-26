'use client';

import { Roles } from '@/common/constants/appConstants';
import { formatDate, getRoleValue, getStatusValue } from '@/common/helpers/helper';
import { TableColumn } from '@/shared/components/table/table';
import { FilterConfig } from '@/types/filter';
import { User } from '@/types/user';

export const useUsersConstants = () => {
    const userFilters: FilterConfig[] = [
        {
            key: 'full_name',
            label: 'Họ tên',
            type: 'text',
            placeholder: 'Nhập họ tên',
        },
        {
            key: 'email',
            label: 'Email',
            type: 'text',
            placeholder: 'Nhập email',
        },
        {
            key: 'role',
            label: 'Vai trò',
            type: 'select',
            options: [
                {
                    label: 'Admin',
                    value: Roles.Admin,
                },
                {
                    label: 'Chủ trọ',
                    value: Roles.Landlord,
                },
                {
                    label: 'Người thuê',
                    value: Roles.Tenant,
                },
            ],
        },
    ];

    const columns: TableColumn<User>[] = [
        {
            fieldId: 'full_name',
            header: 'Họ tên',
            sortable: true,
            renderCell: (user) => (
                <div>
                    <div className="font-medium">{user.fullName}</div>
                    <div className="text-xs text-slate-500">{user.email}</div>
                </div>
            ),
        },
        {
            fieldId: 'phone_number',
            header: 'Số điện thoại',
            sortable: true,
            renderCell: (user) => user.phoneNumber,
        },
        {
            fieldId: 'role',
            header: 'Vai trò',
            sortable: true,
            renderCell: (user) => getRoleValue(user.role),
        },
        {
            fieldId: 'status',
            header: 'Trạng thái',
            sortable: true,
            renderCell: (user) => getStatusValue(user.status),
        },
        {
            fieldId: 'last_login_at',
            header: 'Lần đăng nhập cuối',
            sortable: true,
            renderCell: (user) =>
                formatDate(user.lastLoginAt, 'Chưa đăng nhập'),
        },
    ];

    return {
        userFilters,
        columns,
    };
};