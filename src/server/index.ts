import { loadSettings } from './Settings';
import Framework from './Framework';

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
    settings.hiddenIdentifiers,
    webhookClient,
    screenshoter
);
screenshotCommand.register();

global.exports(
    'requestClientScreenshotUploadToDiscord',
    (player: string | number, messageData?: WebhookMessageData, timeoutMs?: number, callback?: Callback) => {
        if (typeof timeoutMs === 'function') {
            callback = timeoutMs;
            timeoutMs = undefined;
        }

        screenshoter
            .takeScreenshot(player, timeoutMs)
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
        timeoutMs?: number | Callback,
        callback?: Callback
    ) => {
        if (typeof timeoutMs === 'function') {
            callback = timeoutMs;
            timeoutMs = undefined;
        }

        const customWebhookClient = new WebhookClient(webhookUrl);
        const customScreenshoter = new Screenshoter(options);

        customScreenshoter
            .takeScreenshot(player, timeoutMs)
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

function createCommandFactory(framework: Framework) {
    switch (framework) {
        case Framework.VRP:
            return new VrpCommandFactory();
        default:
            return new StandaloneCommandFactory();
    }
}

type Callback = (error?: string) => void;
