import Color from 'color';

import Command from './Command';

import WebhookClient from '../discord/WebhookClient';
import WebhookMessage from '../discord/WebhookMessage';
import Embed from '../discord/Embed';

import Screenshoter from '../screenshot/Screenshoter';

import File from '../utils/File';

import PlayerUtils from '../utils/PlayerUtils';

abstract class ScreenshotCommand extends Command {
    protected readonly permission: string;
    protected readonly hiddenIdentifiers: string[];
    protected readonly webhookClient: WebhookClient;
    protected readonly screenshoter: Screenshoter;

    constructor(
        name: string,
        permission: string,
        hiddenIdentifiers: string[],
        webhookClient: WebhookClient,
        screenshoter: Screenshoter
    ) {
        super(name);
        this.permission = permission;
        this.webhookClient = webhookClient;
        this.hiddenIdentifiers = hiddenIdentifiers;
        this.screenshoter = screenshoter;
    }

    protected abstract execute(source: string, args: string[], rawCommand: string): void;

    protected async requestScreenshotUploadToDiscord(requester: string, target: string) {
        const message = new WebhookMessage();
        try {
            message.addEmbed(this.buildEmbed(requester, target, await this.screenshoter.takeScreenshot(target)));
        } catch (error) {
            message.addEmbed(this.buildEmbed(requester, target, error));
        } finally {
            await this.webhookClient.send(message);
        }
    }

    protected requestEveryoneScreenshotUploadToDiscord(requester: string) {
        for (const player of PlayerUtils.getPlayers()) {
            this.requestScreenshotUploadToDiscord(requester, player);
        }
    }

    protected buildEmbed(requester: string, target: string, content: File | Error) {
        const embed = new Embed();
        embed.setAuthor(
            GetPlayerName(target) ?? 'Unknown',
            'https://github.com/jaimeadf',
            'https://discord.com/assets/f78426a064bc9dd24847519259bc42af.png'
        );
        embed.setTimestamp();
        embed.setFooter(`Requested by ${requester !== '0' ? GetPlayerName(requester) ?? 'Unknown' : 'Server Console'}`);

        const identifiers = this.getFilteredPlayerIdentifiers(target);
        if (identifiers.length > 0) {
            embed.addField('Identifiers', identifiers.join('\n'));
        }

        embed.addField('Source', target, true);

        if (content instanceof File) {
            embed.setColor(Color('#00C851'));
            embed.setImage(content);
        } else {
            embed.setColor(Color('#FF4444'));
            embed.setTitle(`An error occurred: \`${content.message}\``);
        }

        return embed;
    }

    private getFilteredPlayerIdentifiers(player: string) {
        const regex = new RegExp(`^(${this.hiddenIdentifiers.join('|')}):`);
        return PlayerUtils.getPlayerIdentifiers(player).filter(i => !regex.test(i));
    }
}

export default ScreenshotCommand;
