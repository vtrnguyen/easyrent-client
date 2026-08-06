'use client';

import { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { getLegacyDistrict, getLegacyProvinces } from '@/services/vietnam-address';
import { VietnamProvince, VietnamWard } from '@/types/vietnam-address';
import Dropdown from '@/shared/components/dropdown/dropdown';
import TextField from '@/shared/components/text-field/text-field';

interface Props {
    province: string;
    district: string;
    ward: string;
    address: string;
    errors?: Partial<Record<'province' | 'district' | 'ward' | 'address', string>>;
    onChange: (field: 'province' | 'district' | 'ward' | 'address', value: string) => void;
}

export default function AdministrativeAddressFields({ province, district, ward, address, errors, onChange }: Props) {
    const [provinces, setProvinces] = useState<VietnamProvince[]>([]);
    const [wards, setWards] = useState<VietnamWard[]>([]);
    const [wardDistrictCode, setWardDistrictCode] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let active = true;
        getLegacyProvinces()
            .then((items) => {
                if (active) setProvinces(items);
            })
            .catch((error: Error) => toast.error(error.message))
            .finally(() => {
                if (active) setLoading(false);
            });
        return () => {
            active = false;
        };
    }, []);
    const districts = useMemo(
        () => provinces.find((item) => item.name === province)?.districts ?? [],
        [province, provinces],
    );
    const selectedDistrict = useMemo(() => districts.find((item) => item.name === district), [district, districts]);
    useEffect(() => {
        if (!selectedDistrict) return;
        let active = true;
        getLegacyDistrict(selectedDistrict.code)
            .then((item) => {
                if (active) {
                    setWards(item.wards ?? []);
                    setWardDistrictCode(item.code);
                }
            })
            .catch((error: Error) => toast.error(error.message));
        return () => {
            active = false;
        };
    }, [selectedDistrict]);

    const provinceOptions = useMemo(
        () => provinces.map((item) => ({ label: item.name, value: item.name })),
        [provinces],
    );
    const districtOptions = useMemo(
        () => districts.map((item) => ({ label: item.name, value: item.name })),
        [districts],
    );
    const wardOptions = useMemo(
        () =>
            selectedDistrict?.code === wardDistrictCode
                ? wards.map((item) => ({ label: item.name, value: item.name }))
                : [],
        [selectedDistrict, wardDistrictCode, wards],
    );

    return (
        <>
            <Dropdown
                label="Tỉnh/thành"
                placeholder={loading ? 'Đang tải...' : 'Chọn tỉnh/thành'}
                disabled={loading}
                options={provinceOptions}
                value={province}
                error={errors?.province}
                onChange={(value) => {
                    onChange('province', value);
                    onChange('district', '');
                    onChange('ward', '');
                }}
            />
            <Dropdown
                label="Quận/huyện"
                placeholder="Chọn quận/huyện"
                disabled={!province}
                options={districtOptions}
                value={district}
                error={errors?.district}
                onChange={(value) => {
                    onChange('district', value);
                    onChange('ward', '');
                }}
            />
            <Dropdown
                label="Phường/xã"
                placeholder="Chọn phường/xã"
                disabled={!district}
                options={wardOptions}
                value={ward}
                error={errors?.ward}
                onChange={(value) => onChange('ward', value)}
            />
            <TextField
                label="Địa chỉ chi tiết"
                value={address}
                error={errors?.address}
                onChange={(event) => onChange('address', event.target.value)}
            />
        </>
    );
}
