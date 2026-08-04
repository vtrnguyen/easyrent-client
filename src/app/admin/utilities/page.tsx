'use client';

import { useEffect, useState } from 'react';

import { FiPlus, FiTrash2 } from 'react-icons/fi';

import Button from '@/shared/components/buttons/button';
import Table from '@/shared/components/table/table';

import { useUtilitiesConstants } from './useUtilitiesConstants';
import useLoadingOverlay from '@/shared/hooks/useLoadingOverlay';
import { Utility } from '@/types/utility';
import { utilityApi } from '@/api/utility.api';

export default function AdminUtilitiesPage() {
    const loading = useLoadingOverlay();

    const { columns } = useUtilitiesConstants();

    const [utilities, setUtilities] = useState<Utility[]>([]);
    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    useEffect(() => {
        let cancelled = false;

        const loadUtilities = async () => {
            loading.open();

            try {
                const response = await utilityApi.getAll();

                if (!cancelled) {
                    setUtilities(response.data);
                }
            } finally {
                if (!cancelled) {
                    loading.close();
                }
            }
        };

        loadUtilities();

        return () => {
            cancelled = true;
        };
    }, [loading]);

    return (
        <section className="space-y-4">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold text-slate-900">Quản lý tiện ích</h1>
            </div>

            <div className="flex items-center gap-2">
                <Button icon={<FiPlus />} variant="blue" onClick={() => console.log('Create utility')}>
                    Tạo mới
                </Button>
                <Button
                    icon={<FiTrash2 />}
                    variant="primary"
                    disabled={selectedIds.length === 0}
                    onClick={() => console.log('Delete utility')}
                >
                    Xóa
                </Button>
            </div>

            <Table
                columns={columns}
                data={utilities}
                selectable
                getRowId={(utility) => utility.id}
                selectedIds={selectedIds}
                onSelectionChange={setSelectedIds}
            />
        </section>
    );
}
