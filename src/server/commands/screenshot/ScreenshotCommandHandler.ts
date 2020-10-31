import Color from 'color';

import CommandHandler from '../CommandHandler';

import ScreenshotTaker from '../../screenshot/ScreenshotTaker';

import DiscordWebhook from '../../discord/DiscordWebhook';
import DiscordWebhookMessage from '../../discord/DiscordWebhookMessage';
import DiscordEmbed from '../../discord/DiscordEmbed';

import getPlayers from '../../utils/getPlayers';
import getPlayerIdentifiers from '../../utils/getPlayerIdentifiers';

class ScreenshotCommandHandler implements CommandHandler {
    protected readonly _screenshotTaker: ScreenshotTaker;
    protected readonly _discordWebhook: DiscordWebhook;

    public constructor(screenshotTaker: ScreenshotTaker, discordWebhook: DiscordWebhook) {
        this._screenshotTaker = screenshotTaker;
        this._discordWebhook = discordWebhook;
    }

    public async execute(player: string, args: string[], rawCommand: string): Promise<void> {
        if (player === '0' || IsPlayerAceAllowed(player, 'command.screenshot')) {
            const target = args[0];
            if (target === '-1') {
                this.requestEveryoneScreenshotUploadToDiscord();
            } else {
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

                if (targetPlayer) {
                    await this.requestClientScreenshotUploadToDiscord(player);
                }
            }
        }
    }

    protected async requestClientScreenshotUploadToDiscord(player: string): Promise<void> {
        const screenshot = await this._screenshotTaker.takeClientScreenshot(player);
        const message = new DiscordWebhookMessage()
            .setAuthor(GetPlayerName(player))
            .attachFile(screenshot)
            .addEmbed(await this.buildEmbed(player));

        this._discordWebhook.sendMessage(message);
    }

    protected requestEveryoneScreenshotUploadToDiscord(): void {
        for (let player of getPlayers()) {
            this.requestClientScreenshotUploadToDiscord(player);
        }
    }

    protected async buildEmbed(player: string): Promise<DiscordEmbed> {
        const embed = new DiscordEmbed()
            .setColor(Color.rgb(255, 50, 50))
            .setAuthor(GetPlayerName(player.toString()), 'https://github.com/jaimeadf', 'https://cdn.discordapp.com/embed/avatars/4.png')
            .addField('Identifiers', getPlayerIdentifiers(player.toString()).join('\n'), false)
            .addField('Source', player.toString(), true)
            .setTimestamp(new Date());

        return embed;
    }
}

export default ScreenshotCommandHandler;
