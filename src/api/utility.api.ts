import { toCamelCase } from '@/common/helpers/helper';
import { api } from '@/services/axios';

import { SuccessResponse } from '@/types/api';
import { Utility } from '@/types/utility';
import { deduplicateRequest } from '@/services/request-deduplicator';

export const utilityApi = {
    async getAll(): Promise<SuccessResponse<Utility[]>> {
        return deduplicateRequest('utility:get-all', async () => {
            const response = await api.get<SuccessResponse<Utility[]>>('/utility');
            return toCamelCase(response.data) as SuccessResponse<Utility[]>;
        });
    },
};
