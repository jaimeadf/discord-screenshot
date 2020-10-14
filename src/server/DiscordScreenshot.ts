import DiscordWebhook from './discord/DiscordWebhook';
import DiscordWebhookMessage from './discord/DiscordWebhookMessage';
import DiscordWebhookMessageAuthor from './discord/DiscordWebhookMessageAuthor';
import ScreenshotTaker from './screenshot/ScreenshotTaker';

class DiscordScreenshot {
    private readonly _discordWebhook: DiscordWebhook;
    private readonly _screenshotTaker: ScreenshotTaker;

    public constructor(discordWebhook: DiscordWebhook, screenshotTaker: ScreenshotTaker) {
        this._discordWebhook = discordWebhook;
        this._screenshotTaker = screenshotTaker;
    }

    public async requestClientScreenshotDiscordUpload(player: string | number, webhookMessageAuthor?: DiscordWebhookMessageAuthor, webhookMessageContent?: string): Promise<void> {
        const screenshot = await this._screenshotTaker.takeClientScreenshot(player);
        const webhookMessage = new DiscordWebhookMessage();
        webhookMessage
            .setAuthor(webhookMessageAuthor)
            .setContent(webhookMessageContent)
            .attachFile(screenshot);

        await this._discordWebhook.sendMessage(webhookMessage);
    }
}

export default DiscordScreenshot;
