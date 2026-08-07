import { FiAlertTriangle } from 'react-icons/fi';
import Button from '@/shared/components/buttons/button';
import TextArea from '@/shared/components/textarea/textarea';
import TextField from '@/shared/components/text-field/text-field';
import InfoPageShell, { InfoCard } from '@/shared/components/info-page/info-page-shell';

export default function FeedbackPage() {
    return (
        <InfoPageShell title="Góp ý và báo lỗi" description="Gửi phản hồi để EasyRent kiểm tra và cải thiện sản phẩm.">
            <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
                <InfoCard>
                    <h2 className="text-xl font-semibold">Thông tin phản hồi</h2>
                    <div className="mt-5 grid gap-4 sm:grid-cols-2">
                        <TextField label="Họ và tên" placeholder="Nguyễn Văn A" />
                        <TextField label="Email" type="email" placeholder="name@example.com" />
                        <TextField
                            label="Trang xảy ra lỗi"
                            placeholder="Ví dụ: /properties"
                            containerClassName="sm:col-span-2"
                        />
                        <TextArea
                            label="Mô tả lỗi hoặc góp ý"
                            placeholder="Mô tả thao tác và kết quả thực tế..."
                            containerClassName="sm:col-span-2"
                        />
                    </div>
                    <div className="mt-5 flex justify-end">
                        <Button variant="blue">Gửi phản hồi</Button>
                    </div>
                </InfoCard>
                <div className="space-y-5">
                    <InfoCard>
                        <FiAlertTriangle className="h-7 w-7 text-amber-500" />
                        <h2 className="mt-3 font-semibold">Để xử lý nhanh hơn</h2>
                        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-600">
                            <li>Cung cấp đường dẫn lỗi.</li>
                            <li>Ghi rõ thiết bị và trình duyệt.</li>
                            <li>Đính kèm ảnh chụp nếu có.</li>
                        </ul>
                    </InfoCard>
                    <InfoCard>
                        <p className="text-sm text-slate-500">Mã yêu cầu mock</p>
                        <p className="mt-2 font-mono text-xl text-blue-700">ER-2026-0815</p>
                        <p className="mt-2 text-sm text-slate-500">Phản hồi trong 1–2 ngày làm việc.</p>
                    </InfoCard>
                </div>
            </div>
        </InfoPageShell>
    );
}
