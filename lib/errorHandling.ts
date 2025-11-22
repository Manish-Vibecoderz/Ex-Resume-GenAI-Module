/**
 * Error Handling Utilities
 * Centralized error handling for consistent user experience
 */

export class AppError extends Error {
    constructor(
        message: string,
        public code: string,
        public statusCode: number = 500,
        public userMessage?: string
    ) {
        super(message);
        this.name = 'AppError';
    }
}

export class ValidationError extends AppError {
    constructor(message: string, userMessage?: string) {
        super(message, 'VALIDATION_ERROR', 400, userMessage);
        this.name = 'ValidationError';
    }
}

export class NetworkError extends AppError {
    constructor(message: string, userMessage?: string) {
        super(message, 'NETWORK_ERROR', 503, userMessage);
        this.name = 'NetworkError';
    }
}

export class AIError extends AppError {
    constructor(message: string, userMessage?: string) {
        super(message, 'AI_ERROR', 500, userMessage);
        this.name = 'AIError';
    }
}

export class SessionError extends AppError {
    constructor(message: string, userMessage?: string) {
        super(message, 'SESSION_ERROR', 404, userMessage);
        this.name = 'SessionError';
    }
}

/**
 * Error handler for API routes
 */
export function handleAPIError(error: unknown): {
    error: string;
    code: string;
    statusCode: number;
} {
    console.error('API Error:', error);

    if (error instanceof AppError) {
        return {
            error: error.userMessage || error.message,
            code: error.code,
            statusCode: error.statusCode,
        };
    }

    if (error instanceof Error) {
        return {
            error: 'An unexpected error occurred',
            code: 'INTERNAL_ERROR',
            statusCode: 500,
        };
    }

    return {
        error: 'An unknown error occurred',
        code: 'UNKNOWN_ERROR',
        statusCode: 500,
    };
}

/**
 * Retry logic for API calls
 */
export async function retryAsync<T>(
    fn: () => Promise<T>,
    maxRetries: number = 3,
    delayMs: number = 1000
): Promise<T> {
    let lastError: Error | null = null;

    for (let i = 0; i < maxRetries; i++) {
        try {
            return await fn();
        } catch (error) {
            lastError = error as Error;
            if (i < maxRetries - 1) {
                await new Promise((resolve) => setTimeout(resolve, delayMs * (i + 1)));
            }
        }
    }

    throw lastError || new Error('Retry failed');
}

/**
 * Safe JSON parse with fallback
 */
export function safeJSONParse<T>(json: string, fallback: T): T {
    try {
        return JSON.parse(json);
    } catch {
        return fallback;
    }
}

/**
 * Sanitize user input to prevent XSS
 */
export function sanitizeInput(input: string): string {
    return input
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;')
        .replace(/\//g, '&#x2F;');
}

/**
 * Validate URL format
 */
export function isValidURL(url: string): boolean {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Validate phone number (basic)
 */
export function isValidPhone(phone: string): boolean {
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
}

/**
 * Debounce function for autosave
 */
export function debounce<T extends (...args: any[]) => any>(
    func: T,
    waitMs: number
): (...args: Parameters<T>) => void {
    let timeout: NodeJS.Timeout | null = null;

    return (...args: Parameters<T>) => {
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), waitMs);
    };
}

/**
 * Throttle function for rapid actions
 */
export function throttle<T extends (...args: any[]) => any>(
    func: T,
    limitMs: number
): (...args: Parameters<T>) => void {
    let inThrottle = false;

    return (...args: Parameters<T>) => {
        if (!inThrottle) {
            func(...args);
            inThrottle = true;
            setTimeout(() => (inThrottle = false), limitMs);
        }
    };
}

/**
 * Clamp number between min and max
 */
export function clamp(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max);
}

/**
 * Format file size for display
 */
export function formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

/**
 * Generate unique ID
 */
export function generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Check if running in browser
 */
export function isBrowser(): boolean {
    return typeof window !== 'undefined';
}

/**
 * Local storage helpers with error handling
 */
export const storage = {
    get: <T>(key: string, fallback: T): T => {
        if (!isBrowser()) return fallback;
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : fallback;
        } catch {
            return fallback;
        }
    },
    set: <T>(key: string, value: T): void => {
        if (!isBrowser()) return;
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error('Failed to save to localStorage:', error);
        }
    },
    remove: (key: string): void => {
        if (!isBrowser()) return;
        try {
            localStorage.removeItem(key);
        } catch (error) {
            console.error('Failed to remove from localStorage:', error);
        }
    },
};
