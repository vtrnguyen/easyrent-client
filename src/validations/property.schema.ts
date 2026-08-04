import { z } from 'zod';

import { PropertyStatus, PropertyTypes } from '@/common/constants/appConstants';

const propertyTypeValues = Object.values(PropertyTypes) as [string, ...string[]];
const propertyStatusValues = Object.values(PropertyStatus) as [string, ...string[]];

export const propertySchema = z.object({
    title: z.string().trim().min(1, 'Tiêu đề không được để trống'),
    type: z.enum(propertyTypeValues, {
        message: 'Loại chỗ ở không được để trống',
    }),
    description: z.string().trim().min(1, 'Mô tả không được để trống'),
    province: z.string().trim().min(1, 'Tỉnh/thành không được để trống'),
    district: z.string().trim().min(1, 'Quận/huyện không được để trống'),
    ward: z.string().trim().min(1, 'Phường/xã không được để trống'),
    address: z.string().trim().min(1, 'Địa chỉ không được để trống'),
    latitude: z.coerce.number(),
    longitude: z.coerce.number(),
    area: z.coerce.number().positive('Diện tích phải lớn hơn 0'),
    maxPeople: z.coerce.number().int().positive('Số người tối đa phải lớn hơn 0'),
    numberOfBedrooms: z.coerce.number().int().nonnegative('Số phòng ngủ không hợp lệ'),
    numberOfBathrooms: z.coerce.number().int().nonnegative('Số phòng tắm không hợp lệ'),
    extraRoomInfos: z.string().trim(),
    price: z.coerce.number().nonnegative('Giá thuê không hợp lệ'),
    electricityPrice: z.coerce.number().nonnegative('Giá điện không hợp lệ'),
    waterPrice: z.coerce.number().nonnegative('Giá nước không hợp lệ'),
    status: z.enum(propertyStatusValues, {
        message: 'Trạng thái không được để trống',
    }),
    utilities: z.array(z.string()),
    images: z.array(z.instanceof(File)).optional(),
    videos: z.array(z.instanceof(File)).optional(),
});
