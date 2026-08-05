'use client';

import { PropertyStatus, PropertyTypes } from '@/common/constants/appConstants';
import { formatDate, getPropertyStatusValue, getPropertyTypeValue } from '@/common/helpers/helper';
import Badge from '@/shared/components/badge/badge';
import { TableColumn } from '@/shared/components/table/table';
import { FilterConfig } from '@/types/filter';
import { Property } from '@/types/property';

const getStatusVariant = (status: string) => {
    const normalized = status.toLowerCase();

    if (normalized.includes('active') || normalized.includes('available') || normalized.includes('published')) {
        return 'success' as const;
    }

    if (normalized.includes('inactive') || normalized.includes('hidden') || normalized.includes('rented')) {
        return 'danger' as const;
    }

    return 'info' as const;
};

export const usePropertiesConstants = () => {
    const propertyFilters: FilterConfig[] = [
        {
            key: 'title',
            label: 'Tiêu đề',
            type: 'text',
            placeholder: 'Nhập tiêu đề',
        },
        {
            key: 'type',
            label: 'Loại chỗ ở',
            type: 'text',
            placeholder: 'Nhập loại chỗ ở',
        },
        {
            key: 'province',
            label: 'Tỉnh/thành',
            type: 'text',
            placeholder: 'Nhập tỉnh/thành',
        },
        {
            key: 'district',
            label: 'Quận/huyện',
            type: 'text',
            placeholder: 'Nhập quận/huyện',
        },
        {
            key: 'ward',
            label: 'Phường/xã',
            type: 'text',
            placeholder: 'Nhập phường/xã',
        },
        {
            key: 'status',
            label: 'Trạng thái',
            type: 'select',
            placeholder: 'Chọn trạng thái',
            options: [
                { label: getPropertyStatusValue(PropertyStatus.Available), value: PropertyStatus.Available },
                { label: getPropertyStatusValue(PropertyStatus.Reserved), value: PropertyStatus.Reserved },
                { label: getPropertyStatusValue(PropertyStatus.Rented), value: PropertyStatus.Rented },
                { label: getPropertyStatusValue(PropertyStatus.Hidden), value: PropertyStatus.Hidden },
                { label: getPropertyStatusValue(PropertyStatus.Maintenance), value: PropertyStatus.Maintenance },
            ],
        },
    ];

    const columns: TableColumn<Property>[] = [
        {
            fieldId: 'title',
            header: 'Chỗ ở',
            sortable: true,
            renderCell: (property) => (
                <div>
                    <div className="font-medium text-slate-900">{property.title}</div>
                    <div className="text-xs text-slate-500">{property.address}</div>
                </div>
            ),
        },
        {
            fieldId: 'type',
            header: 'Loại',
            sortable: true,
            renderCell: (property) => getPropertyTypeValue(property.type as PropertyTypes),
        },
        {
            fieldId: 'area',
            header: 'Diện tích',
            sortable: true,
            renderCell: (property) => `${property.area} m²`,
        },
        {
            fieldId: 'price',
            header: 'Giá thuê',
            sortable: true,
            renderCell: (property) =>
                new Intl.NumberFormat('vi-VN', {
                    style: 'currency',
                    currency: 'VND',
                    maximumFractionDigits: 0,
                }).format(property.price),
        },
        // {
        //     fieldId: 'utilities',
        //     header: 'Tiện ích',
        //     sortable: false,
        //     renderCell: (property) => (
        //         <div className="flex flex-wrap gap-1">
        //             {property.utilities.map((utility) => (
        //                 <Badge key={utility} variant="info">
        //                     {utility}
        //                 </Badge>
        //             ))}
        //         </div>
        //     ),
        // },
        {
            fieldId: 'status',
            header: 'Trạng thái',
            sortable: true,
            renderCell: (property) => (
                <Badge variant={getStatusVariant(property.status)}>{getPropertyStatusValue(property.status)}</Badge>
            ),
        },
        {
            fieldId: 'created_at',
            header: 'Ngày tạo',
            sortable: true,
            renderCell: (property) => formatDate(property.createdAt),
        },
    ];

    return {
        propertyFilters,
        columns,
    };
};
