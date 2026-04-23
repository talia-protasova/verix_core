export class HttpError extends Error {
    // HTTP status code (e.g. 404, 500)
    status: number;
    // raw status text from response
    statusText: string;
    // original fetch response for further inspection
    response?: Response;

    constructor(response: Response, message?: string) {
        // fallback message if not provided
        super(message || `HTTP Error: ${response.status}`);
        this.name = 'HttpError';

        // normalize response data for easier handling
        this.status = response.status;
        this.statusText = response.statusText;
        this.response = response;
    }
}

export class AppError extends Error {
    // internal error code for app-level handling
    code: string;
    // optional HTTP status (if derived from API)
    status?: number;
    // original error for debugging / logging
    originalError?: unknown;

    constructor(message: string, code = 'UNKNOWN_ERROR', status?: number, originalError?: unknown) {
        super(message);
        this.name = 'AppError';

        // structured error data for UI / logging layers
        this.code = code;
        this.status = status;
        this.originalError = originalError;
    }
}
