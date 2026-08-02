import { api } from '@/services/axios';

import { toCamelCase } from '@/common/helpers/helper';
import { PaginationResponse, SuccessResponse } from '@/types/api';
import { User, UserSearchRequest } from '@/types/user';

export const userApi = {
    async search(payload: UserSearchRequest): Promise<PaginationResponse<User>> {
        const response = await api.post<SuccessResponse<PaginationResponse<User>>>('/user/search', payload);
        return toCamelCase(response.data.data) as PaginationResponse<User>;
    },

    async create(payload: FormData): Promise<void> {
        await api.post<SuccessResponse<void>>('/user', payload);
    },

    async getById(id: string): Promise<User> {
        const response = await api.get<SuccessResponse<User>>(`/user/${id}`);
        return toCamelCase(response.data.data) as User;
    },
};
