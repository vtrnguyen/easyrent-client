import InfoPageShell from '@/shared/components/info-page/info-page-shell';

export default function FaqPage() {
    const faqs = [
        [
            'Tôi tìm chỗ ở bằng cách nào?',
            'Chọn loại chỗ ở, khu vực, khoảng giá và diện tích tại trang chủ rồi nhấn Tìm kiếm.',
        ],
        [
            'Tại sao tôi không xem được bài đăng?',
            'Bài đăng có thể đang ở trạng thái nháp, bị ẩn, hết hạn hoặc chưa được xuất bản.',
        ],
        ['Tôi có thể lưu bài đăng không?', 'Có. Nhấn Yêu thích tại trang chi tiết bài đăng để lưu lại.'],
        ['Landlord cập nhật ảnh ở đâu?', 'Vào Quản lý chỗ ở, chọn bản ghi và cập nhật tại phần Hình ảnh/Video.'],
        ['Tôi quên mật khẩu thì làm gì?', 'Tính năng khôi phục đang phát triển; trong bản mock hãy liên hệ hỗ trợ.'],
    ];
    return (
        <InfoPageShell
            title="Câu hỏi thường gặp"
            description="Giải đáp nhanh các câu hỏi phổ biến khi sử dụng EasyRent."
        >
            <div className="space-y-3">
                {faqs.map(([question, answer], index) => (
                    <details
                        key={question}
                        open={index === 0}
                        className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                    >
                        <summary className="cursor-pointer list-none font-semibold">
                            {question}
                            <span className="float-right text-blue-600 group-open:rotate-45">+</span>
                        </summary>
                        <p className="mt-4 border-t pt-4 leading-7 text-slate-600">{answer}</p>
                    </details>
                ))}
            </div>
        </InfoPageShell>
    );
}
