import IdGenerator from './IdGenerator'

type VrpProxyHandler = (...args: any[]) => void;
type VrpProxyCallback = (response: unknown) => void;

class VrpProxy {
    private readonly _name: string;
    private readonly _identifier: string;
    private readonly _handlers: { [ name: string ]: VrpProxyHandler };
    private readonly _ids: IdGenerator;
    private readonly _callbacks: { [ id: number ]: VrpProxyCallback };

    public constructor(name: string, identifier: string = GetCurrentResourceName()) {
        this._name = name;
        this._identifier = identifier;
        this._handlers = {};
        this._ids = new IdGenerator();
        this._callbacks = {};

        addEventListener(`${this._name}:proxy`, (handlerName: string, args: any[], requestIdentifier: string, requestId: number) => {
            if (this._handlers.hasOwnProperty(handlerName)) {
                const response = this._handlers[handlerName](...args);

                if (requestId >= 0) {
                    emit(`${name}:${requestIdentifier}:proxy_res`, requestId, response)
                }
            }
        });

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

    public register(handlerName: string, handler: VrpProxyHandler) {
        this._handlers[handlerName] = handler;
    }

    public unregister(handlerName: string) {
        delete this._handlers[handlerName];
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

export default VrpProxy;

export {
    VrpProxyHandler
};
