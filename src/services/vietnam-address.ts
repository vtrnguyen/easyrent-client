import { VietnamDistrict, VietnamProvince } from '@/types/vietnam-address';

const apiBaseUrl = process.env.NEXT_PUBLIC_VIETNAM_PROVINCES_API_URL ?? 'https://provinces.open-api.vn/api/v1';
let provincesPromise: Promise<VietnamProvince[]> | null = null;
const districtPromises = new Map<number, Promise<VietnamDistrict>>();

async function fetchJson<T>(url: string): Promise<T> {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Không thể tải dữ liệu địa giới hành chính.');
    return response.json() as Promise<T>;
}

export function getLegacyProvinces() {
    provincesPromise ??= fetchJson<VietnamProvince[]>(`${apiBaseUrl}/?depth=2`);
    return provincesPromise;
}

export function getLegacyDistrict(code: number) {
    const cached = districtPromises.get(code);
    if (cached) return cached;
    const request = fetchJson<VietnamDistrict>(`${apiBaseUrl}/d/${code}?depth=2`);
    districtPromises.set(code, request);
    return request;
}
