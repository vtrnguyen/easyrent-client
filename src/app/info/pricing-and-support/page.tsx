import { FiCheck } from 'react-icons/fi';
import Button from '@/shared/components/buttons/button';
import InfoPageShell, { InfoCard } from '@/shared/components/info-page/info-page-shell';

export default function PricingPage() {
    const plans = [
        { name: 'Tenant', price: 'Miễn phí', items: ['Tìm kiếm chỗ ở', 'Xem bài đăng', 'Lưu bài viết yêu thích'] },
        {
            name: 'Landlord Cơ bản',
            price: '99.000 ₫/tháng',
            items: ['Tối đa 10 chỗ ở', 'Quản lý bài đăng', 'Hỗ trợ qua email'],
        },
        {
            name: 'Landlord Pro',
            price: '249.000 ₫/tháng',
            items: ['Không giới hạn chỗ ở', 'Thống kê hiệu quả', 'Ưu tiên hỗ trợ'],
        },
    ];
    return (
        <InfoPageShell title="Báo giá và hỗ trợ" description="Các gói dịch vụ mock dành cho Tenant và Landlord.">
            <div className="space-y-6">
                <div className="grid gap-5 lg:grid-cols-3">
                    {plans.map((plan, index) => (
                        <InfoCard key={plan.name} className={index === 1 ? 'border-blue-300 ring-2 ring-blue-100' : ''}>
                            <p className="font-semibold text-blue-600">{plan.name}</p>
                            <p className="mt-3 text-2xl font-semibold">{plan.price}</p>
                            <ul className="mt-5 space-y-3">
                                {plan.items.map((item) => (
                                    <li key={item} className="flex gap-2 text-sm text-slate-600">
                                        <FiCheck className="text-emerald-600" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <Button fullWidth className="mt-6" variant={index === 1 ? 'blue' : 'secondary'}>
                                Chọn gói
                            </Button>
                        </InfoCard>
                    ))}
                </div>
                <p className="text-center text-sm text-slate-500">
                    Mức giá trên là dữ liệu mock, chưa áp dụng thanh toán thực tế.
                </p>
            </div>
        </InfoPageShell>
    );
}
