import { StatusCodes } from 'http-status-codes';

import WebhookMessage from './WebhookMessage';
import RateLimitInfo from './RateLimitInfo';

import Utils from '../utils/Utils';
import AsyncQueue from '../utils/AsyncQueue';

class WebhookClient {
    private readonly _url: string;
    private readonly _queue: AsyncQueue;

    constructor(url: string) {
        this._url = url;
        this._queue = new AsyncQueue();
    }

    async send(message: WebhookMessage) {
        await this._queue.wait();
        try {
            return await this.sendInternal(message);
        } finally {
            this._queue.shift();
        }
    }

    private async sendInternal(message: WebhookMessage) {
        return new Promise<void>(resolve => {
            message.toFormData().submit(this._url, async (error, response) => {
                if (response.statusCode === StatusCodes.TOO_MANY_REQUESTS) {
                    const rateLimitInfo = new RateLimitInfo(response.headers);

                    await Utils.delay(rateLimitInfo.retryAfter);
                    await this.sendInternal(message);
                }

                resolve();
            });
        });
    }
}

export default WebhookClient;
