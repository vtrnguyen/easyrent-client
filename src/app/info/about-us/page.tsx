import { FiCheckCircle } from 'react-icons/fi';
import InfoPageShell, { InfoCard } from '@/shared/components/info-page/info-page-shell';

export default function AboutPage() {
    const values = [
        'Minh bạch trong thông tin chỗ ở',
        'Tôn trọng quyền riêng tư',
        'Đơn giản trong từng thao tác',
        'Cải tiến từ phản hồi thực tế',
    ];
    return (
        <InfoPageShell title="Về chúng tôi" description="EasyRent kết nối đúng người, đúng chỗ ở và đúng nhu cầu.">
            <div className="space-y-6">
                <div className="grid gap-4 sm:grid-cols-3">
                    {[
                        ['2026', 'Năm ra mắt'],
                        ['63', 'Tỉnh thành hướng tới'],
                        ['24/7', 'Tìm kiếm chỗ ở'],
                    ].map(([value, label]) => (
                        <InfoCard key={label} className="text-center">
                            <p className="text-3xl font-semibold text-blue-700">{value}</p>
                            <p className="mt-2 text-sm text-slate-500">{label}</p>
                        </InfoCard>
                    ))}
                </div>
                <div className="grid gap-5 lg:grid-cols-2">
                    <InfoCard>
                        <h2 className="text-xl font-semibold">Sứ mệnh</h2>
                        <p className="mt-3 leading-7 text-slate-600">
                            Đơn giản hóa hành trình tìm kiếm, đăng tin và quản lý chỗ ở trên một nền tảng thống nhất.
                        </p>
                    </InfoCard>
                    <InfoCard>
                        <h2 className="text-xl font-semibold">Giá trị cốt lõi</h2>
                        <ul className="mt-4 space-y-3">
                            {values.map((item) => (
                                <li key={item} className="flex gap-3 text-slate-600">
                                    <FiCheckCircle className="mt-1 text-emerald-600" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </InfoCard>
                </div>
                <InfoCard>
                    <h2 className="text-xl font-semibold">Lộ trình phát triển</h2>
                    <div className="mt-5 grid gap-5 md:grid-cols-3">
                        {[
                            ['Giai đoạn 1', 'Tìm kiếm, đăng tin và quản lý chỗ ở.'],
                            ['Giai đoạn 2', 'Yêu cầu thuê, hợp đồng và thông báo.'],
                            ['Giai đoạn 3', 'Gợi ý chỗ ở thông minh.'],
                        ].map(([step, text]) => (
                            <div key={step} className="border-l-2 border-blue-500 pl-4">
                                <p className="font-semibold text-blue-700">{step}</p>
                                <p className="mt-2 text-sm text-slate-600">{text}</p>
                            </div>
                        ))}
                    </div>
                </InfoCard>
            </div>
        </InfoPageShell>
    );
}
