import snakeCase from 'lodash.snakecase';
import camelCase from 'lodash.camelcase';

import { AuthData } from '@/types/auth';
import { AccountStatus, appRoutes, localStorageKeys, Roles } from '../constants/appConstants';
import { AccountRole } from '../enums/appEnums';
import { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';

export const authStorage = {
    save(data: AuthData) {
        localStorage.setItem(localStorageKeys.auth, JSON.stringify(data));
    },

    get(): AuthData | null {
        try {
            const data = localStorage.getItem(localStorageKeys.auth);

            if (!data) {
                return null;
            }

            return JSON.parse(data) as AuthData;
        } catch {
            return null;
        }
    },

    clear() {
        localStorage.removeItem(localStorageKeys.auth);
    },
};

export function getHomeRoute(role?: AccountRole) {
    switch (role) {
        case AccountRole.Admin:
            return `/${appRoutes.admin}`;
        case AccountRole.Landlord:
            return `/${appRoutes.landlord}`;
        case AccountRole.Tenant:
            return `/${appRoutes.home}`;
        default:
            return `/${appRoutes.home}`;
    }
}

export function toSnakeCase(data: any): any {
    if (Array.isArray(data)) {
        return data.map(toSnakeCase);
    }

    if (data !== null && typeof data === 'object') {
        return Object.keys(data).reduce((acc, key) => {
            acc[snakeCase(key)] = toSnakeCase(data[key]);

            return acc;
        }, {} as any);
    }

    return data;
}

export function toCamelCase(data: any): any {
    if (Array.isArray(data)) {
        return data.map(toCamelCase);
    }

    if (typeof data === 'object' && data !== null) {
        return Object.keys(data).reduce((acc, key) => {
            acc[camelCase(key)] = toCamelCase(data[key]);

            return acc;
        }, {} as any);
    }

    return data;
}

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function getRoleValue(role: Roles): string {
    switch (role) {
        case Roles.Admin:
            return 'Quản trị viên';
        case Roles.Landlord:
            return 'Người cho thuê';
        case Roles.Tenant:
            return 'Người thuê';
        default:
            return '';
    }
}

export function getStatusValue(status: AccountStatus): string {
    switch (status) {
        case AccountStatus.Active:
            return 'Đang hoạt động';
        case AccountStatus.Inactive:
            return 'Ngừng hoạt động';
        default:
            return '';
    }
}

export function formatDate(value?: string | Date | null, fallback = '-', locale = 'vi-VN'): string {
    if (!value) {
        return fallback;
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
        return fallback;
    }

    return date.toLocaleDateString(locale);
}
