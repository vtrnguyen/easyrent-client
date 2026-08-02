import { api } from '@/services/axios';
import { SuccessResponse } from '@/types/api';

import { ChangePasswordRequest, LoginRequest, RegisterRequest } from '@/types/auth';

export const authApi = {
    async login(payload: LoginRequest) {
        const response = await api.post('/auth/login', payload);
        return response.data;
    },

    async register(payload: RegisterRequest) {
        const response = await api.post('/auth/register', payload);
        return response.data;
    },

    async changePassword(payload: ChangePasswordRequest): Promise<void> {
        await api.put<SuccessResponse<void>>('/auth/change-password', payload);
    },
};
