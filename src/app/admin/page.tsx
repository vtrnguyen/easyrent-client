import { FiAlertCircle, FiHome, FiTrendingUp, FiUsers } from 'react-icons/fi';
import { MdOutlineRateReview } from 'react-icons/md';
import Badge from '@/shared/components/badge/badge';
import BarChart from '@/shared/components/dashboard/bar-chart';
import StatCard from '@/shared/components/dashboard/stat-card';

const growth = [
    { label: 'T2', value: 82 },
    { label: 'T3', value: 105 },
    { label: 'T4', value: 96 },
    { label: 'T5', value: 128 },
    { label: 'T6', value: 146 },
    { label: 'T7', value: 171 },
];
const recentProperties = [
    { name: 'Căn hộ Sunrise City', owner: 'Nguyễn Minh Khang', location: 'Quận 7, TP.HCM', status: 'Chờ duyệt' },
    { name: 'Phòng trọ An Phú', owner: 'Trần Thùy Linh', location: 'TP. Thủ Đức, TP.HCM', status: 'Đang trống' },
    { name: 'Nhà nguyên căn Hòa Xuân', owner: 'Lê Quốc Bảo', location: 'Cẩm Lệ, Đà Nẵng', status: 'Đã thuê' },
];

export default function AdminPage() {
    return (
        <section className="space-y-6">
            <div className="flex min-h-10 flex-wrap items-start justify-between gap-3">
                <div>
                    <h1 className="text-2xl font-semibold text-slate-900">Tổng quan hệ thống</h1>
                    <p className="mt-1 text-sm text-slate-500">Theo dõi hoạt động và các chỉ số vận hành chính.</p>
                </div>
                <Badge variant="info">Dữ liệu minh họa</Badge>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <StatCard
                    label="Tổng người dùng"
                    value="2.486"
                    note="+184 người dùng trong 30 ngày"
                    icon={FiUsers}
                    tone="blue"
                />
                <StatCard
                    label="Chỗ ở đang quản lý"
                    value="1.248"
                    note="86 chỗ ở mới trong tháng"
                    icon={FiHome}
                    tone="green"
                />
                <StatCard
                    label="Tỷ lệ lấp đầy"
                    value="72,4%"
                    note="Tăng 3,2% so với tháng trước"
                    icon={FiTrendingUp}
                    tone="amber"
                />
                <StatCard
                    label="Bài viết chờ duyệt"
                    value="18"
                    note="5 bài đã chờ quá 24 giờ"
                    icon={MdOutlineRateReview}
                    tone="slate"
                />
            </div>
            <div className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
                <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div>
                        <h2 className="font-semibold text-slate-900">Người dùng đăng ký mới</h2>
                        <p className="mt-1 text-sm text-slate-500">Số tài khoản mới trong 6 tháng gần nhất</p>
                    </div>
                    <BarChart items={growth} />
                </div>
                <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                    <h2 className="font-semibold text-slate-900">Phân bổ trạng thái chỗ ở</h2>
                    <div className="mt-6 space-y-5">
                        {[
                            ['Đang trống', 344, 28, 'bg-emerald-500'],
                            ['Đã đặt', 112, 9, 'bg-amber-500'],
                            ['Đang cho thuê', 792, 63, 'bg-blue-600'],
                        ].map(([label, count, percent, color]) => (
                            <div key={String(label)}>
                                <div className="mb-2 flex justify-between text-sm">
                                    <span className="text-slate-600">{label}</span>
                                    <span className="font-medium text-slate-900">
                                        {count} · {percent}%
                                    </span>
                                </div>
                                <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                                    <div className={`h-full ${color}`} style={{ width: `${percent}%` }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
                <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                    <div className="border-b border-slate-200 px-5 py-4">
                        <h2 className="font-semibold text-slate-900">Chỗ ở mới cập nhật</h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-slate-50 text-xs text-slate-500 uppercase">
                                <tr>
                                    <th className="px-5 py-3">Chỗ ở</th>
                                    <th className="px-5 py-3">Chủ nhà</th>
                                    <th className="px-5 py-3">Khu vực</th>
                                    <th className="px-5 py-3">Trạng thái</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {recentProperties.map((item) => (
                                    <tr key={item.name}>
                                        <td className="px-5 py-4 font-medium text-slate-900">{item.name}</td>
                                        <td className="px-5 py-4 text-slate-600">{item.owner}</td>
                                        <td className="px-5 py-4 text-slate-600">{item.location}</td>
                                        <td className="px-5 py-4">
                                            <Badge
                                                variant={
                                                    item.status === 'Chờ duyệt'
                                                        ? 'warning'
                                                        : item.status === 'Đã thuê'
                                                          ? 'info'
                                                          : 'success'
                                                }
                                            >
                                                {item.status}
                                            </Badge>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="flex items-center gap-2">
                        <FiAlertCircle className="text-amber-600" />
                        <h2 className="font-semibold text-slate-900">Cần xử lý</h2>
                    </div>
                    <div className="mt-4 divide-y divide-slate-100">
                        {[
                            ['18 bài viết chờ duyệt', 'Kiểm tra nội dung đăng mới'],
                            ['7 báo cáo từ người dùng', 'Phân loại và phản hồi báo cáo'],
                            ['12 tài khoản chưa xác minh', 'Rà soát hồ sơ chủ nhà'],
                        ].map(([title, note]) => (
                            <div key={title} className="py-3 first:pt-0">
                                <p className="text-sm font-medium text-slate-800">{title}</p>
                                <p className="mt-1 text-xs text-slate-500">{note}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
