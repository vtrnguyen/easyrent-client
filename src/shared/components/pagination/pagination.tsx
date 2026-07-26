import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

import TextField from '../text-field/text-field';
import Button from '../buttons/button';

interface PaginationProps {
    totalRecords: number;
    pageSize: number;
    currentPage: number;
    onPageChange: (page: number) => void;
    loading?: boolean;
}

export default function Pagination({
    totalRecords,
    pageSize,
    currentPage,
    onPageChange,
    loading = false,
}: PaginationProps) {
    const totalPages = Math.max(1, Math.ceil(totalRecords / pageSize));
    const startRecord = totalRecords === 0 ? 0 : (currentPage - 1) * pageSize + 1;
    const endRecord = Math.min(currentPage * pageSize, totalRecords);

    const handlePageInput = (value: string) => {
        const page = Number(value);

        if (!page || page < 1) {
            return;
        }

        if (page > totalPages) {
            onPageChange(totalPages);
            return;
        }

        onPageChange(page);
    };

    return (
        <div className="flex flex-col gap-4 bg-white px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-sm text-slate-600">
                Hiển thị {'('}
                <span className="text-slate-900">{startRecord}</span>
                {' ~ '}
                <span className="text-slate-900">{endRecord}</span>
                {')'}
                {' / '}
                <span className="text-slate-900">{totalRecords}</span>
                {' bản ghi'}
            </div>

            <div className="flex items-center gap-3">
                <Button
                    variant="secondary"
                    size="sm"
                    icon={<FiChevronLeft />}
                    disabled={currentPage === 1 || loading}
                    onClick={() => onPageChange(currentPage - 1)}
                />

                <div className="flex items-center gap-2">
                    <TextField
                        value={currentPage}
                        containerClassName="w-16"
                        inputClassName="text-center"
                        min={1}
                        max={totalPages}
                        disabled={loading}
                        onChange={(e) => handlePageInput(e.target.value)}
                    />

                    <span className="text-sm whitespace-nowrap text-slate-600">/ {totalPages}</span>
                </div>

                <Button
                    variant="secondary"
                    size="sm"
                    icon={<FiChevronRight />}
                    disabled={currentPage === totalPages || loading}
                    onClick={() => onPageChange(currentPage + 1)}
                />
            </div>
        </div>
    );
}
