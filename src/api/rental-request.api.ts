import { api } from '@/services/axios';

export const rentalRequestApi = {
    async create(propertyId: string, message: string): Promise<void> {
        await api.post('/rental-request', { property_id: propertyId, message });
    },
};
