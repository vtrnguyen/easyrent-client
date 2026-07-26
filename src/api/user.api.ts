import { api } from '@/services/axios';

import { UserSearchRequest, UserSearchResponse } from '@/types/user';

import { toCamelCase } from '@/common/helpers/helper';

export const userApi = {
    async search(payload: UserSearchRequest) {
        const response = await api.post<UserSearchResponse>('/user/search', payload);
        return toCamelCase(response.data) as UserSearchResponse;
    },
};
