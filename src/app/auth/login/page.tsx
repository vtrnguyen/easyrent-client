"use client";

import Link from "next/link";
import { FiLock, FiMail } from "react-icons/fi";

import { authApi } from "@/api/auth.api";
import { authStorage, getHomeRoute } from "@/common/helpers/helper";
import Button from "@/shared/components/forms/button";
import TextField from "@/shared/components/forms/text-field";
import { useAuthStore } from "@/stores/auth.store";
import { loginSchema, LoginSchema } from "@/validations/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function LoginPage() {
    const router = useRouter();

    const setUser = useAuthStore((state) => state.setUser);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (values: LoginSchema) => {
        try {
            const response = await authApi.login(values);
            const loginData = response.data;

            authStorage.save({
                accessToken: loginData.accessToken,
                userId: loginData.userId,
                role: loginData.role,
                status: loginData.status,
                lastLoginAt: loginData.lastLoginAt,
            });

            setUser(loginData);

            toast.success("Đăng nhập thành công!");

            router.push(getHomeRoute(loginData.role));
        } catch (error: any) {
            toast.error(error.response?.data?.message ?? "Đăng nhập thất bại");
        }
    }

    return (
        <section
            className="w-full bg-white lg:rounded-[2rem] lg:border lg:border-white/10 lg:p-8 lg:shadow-[0_24px_80px_rgba(15,23,42,0.22)]"
        >
            <div className="mb-8 space-y-3">
                <h1 className="text-center text-3xl font-semibold tracking-tight text-slate-950 lg:text-left">
                    Chào mừng trở lại
                </h1>
            </div>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-5"
            >
                <TextField
                    label="Email hoặc số điện thoại"
                    placeholder="Nhập email hoặc số điện thoại"
                    leftIcon={<FiMail />}
                    error={errors.identifier?.message}
                    {...register("identifier")}
                />

                <TextField
                    label="Mật khẩu"
                    type="password"
                    placeholder="Nhập mật khẩu"
                    leftIcon={<FiLock />}
                    error={errors.password?.message}
                    {...register("password")}
                />

                <Button
                    type="submit"
                    fullWidth
                    iconPosition="right"
                >
                    {isSubmitting ? "Đang đăng nhập..." : "Đăng nhập"}
                </Button>
            </form>

            <div className="mt-6 text-center text-sm text-slate-600">
                Chưa có tài khoản?{" "}
                <Link href="/auth/register" className="font-semibold text-slate-950 underline-offset-4">
                    Tạo tài khoản
                </Link>
            </div>
        </section>
    );
}