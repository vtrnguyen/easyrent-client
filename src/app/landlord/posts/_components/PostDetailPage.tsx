'use client';

import { useEffect, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { postApi } from '@/api/post.api';
import { propertyApi } from '@/api/property.api';
import { appRoutes, paginatedLimit } from '@/common/constants/appConstants';
import Button from '@/shared/components/buttons/button';
import Card from '@/shared/components/card/card';
import Dropdown from '@/shared/components/dropdown/dropdown';
import TextArea from '@/shared/components/textarea/textarea';
import TextField from '@/shared/components/text-field/text-field';
import useLoadingOverlay from '@/shared/hooks/useLoadingOverlay';
import { PostContentType, PostStatus } from '@/types/post';
import { Property } from '@/types/property';
import { FilterLogics } from '@/types/search';
import { postSchema } from '@/validations/post.schema';
import { contentTypeOptions, postStatusOptions } from '../usePostsConstants';

interface Props {
    postId?: string;
}
type Values = z.infer<typeof postSchema>;

export default function PostDetailPage({ postId }: Props) {
    const router = useRouter();
    const loading = useLoadingOverlay();
    const isCreate = !postId;
    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors, isSubmitting },
    } = useForm<Values>({
        resolver: zodResolver(postSchema),
        defaultValues: {
            propertyId: '',
            title: '',
            contentType: PostContentType.PlainText,
            content: '',
            status: PostStatus.Draft,
        },
    });
    const [properties, setProperties] = useState<Property[]>([]);
    useEffect(() => {
        let cancelled = false;
        loading.open();
        Promise.all([
            propertyApi.search({
                page: 1,
                limit: paginatedLimit,
                filter_logic: FilterLogics.And,
                filters: [],
                sorts: [],
            }),
            isCreate ? Promise.resolve(null) : postApi.getById(postId),
        ])
            .then(([propertyResult, post]) => {
                if (cancelled) return;
                setProperties(propertyResult.items);
                if (post)
                    reset({
                        propertyId: post.propertyId,
                        title: post.title,
                        contentType: post.contentType,
                        content: post.content,
                        status: post.status,
                    });
            })
            .catch(() => toast.error('Không thể tải dữ liệu bài viết.'))
            .finally(() => {
                if (!cancelled) loading.close();
            });
        return () => {
            cancelled = true;
        };
    }, [isCreate, loading, postId, reset]);
    const propertyOptions = useMemo(
        () => properties.map((item) => ({ label: item.title, value: item.id })),
        [properties],
    );
    const submit = async (values: Values) => {
        try {
            loading.open();
            const payload = {
                property_id: values.propertyId,
                title: values.title,
                content_type: values.contentType,
                content: values.content,
                status: values.status,
            };
            if (isCreate) await postApi.create(payload);
            else await postApi.update(postId, payload);
            toast.success(isCreate ? 'Tạo bài viết thành công.' : 'Cập nhật bài viết thành công.');
            router.replace(`/${appRoutes.landlord}/${appRoutes.posts}`);
        } catch (error) {
            toast.error((error as Error).message);
        } finally {
            loading.close();
        }
    };
    return (
        <form className="space-y-6" onSubmit={handleSubmit(submit)}>
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold text-slate-900">
                        {isCreate ? 'Tạo bài viết' : 'Cập nhật bài viết'}
                    </h1>
                    <p className="mt-1 text-sm text-slate-500">Nội dung được lưu theo đúng định dạng bạn chọn.</p>
                </div>
                <Button type="submit" variant="blue" disabled={isSubmitting}>
                    {isSubmitting ? 'Đang lưu...' : 'Lưu'}
                </Button>
            </div>
            <Card title="Thông tin bài viết">
                <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                    <Controller
                        name="propertyId"
                        control={control}
                        render={({ field }) => (
                            <Dropdown
                                label="Chỗ ở"
                                placeholder="Chọn chỗ ở"
                                options={propertyOptions}
                                value={field.value}
                                onChange={field.onChange}
                                error={errors.propertyId?.message}
                            />
                        )}
                    />
                    <TextField label="Tiêu đề" {...register('title')} error={errors.title?.message} />
                    <Controller
                        name="contentType"
                        control={control}
                        render={({ field }) => (
                            <Dropdown
                                label="Định dạng nội dung"
                                options={contentTypeOptions}
                                value={field.value}
                                onChange={field.onChange}
                                error={errors.contentType?.message}
                            />
                        )}
                    />
                    <Controller
                        name="status"
                        control={control}
                        render={({ field }) => (
                            <Dropdown
                                label="Trạng thái"
                                options={postStatusOptions}
                                value={field.value}
                                onChange={field.onChange}
                                error={errors.status?.message}
                            />
                        )}
                    />
                    <TextArea
                        containerClassName="lg:col-span-2"
                        textareaClassName="min-h-80 font-mono"
                        label="Nội dung"
                        hint="Có thể nhập Markdown khi chọn định dạng Markdown."
                        {...register('content')}
                        error={errors.content?.message}
                    />
                </div>
            </Card>
        </form>
    );
}
