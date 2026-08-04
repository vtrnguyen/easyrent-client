import { PropertyStatus, PropertyTypes } from '@/common/constants/appConstants';

export interface PropertyImage {
    id: string;
    imageUrl: string;
    isThumbnail: boolean;
    displayOrder: number;
}

export interface PropertyVideo {
    id: string;
    videoUrl: string;
}

export interface Property {
    id: string;
    ownerId: string;
    title: string;
    type: string;
    description: string;
    province: string;
    district: string;
    ward: string;
    address: string;
    latitude: number;
    longitude: number;
    area: number;
    maxPeople: number;
    numberOfBedrooms: number;
    numberOfBathrooms: number;
    extraRoomInfos: string;
    price: number;
    electricityPrice: number;
    waterPrice: number;
    status: PropertyStatus;
    images: PropertyImage[];
    videos: PropertyVideo[];
    utilities: string[];
    createdAt: string;
    updatedAt: string;
}

export type PropertyType = (typeof PropertyTypes)[keyof typeof PropertyTypes];

export interface PropertyForm {
    title: string;
    type: PropertyType;
    description: string;
    province: string;
    district: string;
    ward: string;
    address: string;
    latitude: number;
    longitude: number;
    area: number;
    maxPeople: number;
    numberOfBedrooms: number;
    numberOfBathrooms: number;
    extraRoomInfos: string;
    price: number;
    electricityPrice: number;
    waterPrice: number;
    status: string;
    utilities: string[];
    images?: File[];
    videos?: File[];
}
