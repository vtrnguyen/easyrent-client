'use client';

import { useState } from 'react';

import Dialog from '../dialog/dialog';
import TextField from '../text-field/text-field';
import DateRangeField from '../date-range-field/date-range-field';
import Button from '../buttons/button';
import TextArea from '../textarea/textarea';

import { DateRangeValue, FilterCondition, FilterConfig, FilterValue } from '@/types/filter';
import { MdClear } from 'react-icons/md';
import { FaMinus, FaPlus } from 'react-icons/fa';
import Dropdown from '../dropdown/dropdown';
import { FilterLogics } from '@/types/search';

interface FilterSettingsProps {
    open: boolean;
    onClose: () => void;
    filters: FilterConfig[];
    value?: FilterCondition[];
    filterLogic?: FilterLogics;
    onSearch: (conditions: FilterCondition[], filterLogic: FilterLogics) => void;
}

interface ActiveFilter {
    id: string;
    filterKey: string;
    value: FilterValue;
}

export default function FilterSettings({
    open,
    onClose,
    filters,
    value = [],
    filterLogic: initialFilterLogic = FilterLogics.And,
    onSearch,
}: FilterSettingsProps) {
    const buildActiveFilters = (conditions: FilterCondition[]) =>
        conditions.map((item) => ({
            id: crypto.randomUUID(),
            filterKey: item.key,
            value: item.value,
        }));

    const getInitialFilterValue = (filter: FilterConfig): FilterValue => {
        switch (filter.type) {
            case 'select':
                return filter.options?.[0]?.value ?? '';

            case 'date':
                return {};

            default:
                return '';
        }
    };

    const [activeFilters, setActiveFilters] = useState<ActiveFilter[]>(() => buildActiveFilters(value));
    const [pendingFilter, setPendingFilter] = useState<ActiveFilter | null>(null);
    const [filterLogic, setFilterLogic] = useState<FilterLogics>(initialFilterLogic);

    const handleClear = () => {
        setActiveFilters([]);
        setPendingFilter(null);
        setFilterLogic(FilterLogics.And);
    };

    const handleSelectField = (fieldKey: string) => {
        if (!fieldKey) {
            return;
        }

        const filter = filters.find((item) => item.key === fieldKey);

        setPendingFilter({
            id: crypto.randomUUID(),
            filterKey: fieldKey,
            value: filter ? getInitialFilterValue(filter) : '',
        });
    };

    const handleAddFilter = () => {
        if (!pendingFilter) {
            return;
        }

        setActiveFilters((prev) => [...prev, pendingFilter]);
        setPendingFilter(null);
    };

    const updatePendingValue = (value: FilterValue) => {
        setPendingFilter((prev) =>
            prev
                ? {
                      ...prev,
                      value,
                  }
                : null,
        );
    };

    const updateActiveValue = (id: string, value: FilterValue) => {
        setActiveFilters((prev) =>
            prev.map((item) =>
                item.id === id
                    ? {
                          ...item,
                          value,
                      }
                    : item,
            ),
        );
    };

    const removeFilter = (id: string) => {
        setActiveFilters((prev) => prev.filter((item) => item.id !== id));
    };

    const renderFilterInput = (filter: FilterConfig, item: ActiveFilter, onChange: (value: FilterValue) => void) => {
        switch (filter.type) {
            case 'text':
                return (
                    <TextField
                        label={filter.label}
                        placeholder={filter.placeholder}
                        value={typeof item.value === 'string' ? item.value : ''}
                        onChange={(e) => onChange(e.target.value)}
                    />
                );

            case 'textarea':
                return (
                    <TextArea
                        label={filter.label}
                        value={typeof item.value === 'string' ? item.value : ''}
                        onChange={(e) => onChange(e.target.value)}
                    />
                );

            case 'select':
                return (
                    <Dropdown
                        label={filter.label}
                        options={filter.options ?? []}
                        value={typeof item.value === 'string' ? item.value : ''}
                        onChange={(value) => onChange(value)}
                    />
                );

            case 'date': {
                const dateValue: DateRangeValue =
                    typeof item.value === 'object' && item.value !== null ? item.value : {};

                return (
                    <DateRangeField
                        startValue={dateValue.from}
                        endValue={dateValue.to}
                        onStartChange={(value) =>
                            onChange({
                                ...dateValue,
                                from: value,
                            })
                        }
                        onEndChange={(value) =>
                            onChange({
                                ...dateValue,
                                to: value,
                            })
                        }
                    />
                );
            }

            default:
                return null;
        }
    };

    const handleSearch = () => {
        const filtersToSearch = [...activeFilters, ...(pendingFilter ? [pendingFilter] : [])];

        const conditions = filtersToSearch
            .filter((item) => {
                if (item.value == null) {
                    return false;
                }

                if (typeof item.value === 'string') {
                    return item.value !== '';
                }

                if (typeof item.value === 'object') {
                    return Object.values(item.value).some((value) => value != null && value !== '');
                }

                return true;
            })
            .map((item) => ({
                key: item.filterKey,
                value: item.value,
            }));

        onSearch(conditions, filterLogic);
        onClose();
    };
    const pendingConfig = filters.find((filter) => filter.key === pendingFilter?.filterKey);

    return (
        <Dialog open={open} onClose={onClose} width="max-w-4xl" contentClassName="flex h-[600px] max-h-[80vh] flex-col">
            <div className="flex h-full flex-col">
                <div className="flex items-center justify-between border-b border-slate-200 p-6">
                    <h2 className="text-lg font-semibold">Bộ lọc tìm kiếm</h2>

                    <Button icon={<MdClear />} variant="secondary" onClick={handleClear}>
                        Xóa điều kiện
                    </Button>
                </div>

                <div className="flex-1 overflow-y-auto p-6">
                    <div className="mb-6 flex items-center gap-6">
                        <span className="text-sm font-medium text-slate-700">Điều kiện:</span>

                        <label className="flex cursor-pointer items-center gap-2">
                            <input
                                type="radio"
                                name="filter-logic"
                                value={FilterLogics.And}
                                checked={filterLogic === FilterLogics.And}
                                onChange={() => setFilterLogic(FilterLogics.And)}
                                className="h-4 w-4"
                            />

                            <span className="text-sm text-slate-700">AND</span>
                        </label>

                        <label className="flex cursor-pointer items-center gap-2">
                            <input
                                type="radio"
                                name="filter-logic"
                                value={FilterLogics.Or}
                                checked={filterLogic === FilterLogics.Or}
                                onChange={() => setFilterLogic(FilterLogics.Or)}
                                className="h-4 w-4"
                            />

                            <span className="text-sm text-slate-700">OR</span>
                        </label>
                    </div>

                    <div className="space-y-4">
                        {activeFilters.map((item) => {
                            const filter = filters.find((x) => x.key === item.filterKey);

                            if (!filter) {
                                return null;
                            }

                            return (
                                <div key={item.id} className="flex items-end gap-3">
                                    <div className="flex-1">
                                        {renderFilterInput(filter, item, (value) => updateActiveValue(item.id, value))}
                                    </div>

                                    <Button
                                        icon={<FaMinus />}
                                        size="sm"
                                        variant="secondary"
                                        onClick={() => removeFilter(item.id)}
                                    />
                                </div>
                            );
                        })}

                        <div className="flex items-end gap-3">
                            <div className="flex-1">
                                {!pendingFilter ? (
                                    <Dropdown
                                        placeholder="Chọn field"
                                        value=""
                                        options={filters.map((filter) => ({
                                            label: filter.label,
                                            value: filter.key,
                                        }))}
                                        onChange={(value) => handleSelectField(value)}
                                    />
                                ) : (
                                    pendingConfig && renderFilterInput(pendingConfig, pendingFilter, updatePendingValue)
                                )}
                            </div>

                            <Button
                                icon={<FaPlus />}
                                size="sm"
                                variant="blue"
                                disabled={!pendingFilter}
                                onClick={handleAddFilter}
                            />
                        </div>
                    </div>
                </div>

                <div className="flex justify-center gap-3 border-t border-slate-200 p-6">
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
