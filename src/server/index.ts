import { loadSettings } from './Settings';

import WebhookClient from './discord/WebhookClient';
import WebhookMessage, { WebhookMessageData } from './discord/WebhookMessage';

import Screenshoter from './screenshot/Screenshoter';
import ScreenshotOptions from './screenshot/ScreenshotOptions';

import StandaloneCommandFactory from './commands/StandaloneCommandFactory';
import VrpCommandFactory from './commands/VrpCommandFactory';

const settings = loadSettings();

const webhookClient = new WebhookClient(settings.webhookUrl);
const screenshoter = new Screenshoter();

const commandFactory = createCommandFactory(settings.framework);

const screenshotCommand = commandFactory.createScreenshotCommand(settings.commandName, settings.commandPermission, webhookClient, screenshoter);
screenshotCommand.register();

global.exports(
    'requestClientScreenshotUploadToDiscord',
    async (player: string | number, messageData?: WebhookMessageData, callback?: (error: string | void) => void) => {
        const message = new WebhookMessage(messageData);
        message.attachFile(await screenshoter.takeScreenshot(player));

        webhookClient.send(message)
            .then(callback)
            .catch(error => callback?.call(undefined, error.message));
    }
);

global.exports(
    'requestCustomClientScreenshotUploadToDiscord',
    async (
        player: string | number,
        webhookUrl: string,
        options?: ScreenshotOptions,
        messageData?: WebhookMessageData,
        callback?: (error: string | void) => void
    ) => {
        const customWebhookClient = new WebhookClient(webhookUrl);
        const customScreenshoter = new Screenshoter(options);

        const message = new WebhookMessage(messageData);
        message.attachFile(await customScreenshoter.takeScreenshot(player));

        customWebhookClient.send(message)
            .then(callback)
            .catch(error => callback?.call(undefined, error.message));
    }
);

function createCommandFactory(framework: string) {
    switch (framework) {
        case 'vrp':
            return new VrpCommandFactory();
        default:
            return new StandaloneCommandFactory();
    }
}
