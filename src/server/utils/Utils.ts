class Utils {
    static delay(millis: number) {
        return new Promise<void>(resolve => {
            setTimeout(resolve, millis);
        });
    }
}

export default Utils;
