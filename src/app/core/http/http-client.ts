import { handleHttpError } from './error-interceptor';
import { HttpError } from './http-error';

export interface HttpRequestOptions extends RequestInit {
    baseUrl?: string;
}

export class HttpClient {
    private baseUrl: string;

    constructor(baseUrl = '') {
        // base URL for all requests (can be overridden per call)
        this.baseUrl = baseUrl;
    }

    async request<T>(url: string, options: HttpRequestOptions = {}): Promise<T> {
        // resolve final URL (instance-level or per-request override)
        const fullUrl = `${options.baseUrl || this.baseUrl}${url}`;

        try {
            const response = await fetch(fullUrl, {
                ...options,
                headers: {
                    // default JSON header (can be overridden)
                    'Content-Type': 'application/json',
                    ...(options.headers || {}),
                },
            });

            // convert non-2xx responses into HttpError
            if (!response.ok) {
                throw new HttpError(response);
            }

            // handle empty responses (e.g. 204 No Content)
            if (response.status === 204) {
                return undefined as T;
            }

            // parse JSON response
            return await response.json();
        } catch (error) {
            // normalize all errors into AppError
            throw handleHttpError(error);
        }
    }

    get<T>(url: string, options?: HttpRequestOptions) {
        // shorthand for GET requests
        return this.request<T>(url, {
            ...options,
            method: 'GET',
        });
    }

    post<T>(url: string, body?: unknown, options?: HttpRequestOptions) {
        // stringify body for JSON requests
        return this.request<T>(url, {
            ...options,
            method: 'POST',
            body: body ? JSON.stringify(body) : undefined,
        });
    }
}
