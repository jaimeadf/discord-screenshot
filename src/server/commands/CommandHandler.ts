interface CommandHandler {
    execute(player: string, args: string[], rawCommand: string): Promise<void>;
}

export default CommandHandler;
