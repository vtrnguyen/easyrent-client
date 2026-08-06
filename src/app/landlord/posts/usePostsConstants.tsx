'use client';

import Badge from '@/shared/components/badge/badge';
import { TableColumn } from '@/shared/components/table/table';
import { FilterConfig } from '@/types/filter';
import { Post, PostContentType, PostStatus } from '@/types/post';

export const postStatusOptions = [
    { label: 'Bản nháp', value: PostStatus.Draft },
    { label: 'Chờ duyệt', value: PostStatus.PendingReview },
    { label: 'Đã đăng', value: PostStatus.Published },
    { label: 'Đã ẩn', value: PostStatus.Hidden },
    { label: 'Hết hạn', value: PostStatus.Expired },
];
export const contentTypeOptions = [
    { label: 'Văn bản thường', value: PostContentType.PlainText },
    { label: 'Markdown', value: PostContentType.Markdown },
];
const statusLabel = (value: string) => postStatusOptions.find((item) => item.value === value)?.label ?? value;

export function usePostsConstants() {
    const postFilters: FilterConfig[] = [
        { key: 'title', label: 'Tiêu đề', type: 'text', placeholder: 'Nhập tiêu đề' },
        {
            key: 'status',
            label: 'Trạng thái',
            type: 'select',
            placeholder: 'Chọn trạng thái',
            options: postStatusOptions,
        },
    ];
    const columns: TableColumn<Post>[] = [
        {
            fieldId: 'title',
            header: 'Bài viết',
            sortable: true,
            renderCell: (post) => (
                <div>
                    <div className="font-medium text-slate-900">{post.title}</div>
                    <div className="text-xs text-slate-500">{post.propertyTitle}</div>
                </div>
            ),
        },
        {
            fieldId: 'content_type',
            header: 'Định dạng',
            sortable: false,
            renderCell: (post) => (post.contentType === PostContentType.Markdown ? 'Markdown' : 'Văn bản thường'),
        },
        {
            fieldId: 'status',
            header: 'Trạng thái',
            sortable: true,
            renderCell: (post) => (
                <Badge
                    variant={
                        post.status === PostStatus.Published
                            ? 'success'
                            : post.status === PostStatus.Hidden
                              ? 'danger'
                              : 'info'
                    }
                >
                    {statusLabel(post.status)}
                </Badge>
            ),
        },
        {
            fieldId: 'created_at',
            header: 'Ngày tạo',
            sortable: true,
            renderCell: (post) => new Intl.DateTimeFormat('vi-VN').format(new Date(post.createdAt)),
        },
    ];
    return { postFilters, columns };
}
