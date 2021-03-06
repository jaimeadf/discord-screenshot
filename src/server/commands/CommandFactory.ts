import WebhookClient from '../discord/WebhookClient';
import Screenshoter from '../screenshot/Screenshoter';

import Command from './Command';

interface CommandFactory {
    createScreenshotCommand(
        name: string,
        permission: string,
        hiddenIdentifiers: string[],
        webhookClient: WebhookClient,
        screenshoter: Screenshoter
    ): Command;
}

export default CommandFactory;
