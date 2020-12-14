import { loadSettings } from './Settings';

import WebhookClient from './discord/WebhookClient';
import WebhookMessage, { WebhookMessageData } from './discord/WebhookMessage';

import Screenshoter from './screenshot/Screenshoter';
import ScreenshotOptions from './screenshot/ScreenshotOptions';

import StandaloneCommandFactory from './commands/StandaloneCommandFactory';
import VrpCommandFactory from './commands/VrpCommandFactory';

import Utils from './utils/Utils';

const settings = loadSettings();

const webhookClient = new WebhookClient(settings.webhookUrl);
const screenshoter = new Screenshoter();

const commandFactory = createCommandFactory(settings.framework);

const screenshotCommand = commandFactory.createScreenshotCommand(
    settings.commandName,
    settings.commandPermission,
    webhookClient,
    screenshoter
);
screenshotCommand.register();

global.exports(
    'requestClientScreenshotUploadToDiscord',
    (player: string | number, messageData?: WebhookMessageData, callback?: (error?: string) => void) => {
        screenshoter
            .takeScreenshot(player)
            .then(async screenshot => {
                const message = new WebhookMessage(messageData);
                message.attachFile(screenshot);

                await webhookClient.send(message);

                Utils.safeInvoke(callback);
            })
            .catch(error => {
                Utils.safeInvoke(callback, error.message);
            });
    }
);

global.exports(
    'requestCustomClientScreenshotUploadToDiscord',
    (
        player: string | number,
        webhookUrl: string,
        options?: ScreenshotOptions,
        messageData?: WebhookMessageData,
        callback?: (error?: string) => void
    ) => {
        const customWebhookClient = new WebhookClient(webhookUrl);
        const customScreenshoter = new Screenshoter(options);

        customScreenshoter
            .takeScreenshot(player)
            .then(async screenshot => {
                const message = new WebhookMessage(messageData);
                message.attachFile(screenshot);

                await customWebhookClient.send(message);

                Utils.safeInvoke(callback);
            })
            .catch(error => {
                Utils.safeInvoke(callback, error.message);
            });
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
