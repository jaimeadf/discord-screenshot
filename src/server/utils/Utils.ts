class Utils {
    static delay(millis: number) {
        return new Promise<void>(resolve => {
            setTimeout(resolve, millis);
        });
    }

    static safeInvoke(callback?: (...args: any[]) => void, ...args: any[]) {
        if (typeof callback === 'function') {
            setImmediate(callback.bind(undefined, ...args));
        }
    }
}

export default Utils;
