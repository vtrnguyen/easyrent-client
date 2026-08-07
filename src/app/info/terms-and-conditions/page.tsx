import InfoPageShell, { InfoCard } from '@/shared/components/info-page/info-page-shell';

export default function TermsPage() {
    const clauses = [
        [
            '1. Tài khoản',
            'Người dùng chịu trách nhiệm về tính chính xác của thông tin đăng ký và bảo mật thông tin đăng nhập.',
        ],
        ['2. Phạm vi dịch vụ', 'EasyRent cung cấp công cụ kết nối, không trực tiếp là bên cho thuê hoặc bên thuê.'],
        [
            '3. Nội dung người dùng',
            'Người đăng chịu trách nhiệm về tính hợp pháp, chính xác và quyền sử dụng nội dung.',
        ],
        ['4. Tạm ngừng dịch vụ', 'Nội dung hoặc tài khoản có thể bị hạn chế khi vi phạm quy định.'],
        ['5. Giới hạn trách nhiệm', 'Các bên cần tự kiểm tra thông tin trước khi thực hiện giao dịch ngoài nền tảng.'],
    ];
    return (
        <InfoPageShell
            title="Điều khoản thỏa thuận"
            description="Điều kiện áp dụng khi đăng ký và sử dụng dịch vụ EasyRent."
        >
            <div className="grid gap-6 lg:grid-cols-[250px_1fr]">
                <InfoCard className="h-fit">
                    <p className="text-sm text-slate-500">Phiên bản</p>
                    <p className="mt-1 font-semibold">1.0 — Mock</p>
                    <p className="mt-4 text-sm text-slate-500">Hiệu lực dự kiến</p>
                    <p className="mt-1 font-semibold">07/08/2026</p>
                </InfoCard>
                <div className="space-y-4">
                    {clauses.map(([title, text]) => (
                        <InfoCard key={title}>
                            <h2 className="text-lg font-semibold">{title}</h2>
                            <p className="mt-3 leading-7 text-slate-600">{text}</p>
                        </InfoCard>
                    ))}
                </div>
            </div>
        </InfoPageShell>
    );
}
