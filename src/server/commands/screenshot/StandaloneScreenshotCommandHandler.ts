import ScreenshotCommandHandler from './ScreenshotCommandHandler';

class StandaloneScreenshotCommandHandler extends ScreenshotCommandHandler {
    public async execute(player: number, args: string[], rawCommand: string): Promise<void> {
        if (player === 0 || IsPlayerAceAllowed(player.toString(), 'screenshot.command')) {
            const targetPlayer = args[0];
            if (targetPlayer) {
                await this._discordScreenshot.requestClientScreenshotDiscordUpload(targetPlayer, {
                    name: `[${targetPlayer}] ${GetPlayerName(targetPlayer)}`
                });
            }
        }
    }
}

export default StandaloneScreenshotCommandHandler;
