'use client';

import { AccountStatus, Roles } from '@/common/constants/appConstants';
import { formatDate, getRoleValue, getStatusValue } from '@/common/helpers/helper';
import Badge from '@/shared/components/badge/badge';
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
            key: 'phone_number',
            label: 'Số điện thoại',
            type: 'text',
            placeholder: 'Nhập số điện thoại',
        },
        {
            key: 'role',
            label: 'Vai trò',
            type: 'select',
            options: [
                {
                    label: getRoleValue(Roles.Admin),
                    value: Roles.Admin,
                },
                {
                    label: getRoleValue(Roles.Landlord),
                    value: Roles.Landlord,
                },
                {
                    label: getRoleValue(Roles.Tenant),
                    value: Roles.Tenant,
                },
            ],
        },
        {
            key: 'status',
            label: 'Trạng thái tài khoản',
            type: 'select',
            options: [
                {
                    label: getStatusValue(AccountStatus.Active),
                    value: AccountStatus.Active,
                },
                {
                    label: getStatusValue(AccountStatus.Inactive),
                    value: AccountStatus.Inactive,
                },
            ],
        },
        {
            key: 'last_login_at',
            label: 'Lần đăng nhập cuối',
            type: 'date',
        },
    ];

    const getRoleBadge = (role: Roles) => {
        switch (role) {
            case Roles.Admin:
                return <Badge variant="danger">{getRoleValue(role)}</Badge>;

            case Roles.Landlord:
                return <Badge variant="info">{getRoleValue(role)}</Badge>;

            case Roles.Tenant:
                return <Badge variant="success">{getRoleValue(role)}</Badge>;

            default:
                return null;
        }
    };

    const getStatusBadge = (status: AccountStatus) => {
        switch (status) {
            case AccountStatus.Active:
                return <Badge variant={'success'}>{getStatusValue(status)}</Badge>;
            case AccountStatus.Inactive:
                return <Badge variant={'danger'}>{getStatusValue(status)}</Badge>;
            default:
                return null;
        }
    };

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
            renderCell: (user) => getRoleBadge(user.role),
        },
        {
            fieldId: 'status',
            header: 'Trạng thái',
            sortable: true,
            renderCell: (user) => getStatusBadge(user.status),
        },
        {
            fieldId: 'last_login_at',
            header: 'Lần đăng nhập cuối',
            sortable: true,
            renderCell: (user) => formatDate(user.lastLoginAt, 'Chưa đăng nhập'),
        },
    ];

    return {
        userFilters,
        columns,
    };
};
