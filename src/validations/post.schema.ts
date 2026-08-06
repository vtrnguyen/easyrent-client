import { z } from 'zod';
import { PostContentType, PostStatus } from '@/types/post';

export const postSchema = z.object({
    propertyId: z.string().min(1, 'Vui lòng chọn chỗ ở'),
    title: z.string().trim().min(1, 'Không được để trống').max(255, 'Tối đa 255 ký tự'),
    contentType: z.enum(PostContentType),
    content: z.string().trim().min(1, 'Không được để trống'),
    status: z.enum(PostStatus),
});
