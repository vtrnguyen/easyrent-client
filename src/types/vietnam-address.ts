export interface VietnamWard {
    code: number;
    name: string;
    district_code: number;
}

export interface VietnamDistrict {
    code: number;
    name: string;
    province_code: number;
    wards: VietnamWard[] | null;
}

export interface VietnamProvince {
    code: number;
    name: string;
    districts: VietnamDistrict[] | null;
}
