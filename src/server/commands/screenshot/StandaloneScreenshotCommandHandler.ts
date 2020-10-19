import ScreenshotCommandHandler from './ScreenshotCommandHandler';

import getPlayers from '../../utils/getPlayers';
import getPlayerIdentifiers from '../../utils/getPlayerIdentifiers';

class StandaloneScreenshotCommandHandler extends ScreenshotCommandHandler {
    public async execute(player: number, args: string[], rawCommand: string): Promise<void> {
        if (player === 0 || IsPlayerAceAllowed(player.toString(), 'command.screenshot')) {
            const target = args[0];
            if (target !== undefined) {
                let targetPlayer: string | undefined;
                const players = getPlayers();

                if (players.includes(target)) {
                    targetPlayer = target;
                } else {
                    for (const player of players) {
                        const identifiers = getPlayerIdentifiers(player);
                        if (identifiers.includes(target)) {
                            targetPlayer = player;
                            break;
                        }
                    }
                }

                if (targetPlayer !== undefined) {
                    await this._discordScreenshot.requestClientScreenshotDiscordUpload(targetPlayer, {
                        name: `[${targetPlayer}] ${GetPlayerName(targetPlayer)}`
                    });
                }
            }
        }
    }
}

export default StandaloneScreenshotCommandHandler;
