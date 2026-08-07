import { toCamelCase } from '@/common/helpers/helper';
import { api } from '@/services/axios';
import { PaginationResponse, SuccessResponse } from '@/types/api';
import { Post, PostComment, PostPayload, PostSocial } from '@/types/post';
import { SearchRequest } from '@/types/search';
import { createRequestKey, deduplicateRequest } from '@/services/request-deduplicator';

export const postApi = {
    async search(payload: SearchRequest): Promise<PaginationResponse<Post>> {
        return deduplicateRequest(createRequestKey('post:search', payload), async () => {
            const response = await api.post<SuccessResponse<PaginationResponse<Post>>>('/post/search', payload);
            return toCamelCase(response.data.data) as PaginationResponse<Post>;
        });
    },
    async searchPublished(payload: SearchRequest): Promise<PaginationResponse<Post>> {
        return deduplicateRequest(createRequestKey('post:published', payload), async () => {
            const response = await api.post<SuccessResponse<PaginationResponse<Post>>>('/post/published/search', payload);
            return toCamelCase(response.data.data) as PaginationResponse<Post>;
        });
    },
    async getById(id: string): Promise<Post> {
        return deduplicateRequest(`post:get:${id}`, async () => {
            const response = await api.get<SuccessResponse<Post>>(`/post/${id}`);
            return toCamelCase(response.data.data) as Post;
        });
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
    async getSocial(id: string): Promise<PostSocial> {
        const response = await api.get<SuccessResponse<PostSocial>>(`/post/${id}/social`);
        return toCamelCase(response.data.data) as PostSocial;
    },
    async like(id: string): Promise<void> {
        await api.post(`/post/${id}/like`);
    },
    async unlike(id: string): Promise<void> {
        await api.delete(`/post/${id}/like`);
    },
    async getComments(id: string, page = 1, limit = 10): Promise<PaginationResponse<PostComment>> {
        const response = await api.get<SuccessResponse<PaginationResponse<PostComment>>>(`/post/${id}/comments`, {
            params: { page, limit },
        });
        return toCamelCase(response.data.data) as PaginationResponse<PostComment>;
    },
    async comment(id: string, content: string, parentCommentId?: string): Promise<PostComment> {
        const response = await api.post<SuccessResponse<PostComment>>(`/post/${id}/comments`, {
            content,
            parent_comment_id: parentCommentId,
        });
        return toCamelCase(response.data.data) as PostComment;
    },
};
