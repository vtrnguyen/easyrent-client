import { AccountRole, Gender, UserStatus } from "@/common/enums/appEnums";

export interface LoginRequest {
    identifier: string;
    password: string;
}

export interface RegisterRequest {
    fullName: string;
    email: string;
    password: string;
    phoneNumber: string;
    gender: Gender;
}

export interface AuthData {
    accessToken: string;
    userId: string;
    role: AccountRole;
    status: UserStatus;
    lastLoginAt?: string;
}