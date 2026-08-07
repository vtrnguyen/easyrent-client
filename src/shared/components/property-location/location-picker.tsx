'use client';

import { KeyboardEvent, useEffect, useState } from 'react';
import { CircleMarker, MapContainer, TileLayer, useMap, useMapEvents } from 'react-leaflet';
import toast from 'react-hot-toast';
import Button from '@/shared/components/buttons/button';
import TextField from '@/shared/components/text-field/text-field';

interface SearchResult {
    place_id: number;
    display_name: string;
    lat: string;
    lon: string;
}
interface Props {
    latitude: number;
    longitude: number;
    latitudeError?: string;
    longitudeError?: string;
    addressHint?: string;
    onChange: (latitude: number, longitude: number) => void;
}
const defaultPosition: [number, number] = [16.047079, 108.20623];
const administrativePrefix = /^(thành phố|tỉnh|quận|huyện|thị xã|phường|xã|thị trấn)\s+/iu;

function normalizeLegacyAddress(value: string) {
    return value
        .split(',')
        .map((part) => part.trim().replace(administrativePrefix, ''))
        .filter(Boolean)
        .join(', ');
}

function MapController({ position, onChange }: { position: [number, number]; onChange: Props['onChange'] }) {
    const map = useMap();
    useEffect(() => {
        map.flyTo(position, map.getZoom());
    }, [map, position]);
    useMapEvents({ click: (event) => onChange(event.latlng.lat, event.latlng.lng) });
    return (
        <CircleMarker
            center={position}
            radius={8}
            pathOptions={{ color: '#2563eb', fillColor: '#2563eb', fillOpacity: 0.9 }}
        />
    );
}

export default function LocationPicker({
    latitude,
    longitude,
    latitudeError,
    longitudeError,
    addressHint,
    onChange,
}: Props) {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<SearchResult[]>([]);
    const [searching, setSearching] = useState(false);
    const position: [number, number] = latitude && longitude ? [latitude, longitude] : defaultPosition;
    const selectResult = (result: SearchResult) => {
        onChange(Number(result.lat), Number(result.lon));
        setQuery(result.display_name);
        setResults([]);
    };
    const search = async () => {
        const searchTerm = query.trim() || normalizeLegacyAddress(addressHint?.trim() || '');
        if (!searchTerm || searching) return;
        setSearching(true);
        try {
            const baseUrl = process.env.NEXT_PUBLIC_NOMINATIM_API_URL ?? 'https://nominatim.openstreetmap.org';
            const params = new URLSearchParams({ q: searchTerm, format: 'jsonv2', limit: '5', countrycodes: 'vn' });
            const response = await fetch(`${baseUrl}/search?${params}`);
            if (!response.ok) throw new Error();
            const searchResults = (await response.json()) as SearchResult[];
            if (searchResults.length === 0) {
                setResults([]);
                toast.error('Không tìm thấy vị trí phù hợp với địa chỉ đã chọn.');
                return;
            }
            setResults(searchResults);
            onChange(Number(searchResults[0].lat), Number(searchResults[0].lon));
        } catch {
            toast.error('Không thể tìm kiếm vị trí lúc này.');
        } finally {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            setSearching(false);
        }
    };
    return (
        <div className="space-y-4 lg:col-span-2">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end">
                <TextField
                    containerClassName="flex-1"
                    label="Tìm vị trí trên bản đồ"
                    value={query}
                    placeholder={addressHint || 'Nhập địa chỉ hoặc tên địa điểm'}
                    onChange={(event) => setQuery(event.target.value)}
                    onKeyDown={(event: KeyboardEvent<HTMLInputElement>) => {
                        if (event.key === 'Enter') {
                            event.preventDefault();
                            void search();
                        }
                    }}
                />
                <Button type="button" variant="blue" disabled={searching} onClick={() => void search()}>
                    {searching ? 'Đang tìm...' : 'Tìm kiếm'}
                </Button>
            </div>
            {results.length > 0 && (
                <div className="divide-y rounded-lg border border-slate-200 bg-white">
                    {results.map((result) => (
                        <button
                            key={result.place_id}
                            type="button"
                            className="block w-full px-3 py-2 text-left text-sm hover:bg-slate-50"
                            onClick={() => selectResult(result)}
                        >
                            {result.display_name}
                        </button>
                    ))}
                </div>
            )}
            <div className="h-[300px] overflow-hidden rounded-xl border border-slate-200 sm:h-[420px]">
                <MapContainer
                    center={position}
                    zoom={latitude && longitude ? 16 : 6}
                    scrollWheelZoom
                    className="h-full w-full"
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url={process.env.NEXT_PUBLIC_OSM_TILE_URL ?? 'https://tile.openstreetmap.org/{z}/{x}/{y}.png'}
                    />
                    <MapController position={position} onChange={onChange} />
                </MapContainer>
            </div>
            <p className="text-xs text-slate-500">Nhấp vào bản đồ hoặc chọn một kết quả tìm kiếm để lấy tọa độ.</p>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <TextField readOnly label="Vĩ độ" value={latitude || ''} error={latitudeError} />
                <TextField readOnly label="Kinh độ" value={longitude || ''} error={longitudeError} />
            </div>
        </div>
    );
}
