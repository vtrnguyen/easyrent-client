'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import {
    FiAlertTriangle,
    FiCheckCircle,
    FiClock,
    FiDatabase,
    FiDownload,
    FiHardDrive,
    FiRefreshCw,
    FiShield,
    FiUploadCloud,
} from 'react-icons/fi';
import Badge from '@/shared/components/badge/badge';
import Button from '@/shared/components/buttons/button';
import Confirmation from '@/shared/components/confirmation/confirmation';
import TextField from '@/shared/components/text-field/text-field';

const backups = [
    {
        id: 'BKP-20260807-0200',
        createdAt: '07/08/2026 · 02:00',
        type: 'Tự động',
        size: '186,4 MB',
        duration: '1 phút 42 giây',
        status: 'Thành công',
    },
    {
        id: 'BKP-20260806-1535',
        createdAt: '06/08/2026 · 15:35',
        type: 'Thủ công',
        size: '184,9 MB',
        duration: '1 phút 38 giây',
        status: 'Thành công',
    },
    {
        id: 'BKP-20260806-0200',
        createdAt: '06/08/2026 · 02:00',
        type: 'Tự động',
        size: '183,7 MB',
        duration: '1 phút 40 giây',
        status: 'Thành công',
    },
    {
        id: 'BKP-20260805-0200',
        createdAt: '05/08/2026 · 02:00',
        type: 'Tự động',
        size: '181,2 MB',
        duration: '32 giây',
        status: 'Thất bại',
    },
    {
        id: 'BKP-20260804-0200',
        createdAt: '04/08/2026 · 02:00',
        type: 'Tự động',
        size: '180,8 MB',
        duration: '1 phút 36 giây',
        status: 'Thành công',
    },
];

