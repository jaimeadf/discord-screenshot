interface CommandHandler {
    execute(player: number, args: string[], rawCommand: string): Promise<void>;
}

export default CommandHandler;
