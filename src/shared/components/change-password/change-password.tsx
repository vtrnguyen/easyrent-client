'use client';

import { useEffect } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { authApi } from '@/api/auth.api';
import Button from '@/shared/components/buttons/button';
import Dialog from '@/shared/components/dialog/dialog';
import TextField from '@/shared/components/text-field/text-field';
import useLoadingOverlay from '@/shared/hooks/useLoadingOverlay';

import { ChangePasswordForm, changePasswordSchema } from '@/validations/change-password.schema';
import axios from 'axios';

interface ChangePasswordDialogProps {
    open: boolean;
    onClose: () => void;
}

export default function ChangePassword({ open, onClose }: ChangePasswordDialogProps) {
    const loading = useLoadingOverlay();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ChangePasswordForm>({
        resolver: zodResolver(changePasswordSchema),
        defaultValues: {
            currentPassword: '',
            newPassword: '',
            confirmNewPassword: '',
        },
    });

    useEffect(() => {
        if (open) {
            reset();
        }
    }, [open, reset]);

    const handleClose = () => {
        reset();
        onClose();
    };

    const handleChangePassword = async (values: ChangePasswordForm) => {
        try {
            loading.open();

            await authApi.changePassword(values);

            toast.success('Đổi mật khẩu thành công.');

            reset();
            onClose();
        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data?.message ?? error.message);
            } else {
                toast.error((error as Error).message);
            }
        } finally {
            loading.close();
        }
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <form onSubmit={handleSubmit(handleChangePassword)} className="space-y-6 p-6">
                <div>
                    <h2 className="text-xl font-semibold">Đổi mật khẩu</h2>
                </div>

                <div className="space-y-4">
                    <TextField
                        type="password"
                        label="Mật khẩu hiện tại"
                        error={errors.currentPassword?.message}
                        {...register('currentPassword')}
                    />

                    <TextField
                        type="password"
                        label="Mật khẩu mới"
                        error={errors.newPassword?.message}
                        {...register('newPassword')}
                    />

                    <TextField
                        type="password"
                        label="Xác nhận mật khẩu mới"
                        error={errors.confirmNewPassword?.message}
                        {...register('confirmNewPassword')}
                    />
                </div>

                <div className="flex justify-center gap-3">
                    <Button variant="secondary" onClick={handleClose}>
                        Hủy
                    </Button>

                    <Button type="submit" variant="blue">
                        Đổi mật khẩu
                    </Button>
                </div>
            </form>
        </Dialog>
    );
}
