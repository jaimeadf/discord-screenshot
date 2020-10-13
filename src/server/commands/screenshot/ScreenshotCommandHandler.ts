import CommandHandler from '../CommandHandler';
import DiscordScreenshot from '../../DiscordScreenshot';

abstract class ScreenshotCommandHandler implements CommandHandler{
    protected readonly _discordScreenshot: DiscordScreenshot;

    public constructor(discordScreenshot: DiscordScreenshot) {
        this._discordScreenshot = discordScreenshot;
    }

    public abstract execute(player: number, args: string[], rawCommand: string): Promise<void>;
}

export default ScreenshotCommandHandler;
