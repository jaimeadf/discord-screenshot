import MIMEType from 'whatwg-mimetype';

import ScreenshotOptions from './ScreenshotOptions';
import File from '../utils/File';

class ScreenshotTaker {
    private readonly _options: ScreenshotOptions;

    public constructor(options: ScreenshotOptions) {
        this._options = options;
    }

    public takeClientScreenshot(player: string): Promise<File> {
        return new Promise<File>((resolve, reject) => {
            global.exports['screenshot-basic'].requestClientScreenshot(player, this._options, (error: string | false, urlString: string) => {
                if (error) {
                    reject(error);
                } else {
                    resolve({
                        fileName: `screenshot.${this._options.encoding}`,
                        content: Buffer.from(urlString.substring(urlString.indexOf(',') + 1), 'base64'),
                        mimeType: new MIMEType(`image/${this._options.encoding}`)
                    });
                }
            });
        });
    }
}

export default ScreenshotTaker;
