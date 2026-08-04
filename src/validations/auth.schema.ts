import { Genders } from '@/common/constants/appConstants';
import { z } from 'zod';

export const loginSchema = z.object({
    identifier: z.string().min(1, 'Email hoặc số điện thoại không được để trống'),
    password: z.string().min(1, 'Mật khẩu không được để trống'),
});

export const registerSchema = z.object({
    fullName: z.string().min(1, 'Họ và tên không được để trống'),
    email: z.string().email('Email không hợp lệ'),
    password: z.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
    phoneNumber: z.string().min(1, 'Số điện thoại không được để trống'),
    gender: z.enum(Genders),
});

export type LoginSchema = z.infer<typeof loginSchema>;
export type RegisterSchema = z.infer<typeof registerSchema>;
