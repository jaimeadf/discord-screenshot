import { ESXServer } from 'fivem-esx-js/server/esx_server';

import ScreenshotCommandHandler from './ScreenshotCommandHandler';
import ScreenshotTaker from '../../screenshot/ScreenshotTaker';
import DiscordWebhook from '../../discord/DiscordWebhook';

class EsxScreenshotCommandHandler extends ScreenshotCommandHandler {
    private readonly _esx: ESXServer;

    public constructor(screenshotTaker: ScreenshotTaker, discordWebhook: DiscordWebhook) {
        super(screenshotTaker, discordWebhook);
        this._esx = global.exports['es_extended'].getSharedObject();
    }

    public async execute(player: string, args: string[], rawCommand: string): Promise<void> {
        if (player !== '0') {
            const xPlayer = this._esx.GetPlayerFromId(parseInt(player));
            if (xPlayer.getGroup() !== 'admin') {
                return;
            }
        }

        const target = args[0];
        if (target === '-1') {
            this.requestEveryoneScreenshotUploadToDiscord();
        } else {
            await this.requestClientScreenshotUploadToDiscord(target);
        }
    }
}

export default EsxScreenshotCommandHandler;
