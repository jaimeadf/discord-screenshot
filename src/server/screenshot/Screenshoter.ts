import { timeout } from 'promise-timeout';

import File from '../utils/File';
import ScreenshotOptions from './ScreenshotOptions';

class Screenshoter {
    private readonly _options: ScreenshotOptions;

    constructor(options: ScreenshotOptions = {}) {
        this._options = options;
    }

    takeScreenshot(player: string | number, timeoutMs = 60000) {
        return timeout(
            new Promise<File>((resolve, reject) => {
                global.exports['screenshot-basic'].requestClientScreenshot(
                    player,
                    this._options,
                    (errorMessage: string | false, dataUri: string) => {
                        if (errorMessage) {
                            return reject(new Error(errorMessage));
                        }

                        const extension = dataUri.substring(dataUri.indexOf('/') + 1, dataUri.indexOf(';'));
                        const base64Data = dataUri.substring(dataUri.indexOf(',') + 1);

                        resolve(new File(`screenshot.${extension}`, Buffer.from(base64Data, 'base64')));
                    }
                );
            }),
            timeoutMs
        );
    }
}

export default Screenshoter;
