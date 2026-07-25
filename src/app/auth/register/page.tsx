"use client";

import Link from "next/link";
import { FiLock, FiMail, FiMapPin, FiPhone, FiUser } from "react-icons/fi";

import { authApi } from "@/api/auth.api";
import { Gender } from "@/common/enums/appEnums";
import { authStorage, getHomeRoute } from "@/common/helpers/helper";
import Button from "@/shared/components/buttons/button";
import Select from "@/shared/components/select/select";
import TextField from "@/shared/components/text-field/text-field";
import { useAuthStore } from "@/stores/auth.store";
import { registerSchema, RegisterSchema } from "@/validations/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function RegisterPage() {
    const router = useRouter();
    const setUser = useAuthStore((state) => state.setUser);

    const {
        register,
        handleSubmit,
        formState: {
            errors,
            isSubmitting,
        },
    } = useForm<RegisterSchema>({
        resolver: zodResolver(registerSchema),
        defaultValues: { gender: Gender.Other },
    });

    const onSubmit = async (values: RegisterSchema) => {
        try {
            const response = await authApi.register(values);
            const registerData = response.data;

            authStorage.save(registerData);
            setUser(registerData);

            toast.success("Đăng ký thành công!");

            router.push(getHomeRoute(registerData.role));
        } catch (error: any) {
            toast.error(error?.response?.data?.message || "Đăng ký thất bại!");
        }
    };

    return (
        <section
            className="w-full bg-white lg:rounded-[2rem] lg:border lg:border-white/10 lg:p-8 lg:shadow-[0_24px_80px_rgba(15,23,42,0.22)]"
        >
            <div className="mb-8 space-y-3">
                <h1 className="text-center text-3xl font-semibold tracking-tight text-slate-950 lg:text-left">
                    Tạo tài khoản mới
                </h1>
            </div>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-5"
            >
                <div className="grid gap-4 md:grid-cols-2">
                    <TextField
                        label="Họ tên"
                        placeholder="Nhập họ và tên"
                        leftIcon={<FiUser />}
                        error={errors.fullName?.message}
                        {...register("fullName")}
                    />

                    <TextField
                        label="Email"
                        placeholder="Nhập email"
                        leftIcon={<FiMail />}
                        error={errors.email?.message}
                        {...register("email")}
                    />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                    <TextField
                        label="Số điện thoại"
                        placeholder="Nhập số điện thoại"
                        leftIcon={<FiPhone />}
                        error={errors.phoneNumber?.message}
                        {...register("phoneNumber")}
                    />

                    <Select
                        label="Giới tính"
                        placeholder="Chọn giới tính"
                        leftIcon={<FiMapPin />}
                        error={errors.gender?.message}
                        options={[
                            { label: "Nam", value: Gender.Male },
                            { label: "Nữ", value: Gender.Female },
                            { label: "Khác", value: Gender.Other },
                        ]}
                        {...register("gender")}
                    />
                </div>

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
                    {isSubmitting ? "Đang đăng ký..." : "Đăng ký"}
                </Button>
            </form>

            <div className="mt-6 text-center text-sm text-slate-600">
                Đã có tài khoản?{" "}
                <Link href="/auth/login" className="font-semibold text-slate-950 underline-offset-4">
                    Đăng nhập
                </Link>
            </div>
        </section>
    );
}