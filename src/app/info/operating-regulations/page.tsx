import InfoPageShell, { InfoCard } from '@/shared/components/info-page/info-page-shell';

export default function OperatingRulesPage() {
    const roles = [
        ['Tenant', 'Tìm kiếm, xem bài đăng, lưu yêu thích và gửi yêu cầu thuê.'],
        ['Landlord', 'Quản lý chỗ ở, bài đăng và phản hồi tenant.'],
        ['Admin', 'Quản trị tài khoản, dữ liệu và xử lý vi phạm.'],
    ];
    const process = [
        ['01', 'Tiếp nhận', 'Ghi nhận báo cáo và thông tin liên quan.'],
        ['02', 'Xác minh', 'Đối chiếu nội dung, tài khoản và bằng chứng.'],
        ['03', 'Xử lý', 'Nhắc nhở, ẩn nội dung hoặc khóa tài khoản.'],
        ['04', 'Thông báo', 'Gửi kết quả tới các bên liên quan.'],
    ];
    return (
        <InfoPageShell
            title="Quy chế hoạt động"
            description="Cách EasyRent vận hành và phân định trách nhiệm giữa các bên."
        >
            <div className="space-y-6">
                <div className="grid gap-5 md:grid-cols-3">
                    {roles.map(([role, text]) => (
                        <InfoCard key={role}>
                            <p className="text-lg font-semibold text-blue-700">{role}</p>
                            <p className="mt-3 text-sm leading-6 text-slate-600">{text}</p>
                        </InfoCard>
                    ))}
                </div>
                <InfoCard>
                    <h2 className="text-xl font-semibold">Xử lý báo cáo vi phạm</h2>
                    <div className="mt-5 space-y-4">
                        {process.map(([number, title, text]) => (
                            <div key={number} className="flex gap-4 border-b border-slate-100 pb-4 last:border-0">
                                <span className="font-mono text-blue-600">{number}</span>
                                <div>
                                    <p className="font-semibold">{title}</p>
                                    <p className="mt-1 text-sm text-slate-600">{text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </InfoCard>
            </div>
        </InfoPageShell>
    );
}
