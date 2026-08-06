'use client';

import React, { useEffect, useMemo, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm, useWatch } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

import { propertyApi } from '@/api/property.api';
import { utilityApi } from '@/api/utility.api';
import { appRoutes, PropertyStatus, PropertyTypes } from '@/common/constants/appConstants';
import { createFormData, propertyStatusOptions, propertyTypeOptions } from '@/common/helpers/helper';
import Button from '@/shared/components/buttons/button';
import Card from '@/shared/components/card/card';
import Confirmation from '@/shared/components/confirmation/confirmation';
import Dropdown from '@/shared/components/dropdown/dropdown';
import useLoadingOverlay from '@/shared/hooks/useLoadingOverlay';
import TextArea from '@/shared/components/textarea/textarea';
import TextField from '@/shared/components/text-field/text-field';
import AdministrativeAddressFields from '@/shared/components/property-location/administrative-address-fields';
import LocationPicker from '@/shared/components/property-location/location-picker';
import { Utility } from '@/types/utility';
import { propertySchema } from '@/validations/property.schema';
import { z } from 'zod';

interface Props {
    propertyId?: string;
}

type PropertyFormInput = z.input<typeof propertySchema>;
type PropertyFormValues = z.output<typeof propertySchema>;

export default function PropertyDetailPage({ propertyId }: Props) {
    const isCreate = !propertyId;

    const loading = useLoadingOverlay();
    const router = useRouter();

    const [utilities, setUtilities] = useState<Utility[]>([]);
    const [existingImages, setExistingImages] = useState<string[]>([]);
    const [existingVideos, setExistingVideos] = useState<string[]>([]);
    const [openConfirm, setOpenConfirm] = useState(false);
    const [submitValues, setSubmitValues] = useState<PropertyFormValues | null>(null);
    const [selectedUtilityId, setSelectedUtilityId] = useState('');

    const {
        register,
        handleSubmit,
        reset,
        control,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm<PropertyFormInput, unknown, PropertyFormValues>({
        resolver: zodResolver(propertySchema),
        defaultValues: {
            title: '',
            type: PropertyTypes.House,
            description: '',
            province: '',
            district: '',
            ward: '',
            address: '',
            latitude: 0,
            longitude: 0,
            area: 0,
            maxPeople: 1,
            numberOfBedrooms: 1,
            numberOfBathrooms: 1,
            extraRoomInfos: '',
            price: 0,
            electricityPrice: 0,
            waterPrice: 0,
            status: PropertyStatus.Available,
            utilities: [],
        },
    });

    const selectedUtilities = useWatch({
        control,
        name: 'utilities',
    });

    const selectedImages = useWatch({
        control,
        name: 'images',
    });

    const selectedVideos = useWatch({
        control,
        name: 'videos',
    });

    const [province, district, ward, address, latitude, longitude] = useWatch({
        control,
        name: ['province', 'district', 'ward', 'address', 'latitude', 'longitude'],
    });

    const selectedImagePreviews = useMemo(
        () =>
            (selectedImages ?? []).map((file) => ({
                name: file.name,
                url: URL.createObjectURL(file),
            })),
        [selectedImages],
    );

    const selectedVideoPreviews = useMemo(
        () =>
            (selectedVideos ?? []).map((file) => ({
                name: file.name,
                url: URL.createObjectURL(file),
            })),
        [selectedVideos],
    );

    useEffect(() => {
        return () => {
            selectedImagePreviews.forEach((item) => URL.revokeObjectURL(item.url));
        };
    }, [selectedImagePreviews]);

    useEffect(() => {
        return () => {
            selectedVideoPreviews.forEach((item) => URL.revokeObjectURL(item.url));
        };
    }, [selectedVideoPreviews]);

    const utilityOptions = useMemo(
        () =>
            utilities.map((utility) => ({
                label: utility.displayName,
                value: utility.id,
            })),
        [utilities],
    );

    useEffect(() => {
        let cancelled = false;

        const loadData = async () => {
            loading.open();

            try {
                const [utilityResponse, property] = await Promise.all([
                    utilityApi.getAll(),
                    isCreate ? Promise.resolve(null) : propertyApi.getById(propertyId),
                ]);

                if (cancelled) {
                    return;
                }

                setUtilities(utilityResponse.data);

                if (property) {
                    setExistingImages(property.images.map((item) => item.imageUrl));
                    setExistingVideos(property.videos.map((item) => item.videoUrl));

                    reset({
                        title: property.title,
                        type: property.type,
                        description: property.description,
                        province: property.province,
                        district: property.district,
                        ward: property.ward,
                        address: property.address,
                        latitude: property.latitude,
                        longitude: property.longitude,
                        area: property.area,
                        maxPeople: property.maxPeople,
                        numberOfBedrooms: property.numberOfBedrooms,
                        numberOfBathrooms: property.numberOfBathrooms,
                        extraRoomInfos: property.extraRoomInfos,
                        price: property.price,
                        electricityPrice: property.electricityPrice,
                        waterPrice: property.waterPrice,
                        status: property.status as PropertyStatus,
                        utilities: property.utilities,
                    });
                }
            } catch {
                toast.error('Không thể tải dữ liệu chỗ ở.');
            } finally {
                if (!cancelled) {
                    loading.close();
                }
            }
        };

        loadData();

        return () => {
            cancelled = true;
        };
    }, [isCreate, loading, propertyId, reset]);

    const onSubmit = (values: PropertyFormValues) => {
        setSubmitValues(values);
        setOpenConfirm(true);
    };

    const handleConfirm = async () => {
        if (!submitValues) {
            return;
        }

        try {
            loading.open();

            const formData = createFormData({
                title: submitValues.title,
                type: submitValues.type,
                description: submitValues.description,
                province: submitValues.province,
                district: submitValues.district,
                ward: submitValues.ward,
                address: submitValues.address,
                latitude: submitValues.latitude,
                longitude: submitValues.longitude,
                area: submitValues.area,
                max_people: submitValues.maxPeople,
                number_of_bedrooms: submitValues.numberOfBedrooms,
                number_of_bathrooms: submitValues.numberOfBathrooms,
                extra_room_infos: submitValues.extraRoomInfos,
                price: submitValues.price,
                electricity_price: submitValues.electricityPrice,
                water_price: submitValues.waterPrice,
                status: submitValues.status,
                utilities: submitValues.utilities,
                images: submitValues.images ?? [],
                videos: submitValues.videos ?? [],
            });

            if (isCreate) {
                await propertyApi.create(formData);
                toast.success('Tạo chỗ ở thành công.');
            } else {
                await propertyApi.update(propertyId!, formData);
                toast.success('Cập nhật chỗ ở thành công.');
            }

            router.replace(`/${appRoutes.landlord}/${appRoutes.properties}`);
        } catch (error) {
            toast.error((error as Error).message);
        } finally {
            setOpenConfirm(false);
            setSubmitValues(null);
            loading.close();
        }
    };

    const removeUtility = (utilityId: string) => {
        setValue(
            'utilities',
            selectedUtilities.filter((item) => item !== utilityId),
            { shouldDirty: true },
        );
    };

    const addUtility = () => {
        if (!selectedUtilityId || selectedUtilities.includes(selectedUtilityId)) {
            return;
        }

        setValue('utilities', [...selectedUtilities, selectedUtilityId], { shouldDirty: true });
        setSelectedUtilityId('');
    };

    return (
        <React.Fragment>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="flex items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-semibold text-slate-900">
                            {isCreate ? 'Tạo chỗ ở' : 'Cập nhật chỗ ở'}
                        </h1>
                        <p className="mt-1 text-sm text-slate-500">Nhập đầy đủ thông tin để quản lý tin đăng.</p>
                    </div>

                    <Button type="submit" variant="primary">
                        {isSubmitting ? 'Đang lưu...' : 'Lưu'}
                    </Button>
                </div>

                <Card title="Thông tin cơ bản">
                    <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                        <TextField label="Tiêu đề" error={errors.title?.message} {...register('title')} />

                        <Controller
                            name="type"
                            control={control}
                            render={({ field }) => (
                                <Dropdown
                                    label="Loại chỗ ở"
                                    error={errors.type?.message}
                                    value={field.value}
                                    onChange={(value) => field.onChange(value)}
                                    options={propertyTypeOptions}
                                />
                            )}
                        />

                        <AdministrativeAddressFields
                            province={province}
                            district={district}
                            ward={ward}
                            address={address}
                            errors={{
                                province: errors.province?.message,
                                district: errors.district?.message,
                                ward: errors.ward?.message,
                                address: errors.address?.message,
                            }}
                            onChange={(field, value) =>
                                setValue(field, value, { shouldDirty: true, shouldValidate: true })
                            }
                        />
                    </div>
                </Card>

                <Card title="Mô tả và vị trí">
                    <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                        <TextArea label="Mô tả" error={errors.description?.message} {...register('description')} />

                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                            <TextField
                                type="number"
                                label="Diện tích (m²)"
                                error={errors.area?.message}
                                {...register('area')}
                            />

                            <TextField
                                type="number"
                                label="Số người tối đa"
                                error={errors.maxPeople?.message}
                                {...register('maxPeople')}
                            />

                            <TextField
                                type="number"
                                min={1}
                                label="Số phòng ngủ"
                                error={errors.numberOfBedrooms?.message}
                                {...register('numberOfBedrooms')}
                            />

                            <TextField
                                type="number"
                                min={1}
                                label="Số phòng tắm"
                                error={errors.numberOfBathrooms?.message}
                                {...register('numberOfBathrooms')}
                            />
                        </div>

                        <LocationPicker
                            latitude={Number(latitude)}
                            longitude={Number(longitude)}
                            latitudeError={errors.latitude?.message}
                            longitudeError={errors.longitude?.message}
                            addressHint={[ward, district, province, 'Việt Nam'].filter(Boolean).join(', ')}
                            onChange={(lat, lng) => {
                                setValue('latitude', lat, { shouldDirty: true, shouldValidate: true });
                                setValue('longitude', lng, { shouldDirty: true, shouldValidate: true });
                            }}
                        />
                    </div>
                </Card>

                <Card title="Giá và trạng thái">
                    <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                        <TextField
                            type="number"
                            label="Giá thuê"
                            error={errors.price?.message}
                            {...register('price')}
                        />

                        <TextField
                            type="number"
                            label="Giá điện (VND/kWh)"
                            error={errors.electricityPrice?.message}
                            {...register('electricityPrice')}
                        />

                        <TextField
                            type="number"
                            label="Giá nước (VND/m³)"
                            error={errors.waterPrice?.message}
                            {...register('waterPrice')}
                        />

                        <Controller
                            name="status"
                            control={control}
                            render={({ field }) => (
                                <Dropdown
                                    label="Trạng thái"
                                    error={errors.status?.message}
                                    value={field.value}
                                    onChange={(value) => field.onChange(value)}
                                    options={propertyStatusOptions}
                                />
                            )}
                        />
                    </div>
                </Card>

                <Card title="Tiện ích">
                    <div className="space-y-4">
                        <div className="flex flex-col gap-3 lg:flex-row lg:items-end">
                            <div className="flex-1">
                                <Dropdown
                                    label="Chọn tiện ích"
                                    placeholder="Chọn tiện ích"
                                    options={utilityOptions}
                                    value={selectedUtilityId}
                                    onChange={setSelectedUtilityId}
                                />
                            </div>

                            <Button variant="secondary" onClick={addUtility} disabled={!selectedUtilityId}>
                                Thêm tiện ích
                            </Button>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {selectedUtilities.length === 0 ? (
                                <span className="text-sm text-slate-500">Chưa chọn tiện ích nào.</span>
                            ) : (
                                selectedUtilities.map((utilityId) => {
                                    const utility = utilities.find((item) => item.id === utilityId);

                                    return (
                                        <button
                                            key={utilityId}
                                            type="button"
                                            onClick={() => removeUtility(utilityId)}
                                            className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-sm text-blue-700 transition hover:bg-blue-100"
                                        >
                                            <span>{utility?.displayName ?? utilityId}</span>
                                            <span aria-hidden="true">×</span>
                                        </button>
                                    );
                                })
                            )}
                        </div>
                    </div>
                </Card>

                <Card title="Thông tin bổ sung">
                    <TextArea
                        label="Thông tin phòng bổ sung"
                        error={errors.extraRoomInfos?.message}
                        {...register('extraRoomInfos')}
                    />
                </Card>

                <Card title="Hình ảnh và video">
                    <div className="space-y-5">
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-slate-700">Ảnh hiện tại</span>
                                <span className="text-xs text-slate-500">{existingImages.length} ảnh</span>
                            </div>

                            {existingImages.length === 0 ? (
                                <p className="text-sm text-slate-500">Chưa có ảnh.</p>
                            ) : (
                                <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-4">
                                    {existingImages.map((imageUrl, index) => (
                                        <div
                                            key={`${imageUrl}-${index}`}
                                            className="overflow-hidden rounded-xl border border-slate-200 bg-slate-50"
                                        >
                                            <Image
                                                src={imageUrl}
                                                alt={`Ảnh chỗ ở ${index + 1}`}
                                                width={320}
                                                height={240}
                                                unoptimized
                                                className="h-40 w-full object-cover"
                                            />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <TextField
                            type="file"
                            multiple
                            accept="image/*"
                            label="Tải lên hình ảnh"
                            onChange={(event) =>
                                setValue('images', Array.from(event.target.files ?? []), { shouldDirty: true })
                            }
                        />

                        {selectedImages && selectedImages.length > 0 ? (
                            <div className="space-y-3">
                                <p className="text-xs text-slate-500">Đã chọn {selectedImages.length} file ảnh mới.</p>

                                <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-4">
                                    {selectedImagePreviews.map((item) => (
                                        <div
                                            key={item.url}
                                            className="overflow-hidden rounded-xl border border-slate-200 bg-slate-50"
                                        >
                                            <Image
                                                src={item.url}
                                                alt={item.name}
                                                width={320}
                                                height={240}
                                                unoptimized
                                                className="h-40 w-full object-cover"
                                            />
                                            <div className="truncate px-3 py-2 text-xs text-slate-600">{item.name}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : null}

                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-slate-700">Video hiện tại</span>
                                <span className="text-xs text-slate-500">{existingVideos.length} video</span>
                            </div>

                            {existingVideos.length === 0 ? (
                                <p className="text-sm text-slate-500">Chưa có video.</p>
                            ) : (
                                <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
                                    {existingVideos.map((videoUrl, index) => (
                                        <video
                                            key={`${videoUrl}-${index}`}
                                            controls
                                            controlsList="nodownload"
                                            className="w-full rounded-xl border border-slate-200 bg-slate-50"
                                        >
                                            <source src={videoUrl} />
                                        </video>
                                    ))}
                                </div>
                            )}
                        </div>

                        <TextField
                            type="file"
                            multiple
                            accept="video/*"
                            label="Tải lên video"
                            onChange={(event) =>
                                setValue('videos', Array.from(event.target.files ?? []), { shouldDirty: true })
                            }
                        />

                        {selectedVideos && selectedVideos.length > 0 ? (
                            <div className="space-y-3">
                                <p className="text-xs text-slate-500">
                                    Đã chọn {selectedVideos.length} file video mới.
                                </p>

                                <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
                                    {selectedVideoPreviews.map((item) => (
                                        <div
                                            key={item.url}
                                            className="overflow-hidden rounded-xl border border-slate-200 bg-slate-50 p-3"
                                        >
                                            <video controls className="w-full rounded-lg">
                                                <source src={item.url} />
                                            </video>
                                            <div className="mt-2 truncate text-xs text-slate-600">{item.name}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : null}
                    </div>
                </Card>
            </form>

            <Confirmation
                open={openConfirm}
                title={isCreate ? 'Tạo chỗ ở' : 'Cập nhật chỗ ở'}
                message={
                    isCreate
                        ? 'Bạn có chắc chắn muốn tạo chỗ ở này?'
                        : 'Bạn có chắc chắn muốn cập nhật thông tin chỗ ở này?'
                }
                onCancel={() => {
                    setOpenConfirm(false);
                    setSubmitValues(null);
                }}
                onConfirm={handleConfirm}
            />
        </React.Fragment>
    );
}
