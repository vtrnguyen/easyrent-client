'use client';

import { useEffect, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import AvatarUpload from '@/shared/components/avatar-upload/avatar-upload';
import Button from '@/shared/components/buttons/button';
import Card from '@/shared/components/card/card';
import Checkbox from '@/shared/components/checkbox/checkbox';
import Select from '@/shared/components/select/select';
import TextArea from '@/shared/components/textarea/textarea';
import TextField from '@/shared/components/text-field/text-field';

import { userApi } from '@/api/user.api';
import { AccountStatus, Genders, Roles } from '@/common/constants/appConstants';
import useLoadingOverlay from '@/shared/hooks/useLoadingOverlay';
import { UserForm, userSchema } from '@/validations/user.schema';

interface Props {
    userId?: string;
}

export default function UserDetailPage({ userId }: Props) {
    const isCreate = !userId;

    const loading = useLoadingOverlay();

    const [avatarPreview, setAvatarPreview] = useState('');

    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors, isSubmitting },
    } = useForm<UserForm>({
        resolver: zodResolver(userSchema),
        defaultValues: {
            email: '',
            fullName: '',
            phoneNumber: '',
            role: Roles.Tenant,
            status: AccountStatus.Active,
            gender: Genders.Male,
            birthday: '',
            address: '',
            bio: '',
            occupation: '',
            identityNumber: '',
            avatarUrl: '',
            emailVerified: false,
        },
    });

    useEffect(() => {
        if (isCreate) {
            return;
        }

        let cancelled = false;

        const load = async () => {
            loading.open();

            try {
                const user = await userApi.getById(userId);

                if (!cancelled) {
                    reset({
                        email: user.email,
                        fullName: user.fullName,
                        phoneNumber: user.phoneNumber,
                        role: user.role,
                        status: user.status,
                        gender: user.gender,
                        birthday: user.birthday,
                        address: user.address,
                        bio: user.bio,
                        occupation: user.occupation,
                        identityNumber: user.identityNumber,
                        avatarUrl: user.avatarUrl,
                        emailVerified: user.emailVerified,
                    });
                }
            } catch {
                toast.error('Không thể tải thông tin người dùng.');
            } finally {
                if (!cancelled) {
                    loading.close();
                }
            }
        };

        load();

        return () => {
            cancelled = true;
        };
    }, [isCreate, userId, loading, reset]);

    const onSubmit = async (values: UserForm) => {
        try {
            loading.open();

            if (isCreate) {
                console.log('Create', values);
                toast.success('Tạo người dùng thành công.');
            } else {
                console.log('Update', values);
                toast.success('Cập nhật người dùng thành công.');
            }
        } catch {
            toast.error('Đã xảy ra lỗi.');
        } finally {
            loading.close();
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold">{isCreate ? 'Tạo người dùng' : 'Cập nhật người dùng'}</h1>

                <Button type="submit">{isSubmitting ? 'Đang lưu...' : 'Lưu'}</Button>
            </div>

            <Card title="Thông tin tài khoản">
                <div className="grid grid-cols-2 gap-5">
                    <TextField label="Email" error={errors.email?.message} {...register('email')} />

                    <TextField label="Số điện thoại" error={errors.phoneNumber?.message} {...register('phoneNumber')} />

                    <Select
                        label="Vai trò"
                        error={errors.role?.message}
                        options={[
                            { label: 'Khách thuê', value: Roles.Tenant },
                            { label: 'Chủ nhà', value: Roles.Landlord },
                            { label: 'Quản trị viên', value: Roles.Admin },
                        ]}
                        {...register('role')}
                    />

                    <Select
                        label="Trạng thái"
                        error={errors.status?.message}
                        options={[
                            { label: 'Hoạt động', value: AccountStatus.Active },
                            { label: 'Khóa', value: AccountStatus.Inactive },
                        ]}
                        {...register('status')}
                    />
                </div>

                <div className="mt-5">
                    <Controller
                        name="emailVerified"
                        control={control}
                        render={({ field }) => (
                            <Checkbox
                                title="Email đã xác thực"
                                checked={field.value}
                                onChange={(e) => field.onChange(e.target.checked)}
                            />
                        )}
                    />
                </div>
            </Card>

            <Card title="Thông tin cá nhân">
                <div className="grid grid-cols-2 gap-5">
                    <TextField label="Họ và tên" error={errors.fullName?.message} {...register('fullName')} />

                    <Select
                        label="Giới tính"
                        error={errors.gender?.message}
                        options={[
                            { label: 'Nam', value: Genders.Male },
                            { label: 'Nữ', value: Genders.Female },
                            { label: 'Khác', value: Genders.Other },
                        ]}
                        {...register('gender')}
                    />

                    <TextField
                        type="date"
                        label="Ngày sinh"
                        error={errors.birthday?.message}
                        {...register('birthday')}
                    />

                    <TextField label="Nghề nghiệp" error={errors.occupation?.message} {...register('occupation')} />

                    <TextField
                        label="CCCD / CMND"
                        error={errors.identityNumber?.message}
                        {...register('identityNumber')}
                    />
                </div>
            </Card>

            <Card title="Địa chỉ">
                <TextArea error={errors.address?.message} {...register('address')} />
            </Card>

            <Card title="Giới thiệu">
                <TextArea error={errors.bio?.message} {...register('bio')} />
            </Card>

            <Card title="Ảnh đại diện">
                <AvatarUpload
                    previewUrl={avatarPreview}
                    onChange={(file) => {
                        setAvatarPreview(URL.createObjectURL(file));
                    }}
                />
            </Card>
        </form>
    );
}
