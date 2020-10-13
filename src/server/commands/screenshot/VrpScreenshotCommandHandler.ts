import ScreenshotCommandHandler from './ScreenshotCommandHandler';
import DiscordScreenshot from '../../DiscordScreenshot';
import VrpProxy from '../../utils/VrpProxy';

class VrpScreenshotCommandHandler extends ScreenshotCommandHandler {
    private readonly _vrp: VrpProxy;

    public constructor(discordScreenshot: DiscordScreenshot) {
        super(discordScreenshot);
        this._vrp = new VrpProxy('vRP');
    }

    public async execute(player: number, args: string[], rawCommand: string): Promise<void> {
        if (player === 0 || await this._vrp.call('hasPermission', await this._vrp.call('getUserId', player), 'screenshot.command')) {
            const targetUserId = parseInt(args[0]);
            if (targetUserId) {
                const targetSource = await this._vrp.call('getUserSource', targetUserId) as number;
                if (targetSource) {
                    await this._discordScreenshot.requestClientScreenshotDiscordUpload(targetSource, {
                        name: `[${targetUserId}] ${GetPlayerName(targetSource.toString())}`
                    });
                }
            }
        }
    }
}

export default VrpScreenshotCommandHandler;
