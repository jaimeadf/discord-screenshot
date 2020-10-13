import DiscordWebhookMessage from './DiscordWebhookMessage';

export default class DiscordWebhook {
    private readonly webhookUrl: string;

    public constructor(webhookUrl: string) {
        this.webhookUrl = webhookUrl;
    }

    public async sendMessage(message: DiscordWebhookMessage): Promise<void> {
        const formData = await message.toFormData();
        await formData.submit(this.webhookUrl);
    }
}
