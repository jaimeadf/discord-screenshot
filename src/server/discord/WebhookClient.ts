import axios, { AxiosError } from 'axios';
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

    private async sendInternal(message: WebhookMessage): Promise<void> {
        const formData = message.toFormData();
        try {
            await axios.post(this._url, formData.getBuffer(), {
                headers: formData.getHeaders()
            });
        } catch (error) {
            const axiosError = error as AxiosError;
            const response = axiosError.response;

            if (response?.status === StatusCodes.TOO_MANY_REQUESTS) {
                const rateLimitInfo = new RateLimitInfo(response.headers);

                await Utils.delay(rateLimitInfo.retryAfter);
                return await this.sendInternal(message);
            }

            throw axiosError;
        }
    }
}

export default WebhookClient;
