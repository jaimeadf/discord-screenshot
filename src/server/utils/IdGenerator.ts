class IdGenerator {
    private _max: number;
    private _ids: number[];

    public constructor() {
        this._max = 0;
        this._ids = [];
    }

    public clear(): void {
        this._max = 0;
        this._ids = [];
    }

    public gen(): number {
        return this._ids.pop() || this._max++;
    }

    public free(id: number): void {
        this._ids.push(id);
    }
}

export default IdGenerator;
