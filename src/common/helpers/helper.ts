import snakeCase from "lodash.snakecase";
import camelCase from "lodash.camelcase";

import { AuthData } from "@/types/auth";
import { appRoutes, localStorageKeys } from "../constants/appConstants";
import { AccountRole } from "../enums/appEnums";

export const authStorage = {
    save(data: AuthData) {
        localStorage.setItem(
            localStorageKeys.auth,
            JSON.stringify(data)
        );
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
    }
}

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

    if (data !== null && typeof data === "object") {
        return Object.keys(data).reduce(
            (acc, key) => {
                acc[snakeCase(key)] =
                    toSnakeCase(data[key]);

                return acc;
            },
            {} as any
        );
    }

    return data;
}

export function toCamelCase(data: any): any {
    if (Array.isArray(data)) {
        return data.map(toCamelCase);
    }

    if (typeof data === "object" && data !== null) {
        return Object.keys(data).reduce(
            (acc, key) => {
                acc[camelCase(key)] =
                    toCamelCase(data[key]);

                return acc;
            },
            {} as any
        );
    }

    return data;
}