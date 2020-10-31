import ScreenshotCommandHandler from './ScreenshotCommandHandler';
import ScreenshotTaker from '../../screenshot/ScreenshotTaker';

import DiscordWebhook from '../../discord/DiscordWebhook';
import DiscordEmbed from '../../discord/DiscordEmbed';

import VrpProxyAccessor from '../../utils/VrpProxyAccessor';

class VrpScreenshotCommandHandler extends ScreenshotCommandHandler {
    private readonly _vrp: VrpProxyAccessor;

    public constructor(screenshotTaker: ScreenshotTaker, discordWebhook: DiscordWebhook) {
        super(screenshotTaker, discordWebhook);
        this._vrp = new VrpProxyAccessor('vRP');
    }

    public async execute(player: string, args: string[], rawCommand: string): Promise<void> {
        if (player === '0' || await this._vrp.call('hasPermission', await this._vrp.call('getUserId', parseInt(player)), 'command.screenshot')) {
            const target = args[0];
            if (target === '-1') {
                this.requestEveryoneScreenshotUploadToDiscord();
            } else {
                const targetUserId = parseInt(target);
                if (targetUserId) {
                    const targetPlayer = await this._vrp.call('getUserSource', targetUserId) as number;
                    await this.requestClientScreenshotUploadToDiscord(targetPlayer.toString());
                }
            }
        }
    }

    protected async buildEmbed(player: string): Promise<DiscordEmbed> {
        const embed = await super.buildEmbed(player);
        const userId = await this._vrp.call('getUserId', player) as number;

        embed.addField('User Id', userId.toString(), true);

        return embed;
    }
}

export default VrpScreenshotCommandHandler;
