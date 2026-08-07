import { api } from '@/services/axios';
import { PaginationResponse, SuccessResponse } from '@/types/api';
import { Post } from '@/types/post';
import { createRequestKey, deduplicateRequest } from '@/services/request-deduplicator';

export const postFavoriteApi = {
    getIds: () =>
        deduplicateRequest(
            'post-favorite:ids',
            async () => (await api.get<SuccessResponse<string[]>>('/post-favorite/ids')).data.data,
        ),
    search: (page = 1, limit = 12) =>
        deduplicateRequest(
            createRequestKey('post-favorite:search', { page, limit }),
            async () =>
                (
                    await api.get<SuccessResponse<PaginationResponse<Post>>>('/post-favorite', {
                        params: { page, limit },
                    })
                ).data.data,
        ),
    add: async (postId: string) => {
        await api.post(`/post-favorite/${postId}`);
    },
    remove: async (postId: string) => {
        await api.delete(`/post-favorite/${postId}`);
    },
};
