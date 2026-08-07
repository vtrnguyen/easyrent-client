export interface PropertySearchValues {
    keyword: string;
    type: string;
    province: string;
    district: string;
    ward: string;
    address: string;
    minPrice: string;
    maxPrice: string;
    minArea: string;
}

export const emptyPropertySearchValues: PropertySearchValues = {
    keyword: '',
    type: '',
    province: '',
    district: '',
    ward: '',
    address: '',
    minPrice: '',
    maxPrice: '',
    minArea: '',
};
