export interface Response<T, U> {
    success: boolean;
    message: string;
    data?: T;
    errors?: U;
}

export interface PaginationResponse<T> {
    items: T[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}
