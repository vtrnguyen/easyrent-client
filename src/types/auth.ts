import { AccountStatus, Genders, Roles } from '@/common/constants/appConstants';

export interface LoginRequest {
    identifier: string;
    password: string;
}

export interface RegisterRequest {
    fullName: string;
    email: string;
    password: string;
    phoneNumber: string;
    gender: Genders;
}

export interface ChangePasswordRequest {
    currentPassword: string;
    newPassword: string;
    confirmNewPassword: string;
}

export interface AuthData {
    accessToken: string;
    userId: string;
    fullName: string;
    avatarUrl?: string;
    role: Roles;
    status: AccountStatus;
    lastLoginAt?: string;
}
