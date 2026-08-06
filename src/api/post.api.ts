import { toCamelCase } from '@/common/helpers/helper';
import { api } from '@/services/axios';
import { PaginationResponse, SuccessResponse } from '@/types/api';
import { Post, PostPayload } from '@/types/post';
import { SearchRequest } from '@/types/search';

export const postApi = {
    async search(payload: SearchRequest): Promise<PaginationResponse<Post>> {
        const response = await api.post<SuccessResponse<PaginationResponse<Post>>>('/post/search', payload);
        return toCamelCase(response.data.data) as PaginationResponse<Post>;
    },
    async getById(id: string): Promise<Post> {
        const response = await api.get<SuccessResponse<Post>>(`/post/${id}`);
        return toCamelCase(response.data.data) as Post;
    },
    async create(payload: PostPayload): Promise<void> {
        await api.post('/post', payload);
    },
    async update(id: string, payload: PostPayload): Promise<void> {
        await api.put(`/post/${id}`, payload);
    },
    async delete(id: string): Promise<void> {
        await api.delete(`/post/${id}`);
    },
};
