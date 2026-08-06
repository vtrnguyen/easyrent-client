import Link from 'next/link';
import { FiCalendar, FiDollarSign, FiHome, FiPlus, FiUsers } from 'react-icons/fi';
import Badge from '@/shared/components/badge/badge';
import BarChart from '@/shared/components/dashboard/bar-chart';
import StatCard from '@/shared/components/dashboard/stat-card';

const revenue = [
    { label: 'T2', value: 34, displayValue: '34tr' },
    { label: 'T3', value: 38, displayValue: '38tr' },
    { label: 'T4', value: 36, displayValue: '36tr' },
    { label: 'T5', value: 43, displayValue: '43tr' },
    { label: 'T6', value: 46, displayValue: '46tr' },
    { label: 'T7', value: 48, displayValue: '48tr' },
];
const properties = [
    { name: 'Căn hộ Sunrise City A12', tenant: 'Nguyễn Hoàng Nam', price: '12.000.000 đ', status: 'Đang cho thuê' },
    { name: 'Phòng trọ An Phú 203', tenant: 'Chưa có người thuê', price: '4.200.000 đ', status: 'Đang trống' },
    { name: 'Căn hộ Vinhomes S2.08', tenant: 'Trần Minh Anh', price: '15.500.000 đ', status: 'Đã đặt' },
    { name: 'Nhà nguyên căn Bình Thạnh', tenant: 'Lê Tuấn Kiệt', price: '16.000.000 đ', status: 'Đang cho thuê' },
];

export default function LandlordPage() {
    return (
        <section className="space-y-6">
            <div className="flex min-h-10 flex-wrap items-start justify-between gap-3">
                <div>
                    <h1 className="text-2xl font-semibold text-slate-900">Tổng quan cho thuê</h1>
                    <p className="mt-1 text-sm text-slate-500">Tình hình chỗ ở và các công việc cần theo dõi.</p>
                </div>
                <div className="flex items-center gap-2">
                    <Badge variant="info">Dữ liệu minh họa</Badge>
                    <Link
                        href="/landlord/properties/create"
                        className="inline-flex h-10 items-center gap-2 rounded-xl bg-blue-600 px-4 text-sm font-medium text-white hover:bg-blue-700"
                    >
                        <FiPlus />
                        Thêm chỗ ở
                    </Link>
                </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <StatCard
                    label="Tổng chỗ ở"
                    value="12"
                    note="9 đang cho thuê, 2 đang trống"
                    icon={FiHome}
                    tone="blue"
                />
                <StatCard
                    label="Doanh thu tháng này"
                    value="48,2 triệu"
                    note="Đã thu 42,7 triệu đồng"
                    icon={FiDollarSign}
                    tone="green"
                />
                <StatCard
                    label="Yêu cầu thuê mới"
                    value="7"
                    note="3 yêu cầu chưa phản hồi"
                    icon={FiUsers}
                    tone="amber"
                />
                <StatCard
                    label="Lịch hẹn sắp tới"
                    value="4"
                    note="Lịch gần nhất: 09:30 hôm nay"
                    icon={FiCalendar}
                    tone="slate"
                />
            </div>
            <div className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
                <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                    <h2 className="font-semibold text-slate-900">Doanh thu 6 tháng</h2>
                    <p className="mt-1 text-sm text-slate-500">Tổng tiền thuê đã ghi nhận theo tháng</p>
                    <BarChart items={revenue} />
                </div>
                <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                    <h2 className="font-semibold text-slate-900">Công việc sắp tới</h2>
                    <div className="mt-4 space-y-3">
                        {[
                            {
                                time: 'Hôm nay · 09:30',
                                title: 'Dẫn khách xem phòng',
                                note: 'Phòng trọ An Phú 203',
                                tone: 'warning' as const,
                            },
                            {
                                time: 'Ngày mai · 14:00',
                                title: 'Kiểm tra hiện trạng',
                                note: 'Căn hộ Sunrise City A12',
                                tone: 'info' as const,
                            },
                            {
                                time: '12/08 · Cả ngày',
                                title: 'Thu tiền thuê',
                                note: '3 hợp đồng đến hạn',
                                tone: 'danger' as const,
                            },
                        ].map((item) => (
                            <div key={item.title} className="rounded-lg border border-slate-200 p-3">
                                <div className="flex items-start justify-between gap-2">
                                    <p className="text-sm font-medium text-slate-900">{item.title}</p>
                                    <Badge variant={item.tone}>{item.time}</Badge>
                                </div>
                                <p className="mt-2 text-xs text-slate-500">{item.note}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
                <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                    <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
                        <h2 className="font-semibold text-slate-900">Hiệu quả chỗ ở</h2>
                        <Link
                            href="/landlord/properties"
                            className="text-sm font-medium text-blue-600 hover:text-blue-700"
                        >
                            Xem tất cả
                        </Link>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-slate-50 text-xs text-slate-500 uppercase">
                                <tr>
                                    <th className="px-5 py-3">Chỗ ở</th>
                                    <th className="px-5 py-3">Người thuê</th>
                                    <th className="px-5 py-3">Giá thuê</th>
                                    <th className="px-5 py-3">Trạng thái</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {properties.map((item) => (
                                    <tr key={item.name}>
                                        <td className="px-5 py-4 font-medium text-slate-900">{item.name}</td>
                                        <td className="px-5 py-4 text-slate-600">{item.tenant}</td>
                                        <td className="px-5 py-4 text-slate-700">{item.price}</td>
                                        <td className="px-5 py-4">
                                            <Badge
                                                variant={
                                                    item.status === 'Đang cho thuê'
                                                        ? 'success'
                                                        : item.status === 'Đã đặt'
                                                          ? 'warning'
                                                          : 'info'
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
                    <h2 className="font-semibold text-slate-900">Yêu cầu thuê gần đây</h2>
                    <div className="mt-4 divide-y divide-slate-100">
                        {[
                            ['Phạm Thảo Vy', 'Căn hộ Sunrise City A12', '5 phút trước'],
                            ['Đỗ Minh Quân', 'Phòng trọ An Phú 203', '2 giờ trước'],
                            ['Vũ Ngọc Hà', 'Căn hộ Vinhomes S2.08', 'Hôm qua'],
                        ].map(([name, property, time]) => (
                            <div key={name} className="py-3 first:pt-0">
                                <div className="flex justify-between gap-3">
                                    <p className="text-sm font-medium text-slate-900">{name}</p>
                                    <span className="text-xs text-slate-400">{time}</span>
                                </div>
                                <p className="mt-1 text-xs text-slate-500">Quan tâm: {property}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
