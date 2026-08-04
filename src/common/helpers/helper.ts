import snakeCase from 'lodash.snakecase';
import camelCase from 'lodash.camelcase';

import { AuthData } from '@/types/auth';
import {
    AccountStatus,
    appRoutes,
    Genders,
    localStorageKeys,
    PropertyStatus,
    PropertyTypes,
    Roles,
} from '../constants/appConstants';
import { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';
import { FilterValue } from '@/types/filter';

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

export function getHomeRoute(role?: Roles) {
    switch (role) {
        case Roles.Admin:
            return `/${appRoutes.admin}`;
        case Roles.Landlord:
            return `/${appRoutes.landlord}`;
        case Roles.Tenant:
            return `/${appRoutes.home}`;
        default:
            return `/${appRoutes.home}`;
    }
}

export function toSnakeCase(data: unknown): unknown {
    if (Array.isArray(data)) {
        return data.map(toSnakeCase);
    }

    if (data !== null && typeof data === 'object') {
        return Object.keys(data).reduce(
            (acc, key) => {
                const record = data as Record<string, unknown>;
                acc[snakeCase(key)] = toSnakeCase(record[key]);

                return acc;
            },
            {} as Record<string, unknown>,
        );
    }

    return data;
}

export function toCamelCase(data: unknown): unknown {
    if (Array.isArray(data)) {
        return data.map(toCamelCase);
    }

    if (typeof data === 'object' && data !== null) {
        return Object.keys(data).reduce(
            (acc, key) => {
                const camelKey = camelCase(key);
                const record = data as Record<string, unknown>;

                let value = toCamelCase(record[key]);

                if (key.endsWith('_url') && typeof value === 'string' && value.startsWith('/storage/')) {
                    value = `${process.env.NEXT_PUBLIC_API_URL}${value}`;
                }

                acc[camelKey] = value;

                return acc;
            },
            {} as Record<string, unknown>,
        );
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

export function getGenderValue(gender: Genders): string {
    switch (gender) {
        case Genders.Male:
            return 'Nam';
        case Genders.Female:
            return 'Nữ';
        case Genders.Other:
            return 'Khác';
        default:
            return '';
    }
}

export function getPropertyTypeValue(type: PropertyTypes): string {
    switch (type) {
        case PropertyTypes.House:
            return 'Nhà';
        case PropertyTypes.RentalRoom:
            return 'Phòng trọ';
        case PropertyTypes.Apartment:
            return 'Căn hộ';
        case PropertyTypes.Flat:
            return 'Căn hộ dịch vụ';
        default:
            return '';
    }
}

export function getPropertyStatusValue(status: PropertyStatus): string {
    switch (status) {
        case PropertyStatus.Available:
            return 'Đang trống';
        case PropertyStatus.Reserved:
            return 'Đã đặt';
        case PropertyStatus.Rented:
            return 'Đang cho thuê';
        case PropertyStatus.Hidden:
            return 'Đã ẩn';
        case PropertyStatus.Maintenance:
            return 'Đang bảo trì';
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

export function formatDateForInput(value?: string | Date | null): string {
    if (!value) {
        return '';
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
        return '';
    }

    return new Intl.DateTimeFormat('en-CA').format(date);
}

const filterValueResolvers: Record<string, (value: FilterValue) => string> = {
    role: (value) => getRoleValue(value as Roles),
    status: (value) => getStatusValue(value as AccountStatus),
    gender: (value) => getGenderValue(value as Genders),
};

export const getFilterDisplayValue = (key: string, value: FilterValue): string => {
    const resolver = filterValueResolvers[key];
    return resolver ? resolver(value) : String(value);
};

export function createFormData<T extends Record<string, unknown>>(data: T) {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
            if (Array.isArray(value)) {
                value.forEach((item) => {
                    if (item !== undefined && item !== null) {
                        formData.append(key, item instanceof Blob ? item : String(item));
                    }
                });

                return;
            }

            formData.append(key, value instanceof Blob ? value : String(value));
        }
    });

    return formData;
}
