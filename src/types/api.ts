export interface Response<T, U> {
    success: boolean;
    message: string;
    data?: T;
    errors?: U;
}