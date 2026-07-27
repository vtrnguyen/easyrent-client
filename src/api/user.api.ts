import { api } from '@/services/axios';

import { User, UserSearchRequest, UserSearchResponse } from '@/types/user';

import { toCamelCase } from '@/common/helpers/helper';
import { Response } from '@/types/api';

export const userApi = {
    async search(payload: UserSearchRequest) {
        const response = await api.post<UserSearchResponse>('/user/search', payload);
        return toCamelCase(response.data) as UserSearchResponse;
    },

    async getById(id: string): Promise<User> {
        const response = await api.get<Response<User, undefined>>(`/user/${id}`);
        return toCamelCase(response.data.data) as User;
    },
};
