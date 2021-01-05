interface Deferral {
    resolve?: () => void;
    promise: Promise<void>;
}

class AsyncQueue {
    private readonly _deferrals: Deferral[];

    constructor() {
        this._deferrals = [];
    }

    wait() {
        let resolve;
        const promise = new Promise<void>(r => (resolve = r));

        this._deferrals.push({
            resolve,
            promise
        });

        return this._deferrals[this._deferrals.length - 2]?.promise ?? Promise.resolve();
    }

    shift() {
        const resolve = this._deferrals.shift()?.resolve;
        if (resolve) {
            resolve();
        }
    }
}

export default AsyncQueue;
