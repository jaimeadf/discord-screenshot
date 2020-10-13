import Settings from './data/Settings';

import DiscordWebhook from './discord/DiscordWebhook';
import DiscordWebhookMessageAuthor from './discord/DiscordWebhookMessageAuthor';

import ScreenshotTaker from './screenshot/ScreenshotTaker';
import DiscordScreenshot from './DiscordScreenshot';

import Command from './commands/Command';
import StandaloneScreenshotCommandHandler from './commands/screenshot/StandaloneScreenshotCommandHandler';
import VrpScreenshotCommandHandler from './commands/screenshot/VrpScreenshotCommandHandler';

const settings = JSON.parse(LoadResourceFile(GetCurrentResourceName(), 'settings.json')) as Settings;

const discordWebhook = new DiscordWebhook(settings.discordWebhookUrl);
const screenshotTaker = new ScreenshotTaker(settings.screenshotOptions);
const discordScreenshot = new DiscordScreenshot(discordWebhook, screenshotTaker);

const screenshotCommand = new Command('screenshot', new StandaloneScreenshotCommandHandler(discordScreenshot));

global.exports('requestClientDiscordUpload', (player: string | number, webhookMessageAuthor?: DiscordWebhookMessageAuthor, webhookMessageContent?: string): void => {
    discordScreenshot.requestClientScreenshotDiscordUpload(player, webhookMessageAuthor, webhookMessageContent);
});

on('onResourceStart', (resourceName: string) => {
    switch (resourceName) {
        case 'vrp':
            screenshotCommand.setHandler(new VrpScreenshotCommandHandler(discordScreenshot));
            break;
    }
});
