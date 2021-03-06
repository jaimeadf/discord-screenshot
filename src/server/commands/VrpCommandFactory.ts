import { VrpProxy } from '@vrpjs/server';

import CommandFactory from './CommandFactory';

import Command from './Command';
import VrpScreenshotCommand from './VrpScreenshotCommand';

import WebhookClient from '../discord/WebhookClient';
import Screenshoter from '../screenshot/Screenshoter';

class VrpCommandFactory implements CommandFactory {
    private readonly _vrp: VrpProxy.Handlers;

    constructor() {
        this._vrp = VrpProxy.getInterface('vRP');
    }

    public createScreenshotCommand(
        name: string,
        permission: string,
        hiddenIdentifiers: string[],
        webhookClient: WebhookClient,
        screenshoter: Screenshoter
    ): Command {
        return new VrpScreenshotCommand(name, permission, hiddenIdentifiers, webhookClient, screenshoter, this._vrp);
    }
}

export default VrpCommandFactory;
