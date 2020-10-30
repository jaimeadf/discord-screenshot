import { Queue } from 'typescript-collections';
import axios, { AxiosError } from 'axios';
import  { StatusCodes } from 'http-status-codes';

import DiscordWebhookMessage from './DiscordWebhookMessage';

export default class DiscordWebhook {
    private readonly webhookUrl: string;
    private readonly messageQueue: Queue<DiscordWebhookMessage>;
    private flushingMessageQueue: boolean;

    public constructor(webhookUrl: string) {
        this.webhookUrl = webhookUrl;
        this.messageQueue = new Queue();
        this.flushingMessageQueue = false;
    }

    public sendMessage(message: DiscordWebhookMessage): void {
        this.messageQueue.enqueue(message);
        this.flushMessageQueue();
    }

    private async flushMessageQueue() {
        if (!this.flushingMessageQueue) {
            this.flushingMessageQueue = true;
            while (!this.messageQueue.isEmpty()) {
                const message = this.messageQueue.dequeue();
                if (message) {
                    try {
                        await this.sendMessageInternal(message);
                    } catch(error) {
                        console.error(error);
                    }
                }
            }
            this.flushingMessageQueue = false;
        }
    }

    private async sendMessageInternal(message: DiscordWebhookMessage): Promise<void> {
        try {
            const formData = message.toFormData();
            await axios.post(this.webhookUrl, formData, {
                headers: formData.getHeaders()
            });
        } catch(error: unknown) {
            const axiosError = error as AxiosError;
            const response = axiosError.response;

            if (response?.status === StatusCodes.TOO_MANY_REQUESTS) {
                await new Promise(resolve => {
                    setTimeout(resolve, parseInt(response.headers['retry-after']));
                });
                await this.sendMessageInternal(message);
            } else {
                throw axiosError.message;
            }
        }
    }
}
