import {
    AccountStatus,
    FilterLogics,
    Genders,
    Roles,
    SearchOperator,
    SortOrder,
} from '@/common/constants/appConstants';

export interface User {
    id: string;
    email: string;
    phoneNumber: string;
    role: Roles;
    status: AccountStatus;
    emailVerified: boolean;
    fullName: string;
    avatarUrl: string;
    gender: Genders;
    address: string;
    identityNumber: string;
    bio: string;
    occupation: string;
    lastLoginAt: string;
    createdAt: string;
    updatedAt: string;
}

export interface UserSearchFilter {
    field: string;
    operator: SearchOperator;
    value: unknown;
}

export interface UserSearchSort {
    field: string;
    direction: SortOrder;
}

export interface UserSearchRequest {
    page: number;
    limit: number;
    filter_logic: FilterLogics;
    filters: UserSearchFilter[];
    sorts: UserSearchSort[];
}

export interface UserSearchResponse {
    success: boolean;
    message: string;
    data: {
        items: User[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
}
