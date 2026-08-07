import { FiCheckCircle, FiShield } from 'react-icons/fi';
import InfoPageShell, { InfoCard } from '@/shared/components/info-page/info-page-shell';

export default function PrivacyPage() {
    const data = [
        ['Dữ liệu tài khoản', 'Họ tên, email, số điện thoại, ảnh đại diện và thông tin xác minh.'],
        ['Dữ liệu sử dụng', 'Tìm kiếm, bài đăng yêu thích và nhật ký truy cập phục vụ bảo mật.'],
        ['Mục đích sử dụng', 'Xác thực, cung cấp dịch vụ, hỗ trợ và ngăn chặn hành vi bất thường.'],
        ['Thời gian lưu trữ', 'Trong thời gian tài khoản hoạt động hoặc theo yêu cầu pháp luật.'],
    ];
    const rights = [
        'Xem dữ liệu cá nhân',
        'Yêu cầu chỉnh sửa thông tin',
        'Yêu cầu hỗ trợ về quyền riêng tư',
        'Nhận thông báo sự cố quan trọng',
    ];
    return (
        <InfoPageShell
            title="Chính sách bảo mật"
            description="Cách EasyRent thu thập, sử dụng và bảo vệ dữ liệu cá nhân."
        >
            <div className="space-y-6">
                <InfoCard className="border-blue-200 bg-blue-50">
                    <div className="flex gap-4">
                        <FiShield className="h-8 w-8 shrink-0 text-blue-700" />
                        <div>
                            <h2 className="text-xl font-semibold">Cam kết bảo vệ dữ liệu</h2>
                            <p className="mt-2 leading-7 text-slate-600">
                                EasyRent chỉ xử lý dữ liệu cần thiết để vận hành tài khoản, cung cấp tính năng và bảo vệ
                                hệ thống.
                            </p>
                        </div>
                    </div>
                </InfoCard>
                <div className="grid gap-5 md:grid-cols-2">
                    {data.map(([title, text]) => (
                        <InfoCard key={title}>
                            <h2 className="font-semibold">{title}</h2>
                            <p className="mt-3 text-sm leading-6 text-slate-600">{text}</p>
                        </InfoCard>
                    ))}
                </div>
                <InfoCard>
                    <h2 className="text-xl font-semibold">Quyền của người dùng</h2>
                    <div className="mt-5 grid gap-3 sm:grid-cols-2">
                        {rights.map((item) => (
                            <p key={item} className="flex gap-2 rounded-xl bg-slate-50 p-3 text-sm">
                                <FiCheckCircle className="text-emerald-600" />
                                {item}
                            </p>
                        ))}
                    </div>
                </InfoCard>
            </div>
        </InfoPageShell>
    );
}
