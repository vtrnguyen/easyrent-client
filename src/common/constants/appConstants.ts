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
    utilities: 'utilities',
    posts: 'posts',

    create: 'create',

    home: '',
    dashboard: 'dashboard',
};

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

export enum PropertyTypes {
    House = 'house',
    RentalRoom = 'rental_room',
    Apartment = 'apartment',
    Flat = 'flat',
}

export enum PropertyStatus {
    Available = 'available',
    Reserved = 'reserved',
    Rented = 'rented',
    Hidden = 'hidden',
    Maintenance = 'maintenance',
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

export const validationPatterns = {
    phoneNumber: /^0\d{9,10}$/,
    identityNumber: /^\d{12}$/,
};

export const passwordValidation = {
    minLength: 8,
};

export const validationMessages = {
    phoneNumber: 'Số điện thoại phải gồm 10 hoặc 11 chữ số và bắt đầu bằng số 0',
    identityNumber: 'CCCD phải gồm đúng 12 chữ số',
    imageFile: 'Chỉ được tải lên file ảnh (JPG, JPEG, PNG, WEBP, GIF)',
    required: 'Không được để trống',
    passwordMinLength: `Mật khẩu phải có ít nhất ${passwordValidation.minLength} ký tự`,
    passwordNotMatch: 'Mật khẩu xác nhận không khớp',
    passwordMustDifferent: 'Mật khẩu mới phải khác mật khẩu hiện tại',
};

export const allowedImageMimeTypes: ReadonlyArray<string> = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
    'image/gif',
];
