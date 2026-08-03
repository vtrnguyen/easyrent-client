import { toCamelCase } from '@/common/helpers/helper';
import { api } from '@/services/axios';

import { SuccessResponse } from '@/types/api';
import { Utility } from '@/types/utility';

export const utilityApi = {
    async getAll(): Promise<SuccessResponse<Utility[]>> {
        const response = await api.get<SuccessResponse<Utility[]>>('/utility');
        return toCamelCase(response.data) as SuccessResponse<Utility[]>;
    },
};
