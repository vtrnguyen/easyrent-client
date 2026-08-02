'use client';

import React, { useEffect, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm, useWatch } from 'react-hook-form';
import toast from 'react-hot-toast';

import AvatarUpload from '@/shared/components/avatar-upload/avatar-upload';
import Button from '@/shared/components/buttons/button';
import Card from '@/shared/components/card/card';
import Checkbox from '@/shared/components/checkbox/checkbox';
import TextArea from '@/shared/components/textarea/textarea';
import TextField from '@/shared/components/text-field/text-field';

import { userApi } from '@/api/user.api';
import {
    AccountStatus,
    accountStatusOptions,
    genderOptions,
    Genders,
    roleOptions,
    Roles,
} from '@/common/constants/appConstants';
import useLoadingOverlay from '@/shared/hooks/useLoadingOverlay';
import { UserForm, userSchema } from '@/validations/user.schema';
import Confirmation from '@/shared/components/confirmation/confirmation';
import Dropdown from '@/shared/components/dropdown/dropdown';
import { createFormData, formatDateForInput } from '@/common/helpers/helper';
import { useRouter } from 'next/navigation';

interface Props {
    userId?: string;
}

export default function UserDetailPage({ userId }: Props) {
    const isCreate = !userId;

    const loading = useLoadingOverlay();
    const router = useRouter();

    const [openConfirm, setOpenConfirm] = useState(false);
    const [submitValues, setSubmitValues] = useState<UserForm | null>(null);

    const {
        register,
        handleSubmit,
        reset,
        control,
        setValue,
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

    const avatarUrl = useWatch({
        control,
        name: 'avatarUrl',
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
                        birthday: formatDateForInput(user.birthday),
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

    const onSubmit = (values: UserForm) => {
        setSubmitValues(values);
        setOpenConfirm(true);
    };

    const handleConfirm = async () => {
        if (!submitValues) {
            return;
        }

        try {
            loading.open();

            const formData = createFormData({
                email: submitValues.email,
                phone_number: submitValues.phoneNumber,
                role: submitValues.role,
                status: submitValues.status,
                full_name: submitValues.fullName,
                gender: submitValues.gender,
                birthday: submitValues.birthday,
                occupation: submitValues.occupation,
                identity_number: submitValues.identityNumber,
                address: submitValues.address,
                bio: submitValues.bio,
                avatar: submitValues.avatarFile,
            });

            if (isCreate) {
                await userApi.create(formData);
                toast.success('Tạo người dùng thành công.');
            } else {
                await userApi.update(userId!, formData);
                toast.success('Cập nhật người dùng thành công.');
            }

            router.replace('/admin/users');
        } catch (error) {
            toast.error((error as Error).message);
        } finally {
            setOpenConfirm(false);
            setSubmitValues(null);
            loading.close();
        }
    };

    return (
        <React.Fragment>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold">{isCreate ? 'Tạo người dùng' : 'Cập nhật người dùng'}</h1>

                    <Button type="submit">{isSubmitting ? 'Đang lưu...' : 'Lưu'}</Button>
                </div>

                <Card title="Thông tin tài khoản">
                    <div className="grid grid-cols-2 gap-5">
                        <TextField label="Email" error={errors.email?.message} {...register('email')} />

                        <TextField
                            label="Số điện thoại"
                            error={errors.phoneNumber?.message}
                            {...register('phoneNumber')}
                        />

                        <Controller
                            name="role"
                            control={control}
                            render={({ field }) => (
                                <Dropdown
                                    label="Vai trò"
                                    error={errors.role?.message}
                                    value={field.value}
                                    onChange={(value) => field.onChange(value)}
                                    options={roleOptions}
                                />
                            )}
                        />

                        <Controller
                            name="status"
                            control={control}
                            render={({ field }) => (
                                <Dropdown
                                    label="Trạng thái"
                                    error={errors.status?.message}
                                    value={field.value}
                                    onChange={(value) => field.onChange(value)}
                                    options={accountStatusOptions}
                                />
                            )}
                        />
                    </div>

                    {!isCreate && (
                        <div className="mt-5">
                            <Controller
                                name="emailVerified"
                                control={control}
                                render={({ field }) => (
                                    <Checkbox
                                        title="Email đã xác thực"
                                        checked={field.value}
                                        isDisable
                                        onChange={(e) => field.onChange(e.target.checked)}
                                    />
                                )}
                            />
                        </div>
                    )}
                </Card>

                <Card title="Thông tin cá nhân">
                    <div className="grid grid-cols-2 gap-5">
                        <TextField label="Họ và tên" error={errors.fullName?.message} {...register('fullName')} />

                        <Controller
                            name="gender"
                            control={control}
                            render={({ field }) => (
                                <Dropdown
                                    label="Giới tính"
                                    error={errors.gender?.message}
                                    value={field.value}
                                    onChange={(value) => field.onChange(value)}
                                    options={genderOptions}
                                />
                            )}
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
                        value={avatarUrl}
                        onChange={(file) => {
                            setValue('avatarFile', file);
                            setValue('avatarUrl', URL.createObjectURL(file), {
                                shouldDirty: true,
                            });
                        }}
                    />
                </Card>
            </form>

            <Confirmation
                open={openConfirm}
                title={isCreate ? 'Tạo người dùng' : 'Cập nhật người dùng'}
                message={
                    isCreate
                        ? 'Bạn có chắc chắn muốn tạo người dùng này?'
                        : 'Bạn có chắc chắn muốn cập nhật thông tin người dùng này?'
                }
                onCancel={() => {
                    setOpenConfirm(false);
                    setSubmitValues(null);
                }}
                onConfirm={handleConfirm}
            />
        </React.Fragment>
    );
}
