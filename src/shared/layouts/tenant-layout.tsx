'use client';

import { allowedLanguages, Roles } from '@/common/constants/appConstants';
import AuthGuard from '../guards/auth-guard';
import TenantHeader from './tenant-header';
import Dropdown from '../components/dropdown/dropdown';

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
                                    <li>Về chúng tôi</li>
                                    <li>Báo giá và hỗ trợ</li>
                                    <li>Câu hỏi thường gặp</li>
                                    <li>Góp ý báo lỗi</li>
                                </ul>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-sm font-semibold tracking-[0.18em] text-slate-900 uppercase">
                                    Quy định
                                </h3>
                                <ul className="space-y-3 text-sm text-slate-600">
                                    <li>Quy định đăng tin</li>
                                    <li>Quy chế hoạt động</li>
                                    <li>Điều khoản thỏa thuận</li>
                                    <li>Chính sách bảo mật</li>
                                </ul>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-sm font-semibold tracking-[0.18em] text-slate-900 uppercase">
                                    Đăng ký nhận tin
                                </h3>

                                <div className="flex min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                                    <input
                                        type="email"
                                        placeholder="Nhập email của bạn"
                                        className="h-12 min-w-0 flex-1 px-4 text-sm outline-none placeholder:text-slate-400"
                                    />
                                    <button
                                        type="button"
                                        className="h-12 bg-[#eb4d3d] px-4 text-sm font-semibold text-white transition hover:bg-[#d94435]"
                                    >
                                        Gửi
                                    </button>
                                </div>

                                <div className="space-y-2">
                                    <p className="text-sm font-semibold tracking-[0.18em] text-slate-900 uppercase">
                                        Quốc gia & ngôn ngữ
                                    </p>
                                    <Dropdown options={allowedLanguages} />
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
