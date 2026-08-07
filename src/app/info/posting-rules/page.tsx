import { FiCheck, FiX } from 'react-icons/fi';
import InfoPageShell, { InfoCard } from '@/shared/components/info-page/info-page-shell';

export default function PostingRulesPage() {
    const allowed = [
        'Mô tả đúng hiện trạng và diện tích',
        'Công khai giá thuê và chi phí',
        'Sử dụng ảnh thật, rõ ràng',
        'Cung cấp địa chỉ phù hợp',
    ];
    const denied = [
        'Đăng trùng lặp để chiếm vị trí',
        'Dùng hình ảnh không có quyền sử dụng',
        'Cung cấp giá hoặc thông tin sai',
        'Chèn quảng cáo không liên quan',
    ];
    return (
        <InfoPageShell
            title="Quy định đăng tin"
            description="Tiêu chuẩn giúp bài đăng minh bạch và hữu ích cho người thuê."
        >
            <div className="space-y-6">
                <div className="grid gap-5 md:grid-cols-2">
                    <InfoCard>
                        <h2 className="flex gap-2 text-xl font-semibold text-emerald-700">
                            <FiCheck />
                            Được phép
                        </h2>
                        <ul className="mt-4 space-y-3 text-slate-600">
                            {allowed.map((item) => (
                                <li key={item}>• {item}</li>
                            ))}
                        </ul>
                    </InfoCard>
                    <InfoCard>
                        <h2 className="flex gap-2 text-xl font-semibold text-rose-700">
                            <FiX />
                            Không được phép
                        </h2>
                        <ul className="mt-4 space-y-3 text-slate-600">
                            {denied.map((item) => (
                                <li key={item}>• {item}</li>
                            ))}
                        </ul>
                    </InfoCard>
                </div>
                <InfoCard>
                    <h2 className="text-xl font-semibold">Quy trình kiểm tra</h2>
                    <div className="mt-5 grid gap-4 md:grid-cols-4">
                        {['Landlord tạo bài', 'Gửi duyệt', 'Kiểm tra nội dung', 'Xuất bản'].map((step, index) => (
                            <div key={step} className="rounded-xl bg-slate-50 p-4">
                                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white">
                                    {index + 1}
                                </span>
                                <p className="mt-3 font-medium">{step}</p>
                            </div>
                        ))}
                    </div>
                </InfoCard>
            </div>
        </InfoPageShell>
    );
}
