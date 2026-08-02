import { passwordValidation, validationMessages } from '@/common/constants/appConstants';
import { z } from 'zod';

export const changePasswordSchema = z
    .object({
        currentPassword: z.string().min(1, validationMessages.required),
        newPassword: z.string().min(passwordValidation.minLength, validationMessages.passwordMinLength),
        confirmNewPassword: z.string().min(1, validationMessages.required),
    })
    .refine((data) => data.currentPassword !== data.newPassword, {
        path: ['newPassword'],
        message: validationMessages.passwordMustDifferent,
    })
    .refine((data) => data.newPassword === data.confirmNewPassword, {
        path: ['confirmNewPassword'],
        message: validationMessages.passwordNotMatch,
    });

export type ChangePasswordForm = z.infer<typeof changePasswordSchema>;
