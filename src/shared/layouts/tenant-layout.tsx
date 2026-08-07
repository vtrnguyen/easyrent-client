'use client';

import { appRoutes, Roles } from '@/common/constants/appConstants';
import AuthGuard from '../guards/auth-guard';
import TenantHeader from './tenant-header';
import TextField from '../components/text-field/text-field';
import Button from '../components/buttons/button';
import Image from 'next/image';
import Link from 'next/link';

interface TenantLayoutProps {
    children: React.ReactNode;
}

export default function TenantLayout({ children }: TenantLayoutProps) {
    return (
        <AuthGuard allowedRoles={[Roles.Tenant]}>
            <div className="flex min-h-screen flex-col bg-[#f7f5f2] text-slate-900">
                <TenantHeader />

                <main className="min-w-0 flex-1 px-4 py-5 sm:px-6 sm:py-6 lg:px-10">{children}</main>

                <footer className="border-t border-slate-200 bg-white">
                    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-10">
                        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-[1.2fr_0.9fr_0.9fr_1.1fr]">
                            <div className="space-y-4">
                                <div className="space-y-1">
                                    <p className="text-lg font-semibold text-slate-900">EasyRent</p>
                                    <p className="text-sm text-slate-500">Nền tảng thuê nhà và đăng tin cho tenant.</p>
                                </div>

                                <div className="space-y-2 text-sm text-slate-600">
                                    <p>Công ty Cổ phần EasyRent Việt Nam</p>
                                    <p>Tầng 31, Keangnam Hanoi Landmark Tower, Phường Yên Hòa, Hà Nội</p>
                                    <p>Hotline: 0686868688</p>
                                    <p>Email: info@easyrent.com.vn</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-sm font-semibold tracking-[0.18em] text-slate-900 uppercase">
                                    Hướng dẫn
                                </h3>
                                <ul className="space-y-3 text-sm text-slate-600">
                                    <li>
                                        <Link
                                            className="transition hover:text-blue-600"
                                            href={`/${appRoutes.info}/${appRoutes.aboutUs}`}
                                        >
                                            Về chúng tôi
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            className="transition hover:text-blue-600"
                                            href={`/${appRoutes.info}/${appRoutes.pricingAndSupport}`}
                                        >
                                            Báo giá và hỗ trợ
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            className="transition hover:text-blue-600"
                                            href={`/${appRoutes.info}/${appRoutes.frequentlyAskedQuestions}`}
                                        >
                                            Câu hỏi thường gặp
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            className="transition hover:text-blue-600"
                                            href={`/${appRoutes.info}/${appRoutes.feedbackAndBugReport}`}
                                        >
                                            Góp ý báo lỗi
                                        </Link>
                                    </li>
                                </ul>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-sm font-semibold tracking-[0.18em] text-slate-900 uppercase">
                                    Quy định
                                </h3>
                                <ul className="space-y-3 text-sm text-slate-600">
                                    <li>
                                        <Link
                                            className="transition hover:text-blue-600"
                                            href={`/${appRoutes.info}/${appRoutes.postingRules}`}
                                        >
                                            Quy định đăng tin
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            className="transition hover:text-blue-600"
                                            href={`/${appRoutes.info}/${appRoutes.operatingRegulations}`}
                                        >
                                            Quy chế hoạt động
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            className="transition hover:text-blue-600"
                                            href={`/${appRoutes.info}/${appRoutes.termsAndConditions}`}
                                        >
                                            Điều khoản thỏa thuận
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            className="transition hover:text-blue-600"
                                            href={`/${appRoutes.info}/${appRoutes.privacyPolicy}`}
                                        >
                                            Chính sách bảo mật
                                        </Link>
                                    </li>
                                </ul>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-sm font-semibold tracking-[0.18em] text-slate-900 uppercase">
                                    Đăng ký nhận tin
                                </h3>

                                <div className="flex items-start gap-2">
                                    <TextField
                                        type="email"
                                        aria-label="Email nhận tin"
                                        placeholder="Nhập email của bạn"
                                        containerClassName="min-w-0 flex-1"
                                    />
                                    <Button type="button" variant="blue">
                                        Gửi
                                    </Button>
                                </div>

                                <div className="space-y-2">
                                    <p className="text-sm font-semibold tracking-[0.18em] text-slate-900 uppercase">
                                        Tải ứng dụng EasyRent
                                    </p>
                                    <div className="flex items-center gap-3">
                                        <div className="relative h-28 w-28 overflow-hidden rounded-xl border border-slate-200 bg-white p-1">
                                            <Image
                                                src="/easyrent_qrcode.png"
                                                alt="Mã QR tải ứng dụng EasyRent"
                                                fill
                                                className="object-contain p-1"
                                            />
                                        </div>
                                        <p className="max-w-36 text-sm leading-6 text-slate-500">
                                            Quét mã QR để tải và trải nghiệm EasyRent trên điện thoại.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-10 border-t border-slate-200 pt-6 text-sm text-slate-500">
                            <p>Copyright © 2026 EasyRent</p>
                        </div>
                    </div>
                </footer>
            </div>
        </AuthGuard>
    );
}
