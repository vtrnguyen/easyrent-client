import { authStorage, getHomeRoute, toCamelCase, toSnakeCase } from "@/common/helpers/helper";
import { api } from "./axios";

api.interceptors.request.use((config) => {
    const auth = authStorage.get();

    if (auth?.accessToken) {
        config.headers.Authorization = `Bearer ${auth.accessToken}`;
    }

    if (config.data) {
        config.data = toSnakeCase(config.data);
    }

    return config;
});

api.interceptors.response.use(
    (response) => {
        response.data = toCamelCase(response.data);
        return response;
    },

    (error) => {
        const status = error.response?.status;
        const auth = authStorage.get();

        if ((status === 401 || status === 403) && auth?.accessToken) {
            window.location.href = getHomeRoute(auth?.role);
        }

        if (status >= 500) {
            alert("Server error. Please try again later.");
        }

        return Promise.reject(error);
    }
)