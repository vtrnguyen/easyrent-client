import { api } from "@/services/axios";

import { LoginRequest, RegisterRequest } from "@/types/auth";

export const authApi = {
    async login(payload: LoginRequest) {
        const response = await api.post("/auth/login", payload);
        return response.data;
    },

    async register(payload: RegisterRequest) {
        const response = await api.post("/auth/register", payload);
        return response.data;
    },
};