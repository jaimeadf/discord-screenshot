import Settings from './data/Settings';

import DiscordWebhook from './discord/DiscordWebhook';

import ScreenshotTaker from './screenshot/ScreenshotTaker';
import ScreenshotOptions from './screenshot/ScreenshotOptions';

import Command from './commands/Command';
import ScreenshotCommandHandler from './commands/screenshot/ScreenshotCommandHandler';
import VrpScreenshotCommandHandler from './commands/screenshot/VrpScreenshotCommandHandler';
import EsxScreenshotCommandHandler from './commands/screenshot/EsxScreenshotCommandHandler';

import DiscordWebhookMessageDto from './dtos/discord/DiscordWebhookMessageDto';

const settings = JSON.parse(LoadResourceFile(GetCurrentResourceName(), 'settings.json')) as Settings;

const screenshotTaker = new ScreenshotTaker(settings.screenshotOptions);
const discordWebhook = new DiscordWebhook(settings.discordWebhookUrl);

const screenshotCommand = new Command('screenshot', new ScreenshotCommandHandler(screenshotTaker, discordWebhook));

// TODO
global.exports('requestClientScreenshotUploadToDiscord', (player: string | number, message: DiscordWebhookMessageDto): void => {
});

// TODO
global.exports('requestCustomClientScreenshotUploadToDiscord', (player: string | number, webhookUrl: string, options: ScreenshotOptions, message: DiscordWebhookMessageDto): void => {
});

on('onResourceStart', (resourceName: string) => {
    switch (resourceName) {
        case 'vrp':
            screenshotCommand.setHandler(new VrpScreenshotCommandHandler(screenshotTaker, discordWebhook));
            break;
        case 'es_extended':
            screenshotCommand.setHandler(new EsxScreenshotCommandHandler(screenshotTaker, discordWebhook))
            break;
    }
});
