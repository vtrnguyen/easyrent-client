import { api } from '@/services/axios';

import { toCamelCase } from '@/common/helpers/helper';
import { PaginationResponse, SuccessResponse } from '@/types/api';
import { Property } from '@/types/property';
import { SearchRequest } from '@/types/search';
import { createRequestKey, deduplicateRequest } from '@/services/request-deduplicator';

export const propertyApi = {
    async search(payload: SearchRequest): Promise<PaginationResponse<Property>> {
        return deduplicateRequest(createRequestKey('property:search', payload), async () => {
            const response = await api.post<SuccessResponse<PaginationResponse<Property>>>('/property/search', payload);
            return toCamelCase(response.data.data) as PaginationResponse<Property>;
        });
    },

    async create(payload: FormData): Promise<void> {
        await api.post<SuccessResponse<void>>('/property', payload);
    },

    async update(id: string, payload: FormData): Promise<void> {
        await api.put<SuccessResponse<void>>(`/property/${id}`, payload);
    },

    async getById(id: string): Promise<Property> {
        return deduplicateRequest(`property:get:${id}`, async () => {
            const response = await api.get<SuccessResponse<Property>>(`/property/${id}`);
            return toCamelCase(response.data.data) as Property;
        });
    },

    async delete(id: string): Promise<void> {
        await api.delete<SuccessResponse<void>>(`/property/${id}`);
    },
};
