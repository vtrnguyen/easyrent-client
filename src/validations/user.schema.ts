import { z } from 'zod';

import {
    AccountStatus,
    allowedImageMimeTypes,
    Genders,
    Roles,
    validationMessages,
    validationPatterns,
} from '@/common/constants/appConstants';

export const userSchema = z.object({
    email: z.email('Email không hợp lệ'),

    fullName: z.string().trim().min(1, 'Họ và tên không được để trống'),

    phoneNumber: z.string().regex(validationPatterns.phoneNumber, validationMessages.phoneNumber),

    role: z.nativeEnum(Roles),

    status: z.nativeEnum(AccountStatus),

    gender: z.nativeEnum(Genders),

    birthday: z.string(),

    address: z.string(),

    bio: z.string(),

    occupation: z.string(),

    identityNumber: z.string().regex(validationPatterns.identityNumber, validationMessages.identityNumber),

    avatarFile: z
        .instanceof(File)
        .refine((file) => allowedImageMimeTypes.includes(file.type), {
            message: validationMessages.imageFile,
        })
        .optional(),

    avatarUrl: z.string().optional(),

    emailVerified: z.boolean(),
});

export type UserForm = z.infer<typeof userSchema>;
