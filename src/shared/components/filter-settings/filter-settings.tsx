'use client';

import { useState } from 'react';
import Dialog from '../dialog/dialog';
import TextField from '../text-field/text-field';
import Select from '../select/select';
import DateRangeField from '../date-range-field/date-range-field';
import Button from '../buttons/button';
import { FilterCondition, FilterConfig } from '@/types/filter';
import TextArea from '../textarea/textarea';

interface FilterSettingsProps {
    open: boolean;
    onClose: () => void;
    filters: FilterConfig[];
    onSearch: (conditions: FilterCondition[]) => void;
}

export default function FilterSettings({
    open,

    onClose,

    filters,

    onSearch,
}: FilterSettingsProps) {
    const [values, setValues] = useState<Record<string, any>>({});

    const updateValue = (key: string, value: any) => {
        setValues((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const handleSearch = () => {
        const conditions = Object.entries(values)
            .filter(([_, value]) => value !== '' && value !== undefined)
            .map(([key, value]) => ({
                key,
                value,
            }));

        onSearch(conditions);

        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} width="max-w-2xl">
            <div className="space-y-6 p-6">
                <h2 className="text-lg font-semibold">Bộ lọc tìm kiếm</h2>

                <div className="space-y-4">
                    {filters.map((filter) => {
                        switch (filter.type) {
                            case 'text':
                                return (
                                    <TextField
                                        key={filter.key}
                                        label={filter.label}
                                        placeholder={filter.placeholder}
                                        value={values[filter.key] ?? ''}
                                        onChange={(e) => updateValue(filter.key, e.target.value)}
                                    />
                                );

                            case 'textarea':
                                return (
                                    <TextArea
                                        key={filter.key}
                                        label={filter.label}
                                        value={values[filter.key] ?? ''}
                                        onChange={(e) => updateValue(filter.key, e.target.value)}
                                    />
                                );

                            case 'select':
                                return (
                                    <Select
                                        key={filter.key}
                                        label={filter.label}
                                        options={filter.options ?? []}
                                        value={values[filter.key] ?? ''}
                                        onChange={(e) => updateValue(filter.key, e.target.value)}
                                    />
                                );

                            case 'date':
                                return (
                                    <DateRangeField
                                        key={filter.key}
                                        startValue={values[`${filter.key}_from`]}
                                        endValue={values[`${filter.key}_to`]}
                                        onStartChange={(value) => updateValue(`${filter.key}_from`, value)}
                                        onEndChange={(value) => updateValue(`${filter.key}_to`, value)}
                                    />
                                );
                        }
                    })}
                </div>

                <div className="flex justify-center gap-3">
                    <Button variant="secondary" onClick={onClose}>
                        Hủy
                    </Button>

                    <Button variant="blue" onClick={handleSearch}>
                        Tìm kiếm
                    </Button>
                </div>
            </div>
        </Dialog>
    );
}
