'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaSearch } from 'react-icons/fa';

import { propertyTypeOptions } from '@/common/helpers/helper';
import { emptyPropertySearchValues, PropertySearchValues } from '@/types/property-search';
import AdministrativeAddressFields from '@/shared/components/property-location/administrative-address-fields';
import Button from '@/shared/components/buttons/button';
import Dropdown from '@/shared/components/dropdown/dropdown';
import TextField from '@/shared/components/text-field/text-field';

interface PropertySearchFormProps {
    initialValues?: PropertySearchValues;
}

export default function PropertySearchForm({ initialValues = emptyPropertySearchValues }: PropertySearchFormProps) {
    const router = useRouter();
    const [values, setValues] = useState<PropertySearchValues>(initialValues);

    const updateValue = (field: keyof PropertySearchValues, value: string) => {
        setValues((current) => ({ ...current, [field]: value }));
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const params = new URLSearchParams();
        Object.entries(values).forEach(([key, value]) => {
            const normalizedValue = value.trim();
            if (normalizedValue) params.set(key, normalizedValue);
        });

        const query = params.toString();
        router.push(query ? `/properties?${query}` : '/properties');
    };

    return (
        <form onSubmit={handleSubmit} className="rounded-[28px] border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
            <div className="grid gap-4 lg:grid-cols-[220px_minmax(0,1fr)]">
                <Dropdown
                    placeholder="Tất cả loại chỗ ở"
                    options={[{ label: 'Tất cả loại chỗ ở', value: '' }, ...propertyTypeOptions]}
                    value={values.type}
                    onChange={(value) => updateValue('type', value)}
                />

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                    <TextField
                        type="text"
                        placeholder="Tìm kiếm theo tiêu đề chỗ ở..."
                        containerClassName="w-full"
                        leftIcon={<FaSearch />}
                        value={values.keyword}
                        onChange={(event) => updateValue('keyword', event.target.value)}
                    />
                    <Button type="submit" variant="blue" className="w-full shrink-0 sm:w-auto">
                        Tìm kiếm
                    </Button>
                </div>
            </div>

            <div className="mt-4 space-y-3">
                <div className="rounded-2xl border border-slate-200 bg-white p-4">
                    <h3 className="text-sm font-semibold text-slate-800">Địa chỉ</h3>
                    <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                        <AdministrativeAddressFields
                            province={values.province}
                            district={values.district}
                            ward={values.ward}
                            address={values.address}
                            onChange={updateValue}
                        />
                    </div>
                </div>

                <div className="grid gap-3 lg:grid-cols-[2fr_1fr]">
                    <div className="rounded-2xl border border-slate-200 bg-white p-4">
                        <h3 className="text-sm font-semibold text-slate-800">Giá</h3>
                        <div className="mt-4 grid gap-4 sm:grid-cols-2">
                            <TextField
                                label="Giá thấp nhất"
                                type="number"
                                min={0}
                                placeholder="0 VND"
                                value={values.minPrice}
                                onChange={(event) => updateValue('minPrice', event.target.value)}
                            />
                            <TextField
                                label="Giá cao nhất"
                                type="number"
                                min={0}
                                placeholder="50.000.000 VND"
                                value={values.maxPrice}
                                onChange={(event) => updateValue('maxPrice', event.target.value)}
                            />
                        </div>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white p-4">
                        <h3 className="text-sm font-semibold text-slate-800">Chi tiết</h3>
                        <div className="mt-4">
                            <TextField
                                label="Diện tích tối thiểu"
                                type="number"
                                min={0}
                                placeholder="Diện tích m²"
                                value={values.minArea}
                                onChange={(event) => updateValue('minArea', event.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}
