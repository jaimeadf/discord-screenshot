import CommandHandler from './CommandHandler';

class Command {
    private handler?: CommandHandler;

    constructor(name: string, handler?: CommandHandler) {
        this.handler = handler;

        RegisterCommand(name, (player: number, args: string[], rawCommand: string) =>
            this.handler?.execute(player, args, rawCommand), false);
    }

    public setHandler(handler: CommandHandler) {
        this.handler = handler;
    }
}

export default Command;
