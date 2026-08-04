import { AccountStatus, Genders, Roles } from '@/common/constants/appConstants';
import { SearchOperator, SortOrder } from './search';

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
    birthday: string;
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

export interface UserForm {
    email: string;
    phoneNumber: string;
    fullName: string;
    role: string;
    status: string;
    gender: string;
    birthday: string;
    address: string;
    bio: string;
    occupation: string;
    identityNumber: string;
    avatarUrl: string;
    avatarFile?: File;
    emailVerified: boolean;
}

export type CreateUserRequest = Omit<UserForm, 'emailVerified' | 'avatarUrl'> & {
    avatarFile?: File;
};
