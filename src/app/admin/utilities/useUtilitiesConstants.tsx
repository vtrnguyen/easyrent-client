'use client';

import { TableColumn } from '@/shared/components/table/table';
import { Utility } from '@/types/utility';

export const useUtilitiesConstants = () => {
    const columns: TableColumn<Utility>[] = [
        {
            fieldId: 'display_name',
            header: 'Tên tiện ích',
            sortable: false,
            renderCell: (utility) => utility.displayName,
        },
    ];

    return {
        columns,
    };
};
