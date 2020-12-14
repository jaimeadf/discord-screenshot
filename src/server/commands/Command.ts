abstract class Command {
    private readonly _name: string;

    protected constructor(name: string) {
        this._name = name;
    }

    register() {
        RegisterCommand(
            this._name,
            (source: number, args: string[], rawCommand: string) => {
                this.execute(source.toString(), args, rawCommand);
            },
            false
        );
    }

    protected abstract execute(source: string, args: string[], rawCommand: string): void;
}

export default Command;
