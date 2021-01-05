import ScreenshotCommand from './ScreenshotCommand';

import PlayerUtils from '../utils/PlayerUtils';

class StandaloneScreenshotCommand extends ScreenshotCommand {
    protected async execute(source: string, args: string[], rawCommand: string) {
        if (source !== '0' && !IsPlayerAceAllowed(source, this.permission)) {
            return emitNet('chat:addMessage', source, {
                args: ['^7discord-screenshot', "^1You don't have permission to use this command."]
            });
        }

        if (args[0] === '-1') {
            this.requestEveryoneScreenshotUploadToDiscord(source);
        } else {
            const players = PlayerUtils.getPlayers();
            const target = players.includes(args[0]) ? args[0] : PlayerUtils.getPlayerByIdentifier(args[0]);

            if (target) {
                await this.requestScreenshotUploadToDiscord(source, target);
            } else {
                emitNet('chat:addMessage', source, {
                    args: ['^7discord-screenshot', "^1The target isn't online."]
                });
            }
        }
    }
}

export default StandaloneScreenshotCommand;
