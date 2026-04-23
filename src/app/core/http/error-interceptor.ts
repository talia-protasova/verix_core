import { HttpError, AppError } from './http-error';

// map HTTP status → app-level error metadata
const HTTP_ERROR_MAP: Record<number, { message: string; code: string }> = {
    400: { message: 'Bad request.', code: 'BAD_REQUEST' },
    401: { message: 'Unauthorized request.', code: 'UNAUTHORIZED' },
    403: { message: 'Access denied.', code: 'FORBIDDEN' },
    404: { message: 'Resource not found.', code: 'NOT_FOUND' },
    500: { message: 'Internal server error.', code: 'SERVER_ERROR' },
};

export const handleHttpError = (error: unknown): AppError => {
    // normalize HTTP layer errors
    if (error instanceof HttpError) {
        const mapped = HTTP_ERROR_MAP[error.status];

        return new AppError(
            // fallback message if status is not mapped
            mapped?.message || 'Request failed.',
            // fallback code for unknown cases
            mapped?.code || 'HTTP_ERROR',
            error.status,
            // preserve original error for debugging
            error,
        );
    }

    // already normalized app error → pass through
    if (error instanceof AppError) {
        return error;
    }

    // native JS error → wrap into AppError
    if (error instanceof Error) {
        return new AppError(error.message, 'UNEXPECTED_ERROR', undefined, error);
    }

    // unknown shape (non-error thrown)
    return new AppError('Something went wrong.', 'UNKNOWN_ERROR', undefined, error);
};
