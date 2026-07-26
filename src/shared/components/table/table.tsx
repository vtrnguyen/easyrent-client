'use client';

import { SortOrder } from '@/common/constants/appConstants';
import { ReactNode } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import Checkbox from '../checkbox/checkbox';

export interface TableSort {
    fieldId: string;
    direction: SortOrder;
}

export interface TableColumn<T> {
    fieldId: string;
    header: ReactNode;
    sortable?: boolean;
    renderHeader?: () => ReactNode;
    renderCell: (record: T, index: number) => ReactNode;
}

interface TableProps<T> {
    columns: TableColumn<T>[];
    data: T[];
    selectable?: boolean;
    selectedIds?: string[];
    getRowId: (record: T) => string;
    onSelectionChange?: (ids: string[]) => void;
    sortField?: string;
    sortDirection?: SortOrder;
    onSort?: (fieldId: string, direction?: SortOrder) => void;
    defaultSort?: TableSort;
    loading?: boolean;
}

export default function Table<T>({
    columns,
    data,
    selectable = false,
    selectedIds = [],
    getRowId,
    onSelectionChange,
    sortField,
    sortDirection,
    onSort,
    defaultSort,
}: TableProps<T>) {
    const allSelected = data.length > 0 && data.every((item) => selectedIds.includes(getRowId(item)));

    const toggleSelectAll = () => {
        if (!onSelectionChange) {
            return;
        }

        if (allSelected) {
            onSelectionChange([]);

            return;
        }

        onSelectionChange(data.map(getRowId));
    };

    const toggleSelectRow = (id: string) => {
        if (!onSelectionChange) {
            return;
        }

        if (selectedIds.includes(id)) {
            onSelectionChange(selectedIds.filter((item) => item !== id));
        } else {
            onSelectionChange([...selectedIds, id]);
        }
    };

    const handleSort = (fieldId: string, direction: SortOrder) => {
        if (!onSort) {
            return;
        }

        const isCurrentSort = sortField === fieldId && sortDirection === direction;

        if (isCurrentSort) {
            if (defaultSort && defaultSort.fieldId === fieldId && defaultSort.direction === direction) {
                onSort(defaultSort.fieldId, defaultSort.direction);

                return;
            }

            onSort('', undefined);

            return;
        }

        onSort(fieldId, direction);
    };

    return (
        <div className="overflow-hidden rounded-sm border border-slate-200 bg-white">
            <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead className="bg-sky-100">
                        <tr>
                            {selectable && (
                                <th className="w-24 border-r border-b border-slate-300 px-4 py-3">
                                    <Checkbox
                                        checkBoxSize="sm"
                                        title="Tất cả"
                                        checked={allSelected}
                                        onChange={toggleSelectAll}
                                    />
                                </th>
                            )}

                            {columns.map((column) => (
                                <th
                                    key={column.fieldId}
                                    className="border-r border-b border-slate-300 px-4 py-3 text-left"
                                >
                                    <div className="flex items-center justify-center gap-3">
                                        {column.renderHeader ? column.renderHeader() : column.header}
                                        {column.sortable && (
                                            <div className="flex flex-col gap-0.5">
                                                <button
                                                    type="button"
                                                    className={`flex h-4 w-4 cursor-pointer items-center justify-center rounded-sm border transition ${
                                                        sortField === column.fieldId &&
                                                        sortDirection === SortOrder.Ascending
                                                            ? 'bg-blue-600 text-white'
                                                            : 'bg-white text-slate-400 hover:bg-slate-100'
                                                    } `}
                                                    onClick={() => handleSort(column.fieldId, SortOrder.Ascending)}
                                                >
                                                    <FiChevronUp size={12} />
                                                </button>

                                                <button
                                                    type="button"
                                                    className={`flex h-4 w-4 cursor-pointer items-center justify-center rounded-sm border transition ${
                                                        sortField === column.fieldId &&
                                                        sortDirection === SortOrder.Descending
                                                            ? 'bg-blue-600 text-white'
                                                            : 'bg-white text-slate-400 hover:bg-slate-100'
                                                    } `}
                                                    onClick={() => handleSort(column.fieldId, SortOrder.Descending)}
                                                >
                                                    <FiChevronDown size={12} />
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody>
                        {data.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={columns.length + (selectable ? 1 : 0)}
                                    className="px-4 py-4 text-center text-sm text-slate-500"
                                >
                                    Không có dữ liệu
                                </td>
                            </tr>
                        ) : (
                            data.map((record, index) => {
                                const id = getRowId(record);
                                const selected = selectedIds.includes(id);

                                return (
                                    <tr
                                        key={id}
                                        className={`transition hover:bg-slate-50 ${
                                            index !== data.length - 1 ? 'border-b border-slate-300' : ''
                                        } ${selected ? 'bg-slate-100' : ''}`}
                                    >
                                        {selectable && (
                                            <td className="border-r border-slate-200 px-4 py-3 text-center">
                                                <div className="flex justify-center">
                                                    <Checkbox checked={selected} onChange={() => toggleSelectRow(id)} />
                                                </div>
                                            </td>
                                        )}

                                        {columns.map((column) => (
                                            <td
                                                key={column.fieldId}
                                                className="border-r border-slate-200 px-4 py-3 text-sm text-slate-700"
                                            >
                                                {column.renderCell(record, index)}
                                            </td>
                                        ))}
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