export default function BackupAndRestorePage() {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [restoreConfirmationOpen, setRestoreConfirmationOpen] = useState(false);
    const [backupConfirmationOpen, setBackupConfirmationOpen] = useState(false);

    const createBackup = () => {
        setBackupConfirmationOpen(false);
        toast.success('Đã mô phỏng tạo bản sao lưu thủ công.');
    };

    const restoreBackup = () => {
        setRestoreConfirmationOpen(false);
        setSelectedFile(null);
        toast.success('Đã mô phỏng yêu cầu phục hồi dữ liệu.');
    };

    return (
        <section className="space-y-6">
            <div className="flex min-h-10 flex-wrap items-start justify-between gap-3">
                <div>
                    <h1 className="text-2xl font-semibold text-slate-900">Sao lưu & Phục hồi</h1>
                    <p className="mt-1 text-sm text-slate-500">Quản lý bản sao lưu và khôi phục dữ liệu hệ thống.</p>
                </div>
                <div className="flex items-center gap-2">
                    <Badge variant="info">Dữ liệu minh họa</Badge>
                    <Button variant="blue" icon={<FiDatabase />} onClick={() => setBackupConfirmationOpen(true)}>
                        Tạo bản sao lưu
                    </Button>
                </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <SummaryCard
                    icon={FiCheckCircle}
                    label="Sao lưu gần nhất"
                    value="Hôm nay, 02:00"
                    note="Hoàn tất thành công"
                    tone="green"
                />
                <SummaryCard
                    icon={FiHardDrive}
                    label="Tổng dung lượng"
                    value="1,82 GB"
                    note="10 bản sao đang lưu"
                    tone="blue"
                />
                <SummaryCard
                    icon={FiClock}
                    label="Lịch tự động"
                    value="02:00 mỗi ngày"
                    note="Lần tiếp theo: 08/08/2026"
                    tone="slate"
                />
                <SummaryCard
                    icon={FiShield}
                    label="Thời gian lưu giữ"
                    value="30 ngày"
                    note="Tự động xóa bản quá hạn"
                    tone="amber"
                />
            </div>

            <div className="grid gap-6 xl:grid-cols-[1.35fr_1fr]">
                <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                    <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
                        <div>
                            <h2 className="font-semibold text-slate-900">Lịch sử sao lưu</h2>
                            <p className="mt-1 text-sm text-slate-500">
                                Các bản sao gần đây của cơ sở dữ liệu EasyRent.
                            </p>
                        </div>
                        <Button
                            variant="secondary"
                            size="sm"
                            icon={<FiRefreshCw />}
                            onClick={() => toast.success('Danh sách đã được làm mới.')}
                        >
                            Làm mới
                        </Button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-slate-50 text-xs tracking-wide text-slate-500 uppercase">
                                <tr>
                                    <th className="px-5 py-3">Mã bản sao</th>
                                    <th className="px-5 py-3">Thời gian</th>
                                    <th className="px-5 py-3">Loại</th>
                                    <th className="px-5 py-3">Dung lượng</th>
                                    <th className="px-5 py-3">Trạng thái</th>
                                    <th className="px-5 py-3 text-right">Thao tác</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {backups.map((backup) => (
                                    <tr key={backup.id} className="hover:bg-slate-50">
                                        <td className="px-5 py-4 font-mono text-xs font-medium text-slate-800">
                                            {backup.id}
                                        </td>
                                        <td className="px-5 py-4">
                                            <p className="text-slate-700">{backup.createdAt}</p>
                                            <p className="mt-1 text-xs text-slate-400">{backup.duration}</p>
                                        </td>
                                        <td className="px-5 py-4 text-slate-600">{backup.type}</td>
                                        <td className="px-5 py-4 text-slate-600">{backup.size}</td>
                                        <td className="px-5 py-4">
                                            <Badge variant={backup.status === 'Thành công' ? 'success' : 'danger'}>
                                                {backup.status}
                                            </Badge>
                                        </td>
                                        <td className="px-5 py-4 text-right">
                                            <button
                                                type="button"
                                                disabled={backup.status !== 'Thành công'}
                                                onClick={() => toast.success(`Đã mô phỏng tải xuống ${backup.id}.`)}
                                                className="inline-flex h-8 items-center gap-1.5 rounded-md px-2.5 text-xs font-medium text-blue-600 hover:bg-blue-50 disabled:cursor-not-allowed disabled:text-slate-300 disabled:hover:bg-transparent"
                                            >
                                                <FiDownload />
                                                Tải xuống
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-700">
                                <FiUploadCloud className="h-5 w-5" />
                            </div>
                            <div>
                                <h2 className="font-semibold text-slate-900">Phục hồi từ tệp</h2>
                                <p className="mt-0.5 text-xs text-slate-500">
                                    Chấp nhận tệp sao lưu định dạng .sql hoặc .zip
                                </p>
                            </div>
                        </div>
                        <div className="mt-5">
                            <TextField
                                type="file"
                                accept=".sql,.zip"
                                label="Chọn tệp sao lưu"
                                onChange={(event) => setSelectedFile(event.target.files?.[0] ?? null)}
                            />
                        </div>
                        {selectedFile && (
                            <div className="mt-4 rounded-lg border border-slate-200 bg-slate-50 p-3">
                                <p className="truncate text-sm font-medium text-slate-800">{selectedFile.name}</p>
                                <p className="mt-1 text-xs text-slate-500">
                                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                                </p>
                            </div>
                        )}
                        <Button
                            fullWidth
                            variant="primary"
                            className="mt-4"
                            icon={<FiRefreshCw />}
                            disabled={!selectedFile}
                            onClick={() => setRestoreConfirmationOpen(true)}
                        >
                            Kiểm tra và phục hồi
                        </Button>
                    </div>
                    <div className="rounded-xl border border-amber-200 bg-amber-50 p-5">
                        <div className="flex items-start gap-3">
                            <FiAlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-700" />
                            <div>
                                <h3 className="text-sm font-semibold text-amber-900">Lưu ý trước khi phục hồi</h3>
                                <ul className="mt-2 list-disc space-y-1.5 pl-4 text-xs leading-5 text-amber-800">
                                    <li>Dữ liệu hiện tại sẽ được thay thế bởi bản sao đã chọn.</li>
                                    <li>Nên tạo một bản sao lưu mới trước khi phục hồi.</li>
                                    <li>Không đóng trình duyệt trong quá trình thực hiện.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Confirmation
                open={backupConfirmationOpen}
                title="Tạo bản sao lưu"
                message="Tạo một bản sao dữ liệu hệ thống tại thời điểm hiện tại?"
                confirmText="Tạo bản sao"
                onCancel={() => setBackupConfirmationOpen(false)}
                onConfirm={createBackup}
            />
            <Confirmation
                open={restoreConfirmationOpen}
                title="Xác nhận phục hồi"
                message={`Phục hồi dữ liệu từ tệp ${selectedFile?.name ?? ''}? Dữ liệu hiện tại có thể bị thay thế.`}
                confirmText="Phục hồi"
                onCancel={() => setRestoreConfirmationOpen(false)}
                onConfirm={restoreBackup}
            />
        </section>
    );
}

function SummaryCard({
    icon: Icon,
    label,
    value,
    note,
    tone,
}: {
    icon: typeof FiDatabase;
    label: string;
    value: string;
    note: string;
    tone: 'green' | 'blue' | 'slate' | 'amber';
}) {
    const tones = {
        green: 'bg-emerald-50 text-emerald-700',
        blue: 'bg-blue-50 text-blue-700',
        slate: 'bg-slate-100 text-slate-700',
        amber: 'bg-amber-50 text-amber-700',
    };
    return (
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${tones[tone]}`}>
                <Icon className="h-5 w-5" />
            </div>
            <p className="mt-4 text-sm text-slate-500">{label}</p>
            <p className="mt-1 text-xl font-semibold text-slate-900">{value}</p>
            <p className="mt-2 text-xs text-slate-500">{note}</p>
        </div>
    );
}
