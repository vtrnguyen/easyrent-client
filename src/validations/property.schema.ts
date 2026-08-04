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
    latitude: z.coerce.number().min(1, 'Vĩ độ không hợp lệ').max(90, 'Vĩ độ không hợp lệ'),
    longitude: z.coerce.number().min(1, 'Kinh độ không hợp lệ').max(180, 'Kinh độ không hợp lệ'),
    area: z.coerce.number().positive('Diện tích phải lớn hơn 0'),
    maxPeople: z.coerce.number().int().positive('Số người tối đa phải lớn hơn 0'),
    numberOfBedrooms: z.coerce.number().int().nonnegative('Số phòng ngủ không hợp lệ'),
    numberOfBathrooms: z.coerce.number().int().nonnegative('Số phòng tắm không hợp lệ'),
    extraRoomInfos: z.string().trim(),
    price: z.coerce.number().positive('Giá thuê phải lớn hơn 0'),
    electricityPrice: z.coerce.number().positive('Giá điện phải lớn hơn 0'),
    waterPrice: z.coerce.number().positive('Giá nước phải lớn hơn 0'),
    status: z.enum(propertyStatusValues, {
        message: 'Trạng thái không được để trống',
    }),
    utilities: z.array(z.string()),
    images: z.array(z.instanceof(File)).optional(),
    videos: z.array(z.instanceof(File)).optional(),
});
