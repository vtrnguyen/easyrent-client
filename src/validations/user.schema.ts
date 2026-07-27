import { AccountStatus, Genders, Roles } from '@/common/constants/appConstants';
import { z } from 'zod';

export const userSchema = z.object({
    email: z.email('Email không hợp lệ'),
    fullName: z.string().min(1, 'Không được để trống'),
    phoneNumber: z.string().min(10),
    role: z.nativeEnum(Roles),
    status: z.nativeEnum(AccountStatus),
    gender: z.nativeEnum(Genders),
    birthday: z.string(),
    address: z.string(),
    bio: z.string(),
    occupation: z.string(),
    identityNumber: z.string(),
    avatarUrl: z.string(),
    emailVerified: z.boolean(),
});

export type UserForm = z.infer<typeof userSchema>;
