import { DropdownOption } from '@/shared/components/dropdown/dropdown';

export const paginatedLimit = 100;
export const animationDuration = 250;

export const localStorageKeys = {
    auth: 'easyrentAuth',
};

export const appRoutes = {
    auth: 'auth',
    login: 'login',
    register: 'register',

    admin: 'admin',
    users: 'users',
    backupAndRestore: 'backupandrestore',

    landlord: 'landlord',
    properties: 'properties',
    posts: 'posts',

    home: '',
    dashboard: 'dashboard',
};

export enum SortOrder {
    Ascending = 'asc',
    Descending = 'desc',
}

export enum SearchOperator {
    Equals = 'equals',
    Contains = 'contains',
    In = 'in',
}

export enum FilterLogics {
    And = 'and',
    Or = 'or',
}

export enum Genders {
    Male = 'male',
    Female = 'female',
    Other = 'other',
}

export enum Roles {
    Admin = 'admin',
    Landlord = 'landlord',
    Tenant = 'tenant',
}

export enum AccountStatus {
    Active = 'active',
    Inactive = 'inactive',
}

export const roleOptions: DropdownOption[] = [
    {
        label: 'Khách thuê',
        value: Roles.Tenant,
    },
    {
        label: 'Chủ nhà',
        value: Roles.Landlord,
    },
    {
        label: 'Quản trị viên',
        value: Roles.Admin,
    },
];

export const accountStatusOptions: DropdownOption[] = [
    {
        label: 'Hoạt động',
        value: AccountStatus.Active,
    },
    {
        label: 'Khóa',
        value: AccountStatus.Inactive,
    },
];

export const genderOptions: DropdownOption[] = [
    {
        label: 'Nam',
        value: Genders.Male,
    },
    {
        label: 'Nữ',
        value: Genders.Female,
    },
    {
        label: 'Khác',
        value: Genders.Other,
    },
];
