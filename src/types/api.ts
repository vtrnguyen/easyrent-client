export interface SuccessResponse<T = void> {
    success: true;
    message: string;
    data: T;
}

export interface ErrorResponse<E = unknown> {
    success: false;
    message: string;
    code?: string;
    errors?: E;
}

export type ApiResponse<T = void, E = unknown> = SuccessResponse<T> | ErrorResponse<E>;

export interface PaginationResponse<T> {
    items: T[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}
