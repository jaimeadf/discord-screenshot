import ScreenshotCommandHandler from './ScreenshotCommandHandler';

import getPlayers from '../../utils/getPlayers';
import getPlayerIdentifiers from '../../utils/getPlayerIdentifiers';

class StandaloneScreenshotCommandHandler extends ScreenshotCommandHandler {
    public async execute(player: number, args: string[], rawCommand: string): Promise<void> {
        const target = args[0];
        if (target && player === 0 || IsPlayerAceAllowed(player.toString(), 'screenshot.command')) {
            let targetPlayer = target;
            const players = getPlayers();

            if (!players.includes(targetPlayer)) {
                for (const player of players) {
                    const identifiers = getPlayerIdentifiers(player)
                    if (identifiers.includes(target)) {
                        targetPlayer = player;
                        break;
                    }
                }
            }
            
            if (targetPlayer) {
                await this._discordScreenshot.requestClientScreenshotDiscordUpload(targetPlayer, {
                    name: `[${targetPlayer}] ${GetPlayerName(targetPlayer)}`
                });
            }
        }
    }

    private get
}

export default StandaloneScreenshotCommandHandler;
