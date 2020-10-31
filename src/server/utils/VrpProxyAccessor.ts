import IdGenerator from "./IdGenerator";

type VrpProxyCallback = (response: unknown) => void;

class VrpProxyAccessor {
    private readonly _name: string;
    private readonly _identifier: string;
    private readonly _ids: IdGenerator;
    private readonly _callbacks: { [ id: number ]: VrpProxyCallback };

    public constructor(name: string, identifier: string = GetCurrentResourceName()) {
        this._name = name;
        this._identifier = identifier;
        this._ids = new IdGenerator();
        this._callbacks = [];

        addEventListener(`${this._name}:${this._identifier}:proxy_res`, (requestId: number, response: unknown[]) => {
            if (this._callbacks.hasOwnProperty(requestId)) {
                if (response.length <= 1) {
                    this._callbacks[requestId](response[0]);
                } else {
                    this._callbacks[requestId](response);
                }

                delete this._callbacks[requestId];
                this._ids.free(requestId);
            }
        });
    }

    public async call(handlerName: string, ...args: any[]): Promise<unknown> {
        return new Promise<unknown>(resolve => {
            const id = this._ids.gen();
            this._callbacks[id] = resolve;
            emit(`${this._name}:proxy`, handlerName, args, this._identifier, id);
        });
    }

    public emit(handlerName: string, ...args: any[]): void {
        emit(`${this._name}:proxy`, handlerName, args, this._identifier, -1);
    }
}

export default VrpProxyAccessor;
