import Settings from './data/Settings';

import DiscordWebhook from './discord/DiscordWebhook';
import DiscordWebhookMessage from './discord/DiscordWebhookMessage';
import DiscordWebhookMessageDto from './dtos/discord/DiscordWebhookMessageDto';

import ScreenshotTaker from './screenshot/ScreenshotTaker';
import ScreenshotOptions from './screenshot/ScreenshotOptions';

import Command from './commands/Command';
import ScreenshotCommandHandler from './commands/screenshot/ScreenshotCommandHandler';
import VrpScreenshotCommandHandler from './commands/screenshot/VrpScreenshotCommandHandler';
import EsxScreenshotCommandHandler from './commands/screenshot/EsxScreenshotCommandHandler';

import ResourceState from './utils/ResourceState';

const settings = JSON.parse(LoadResourceFile(GetCurrentResourceName(), 'settings.json')) as Settings;

const screenshotTaker = new ScreenshotTaker(settings.screenshotOptions);
const discordWebhook = new DiscordWebhook(settings.discordWebhookUrl);

const screenshotCommand = new Command('screenshot', new ScreenshotCommandHandler(screenshotTaker, discordWebhook));

global.exports('requestClientScreenshotUploadToDiscord', (player: string | number, webhookMessageDto: DiscordWebhookMessageDto): void => {
    screenshotTaker.takeClientScreenshot(player.toString()).then(screenshot => {
        const message = new DiscordWebhookMessage(webhookMessageDto)
            .attachFile(screenshot);

        discordWebhook.sendMessage(message);
    });
});

global.exports('requestCustomClientScreenshotUploadToDiscord', (player: string | number, webhookUrl: string, screenshotOptions: ScreenshotOptions = settings.screenshotOptions, webhookMessageDto?: DiscordWebhookMessageDto): void => {
    const customDiscordWebhook = new DiscordWebhook(webhookUrl);
    const customScreenshotTaker = new ScreenshotTaker(screenshotOptions);

    customScreenshotTaker.takeClientScreenshot(player.toString())
        .then(screenshot => {
            const message = new DiscordWebhookMessage(webhookMessageDto)
                .attachFile(screenshot);

            customDiscordWebhook.sendMessage(message);
        });
});

function onFindNewResource(resourceName: string) {
    if (GetResourceState(resourceName) === ResourceState.STARTED) {
        switch (resourceName) {
            case 'vrp':
                screenshotCommand.setHandler(new VrpScreenshotCommandHandler(screenshotTaker, discordWebhook));
                break;
            case 'es_extended':
                screenshotCommand.setHandler(new EsxScreenshotCommandHandler(screenshotTaker, discordWebhook))
                break;
        }
    }
}

on('onResourceStart', (resourceName: string) => {
    if (resourceName === GetCurrentResourceName()) {
        for (let i = 0; i < GetNumResources(); i++) {
            const foundResourceName = GetResourceByFindIndex(i);
            if (foundResourceName) {
                onFindNewResource(foundResourceName);
            }
        }
    } else {
        onFindNewResource(resourceName);
    }
});
