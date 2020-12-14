import { IncomingHttpHeaders } from 'http';

class RateLimitInfo {
    retryAfter: number;
    limit: number;
    remaining: number;
    reset: Date;
    resetAfter: number;

    constructor(headers: IncomingHttpHeaders) {
        this.retryAfter = parseInt(headers['retry-after'] as string, 10) || 0;
        this.limit = parseInt(headers['x-ratelimit-limit'] as string, 10) || 0;
        this.remaining = parseInt(headers['x-ratelimit-limit'] as string, 10) || 0;
        this.reset = headers['x-ratelimit-reset']
            ? new Date(1000 * parseInt(headers['x-ratelimit-reset'] as string, 10))
            : new Date();
        this.resetAfter = parseInt(headers['x-ratelimit-reset-after'] as string, 10) || 0;
    }
}

export default RateLimitInfo;
