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
