import { AxiosError } from 'axios';

export interface Response {
    success: boolean;
    message?: string;
}

export interface ErrorDetail extends Error {
    status?: number;
}

export const writeError = (err: AxiosError<Response>, name: string) => {
    const message = err.response?.data.message ?? err.message;
    const error: ErrorDetail = {
        name: name,
        message: message,
        status: err.response?.status
    };

    return error;
};
