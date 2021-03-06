import { VrpProxy } from '@vrpjs/server';

import ScreenshotCommand from './ScreenshotCommand';

import WebhookClient from '../discord/WebhookClient';
import Screenshoter from '../screenshot/Screenshoter';

import File from '../utils/File';

class VrpScreenshotCommand extends ScreenshotCommand {
    private _vrp: VrpProxy.Handlers;

    constructor(
        name: string,
        permission: string,
        hiddenIdentifiers: string[],
        webhookClient: WebhookClient,
        screenshoter: Screenshoter,
        vrp: VrpProxy.Handlers
    ) {
        super(name, permission, hiddenIdentifiers, webhookClient, screenshoter);
        this._vrp = vrp;
    }

    protected async execute(source: string, args: string[], rawCommand: string) {
        if (source !== '0') {
            const userId = this._vrp.getUserId(source) as number | undefined;
            if (userId && !this._vrp.hasPermission(userId, this.permission)) {
                return emitNet('chat:addMessage', source, {
                    args: ['^7discord-screenshot', "^1You don't have permission to use this command."]
                });
            }
        }

        if (args[0] === '-1') {
            this.requestEveryoneScreenshotUploadToDiscord(source);
        } else {
            const targetUserId = parseInt(args[0], 10);
            if (targetUserId) {
                const target = this._vrp.getUserSource(targetUserId) as number | undefined;
                if (target) {
                    await this.requestScreenshotUploadToDiscord(source, target.toString());
                } else {
                    emitNet('chat:addMessage', source, {
                        args: ['^7discord-screenshot', "^1The target isn't online."]
                    });
                }
            }
        }
    }

    protected buildEmbed(requester: string, target: string, content: File | Error) {
        const embed = super.buildEmbed(requester, target, content);
        const targetUserId = this._vrp.getUserId(parseInt(target, 10)) as number | undefined;

        if (targetUserId) {
            embed.addField('User Id', targetUserId.toString(), true);
        }

        return embed;
    }
}

export default VrpScreenshotCommand;
