'use client';

import { FormEvent, useState } from 'react';
import toast from 'react-hot-toast';

import { rentalRequestApi } from '@/api/rental-request.api';
import Button from '@/shared/components/buttons/button';
import Dialog from '@/shared/components/dialog/dialog';
import TextArea from '@/shared/components/textarea/textarea';

interface Props {
    open: boolean;
    propertyId: string;
    propertyTitle: string;
    onClose: () => void;
}

export default function RentalRequestDialog({ open, propertyId, propertyTitle, onClose }: Props) {
    const [message, setMessage] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const close = () => {
        setMessage('');
        onClose();
    };

    const submit = async (event: FormEvent) => {
        event.preventDefault();
        const value = message.trim();
        if (!value) return;
        setSubmitting(true);
        try {
            await rentalRequestApi.create(propertyId, value);
            toast.success('Đã gửi yêu cầu thuê. Vui lòng chờ chủ nhà xác nhận.');
            close();
        } catch (error) {
            toast.error((error as Error).message);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Dialog open={open} onClose={close} closeOnOverlayClick>
            <form onSubmit={submit} className="space-y-5 p-6">
                <div>
                    <h2 className="text-xl font-semibold text-slate-900">Gửi yêu cầu thuê</h2>
                    <p className="mt-1 text-sm text-slate-500">{propertyTitle}</p>
                </div>
                <TextArea
                    label="Lời nhắn cho chủ nhà"
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    placeholder="Giới thiệu ngắn về nhu cầu và thời gian bạn muốn thuê..."
                    maxLength={2000}
                    required
                />
                <p className="text-xs text-slate-500">Yêu cầu sẽ ở trạng thái Đang chờ cho đến khi chủ nhà phản hồi.</p>
                <div className="flex justify-end gap-3">
                    <Button variant="secondary" onClick={close} disabled={submitting}>Hủy</Button>
                    <Button variant="blue" type="submit" disabled={submitting || !message.trim()}>
                        {submitting ? 'Đang gửi...' : 'Gửi yêu cầu'}
                    </Button>
                </div>
            </form>
        </Dialog>
    );
}
