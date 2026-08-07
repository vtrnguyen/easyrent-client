'use client';

import TenantLayout from '@/shared/layouts/tenant-layout';
import Button from '@/shared/components/buttons/button';
import Card from '@/shared/components/card/card';
import PropertySearchForm from '@/shared/components/property-search/property-search-form';

const postingCards = [
    {
        id: 1,
        title: 'Căn hộ 2 phòng ngủ gần trung tâm',
        location: 'Quận 3, TP. Hồ Chí Minh',
        price: '12 triệu / tháng',
        area: '68m²',
        tag: 'Mới đăng',
    },
    {
        id: 2,
        title: 'Nhà nguyên căn có sân rộng',
        location: 'Phú Nhuận, TP. Hồ Chí Minh',
        price: '18 triệu / tháng',
        area: '95m²',
        tag: 'Ưu tiên',
    },
    {
        id: 3,
        title: 'Studio đầy đủ nội thất',
        location: 'Bình Thạnh, TP. Hồ Chí Minh',
        price: '8,5 triệu / tháng',
        area: '32m²',
        tag: 'Nổi bật',
    },
    {
        id: 4,
        title: 'Căn hộ cho thuê có ban công',
        location: 'Thủ Đức, TP. Hồ Chí Minh',
        price: '10 triệu / tháng',
        area: '52m²',
        tag: 'Đề xuất',
    },
    {
        id: 5,
        title: 'Nhà phố 3 tầng tiện kinh doanh',
        location: 'Tân Bình, TP. Hồ Chí Minh',
        price: '24 triệu / tháng',
        area: '110m²',
        tag: 'Mới đăng',
    },
    {
        id: 6,
        title: 'Căn hộ view sông thoáng mát',
        location: 'Quận 7, TP. Hồ Chí Minh',
        price: '16 triệu / tháng',
        area: '74m²',
        tag: 'Ưu tiên',
    },
    {
        id: 7,
        title: 'Phòng trọ riêng tư, an ninh tốt',
        location: 'Gò Vấp, TP. Hồ Chí Minh',
        price: '4,2 triệu / tháng',
        area: '24m²',
        tag: 'Giá tốt',
    },
    {
        id: 8,
        title: 'Căn hộ 1 phòng ngủ trung tâm',
        location: 'Quận 1, TP. Hồ Chí Minh',
        price: '15 triệu / tháng',
        area: '48m²',
        tag: 'Nổi bật',
    },
    {
        id: 9,
        title: 'Căn hộ 2 phòng ngủ nội thất mới',
        location: 'Bình Tân, TP. Hồ Chí Minh',
        price: '11 triệu / tháng',
        area: '60m²',
        tag: 'Mới đăng',
    },
    {
        id: 10,
        title: 'Nhà nguyên căn gần trường học',
        location: 'Hà Đông, Hà Nội',
        price: '14 triệu / tháng',
        area: '80m²',
        tag: 'Nổi bật',
    },
    {
        id: 11,
        title: 'Căn hộ dịch vụ đầy đủ tiện ích',
        location: 'Cầu Giấy, Hà Nội',
        price: '9 triệu / tháng',
        area: '40m²',
        tag: 'Ưu tiên',
    },
    {
        id: 12,
        title: 'Nhà phố phù hợp gia đình',
        location: 'Thanh Xuân, Hà Nội',
        price: '20 triệu / tháng',
        area: '98m²',
        tag: 'Đề xuất',
    },
];

const featuredPlaces = [
    'Căn hộ trung tâm Quận 1',
    'Nhà nguyên căn Quận 7',
    'Phòng trọ sinh viên Thủ Đức',
    'Căn hộ gia đình Cầu Giấy',
];

export default function Home() {
    return (
        <TenantLayout>
            <div className="mx-auto max-w-7xl space-y-10">
                <PropertySearchForm />

                <section className="space-y-5">
                    <div className="flex flex-wrap items-end justify-between gap-4">
                        <div>
                            <p className="text-sm font-semibold tracking-[0.18em] text-slate-500 uppercase">
                                Nơi ở dành cho bạn
                            </p>
                            <h2 className="mt-1 text-2xl font-semibold text-slate-900">Gợi ý bài đăng phù hợp</h2>
                        </div>

                        <Button variant="primary">Xem thêm</Button>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                        {postingCards.slice(0, 8).map((item) => (
                            <article
                                key={item.id}
                                className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                            >
                                <div className="aspect-[4/3] bg-gradient-to-br from-slate-200 via-slate-100 to-amber-50" />
                                <div className="space-y-3 p-4">
                                    <div className="flex items-center justify-between gap-3">
                                        <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
                                            {item.tag}
                                        </span>
                                        <span className="text-xs text-slate-500">{item.area}</span>
                                    </div>
                                    <div className="space-y-1">
                                        <h3 className="line-clamp-2 text-base font-semibold text-slate-900">
                                            {item.title}
                                        </h3>
                                        <p className="text-sm text-slate-500">{item.location}</p>
                                    </div>
                                    <p className="text-lg font-semibold text-blue-700">{item.price}</p>
                                </div>
                            </article>
                        ))}
                    </div>

                    <div className="flex justify-center">
                        <Button variant="blue">Xem thêm bài đăng</Button>
                    </div>
                </section>

                <section className="space-y-5">
                    <div>
                        <p className="text-sm font-semibold tracking-[0.18em] text-slate-500 uppercase">
                            Nơi ở nổi bật
                        </p>
                        <h2 className="mt-1 text-2xl font-semibold text-slate-900">Các khu vực đang được quan tâm</h2>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                        {featuredPlaces.map((place) => (
                            <Card key={place} title={place}>
                                <div className="space-y-3">
                                    <div className="h-40 rounded-2xl bg-gradient-to-br from-slate-200 via-slate-100 to-emerald-50" />
                                    <p className="text-sm text-slate-600">
                                        Mock giao diện nơi ở nổi bật, sau này sẽ thay bằng dữ liệu từ API.
                                    </p>
                                </div>
                            </Card>
                        ))}
                    </div>
                </section>
            </div>
        </TenantLayout>
    );
}
