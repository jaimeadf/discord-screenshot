import parseDataUrl from 'data-urls';

import ScreenshotOptions from './ScreenshotOptions';
import File from '../utils/File';

class ScreenshotTaker {
    private readonly _options: ScreenshotOptions;

    public constructor(options: ScreenshotOptions) {
        this._options = options;
    }

    public takeClientScreenshot(player: string | number): Promise<File> {
        return new Promise<File>((resolve, reject) => {
            global.exports['screenshot-basic'].requestClientScreenshot(player, this._options, (error: string | false, urlString: string) => {
                const dataUrl = parseDataUrl(urlString);
                if (dataUrl) {
                    resolve({
                        filename: `screenshot.${dataUrl.mimeType.subtype}`,
                        content: dataUrl.body,
                        mimeType: dataUrl.mimeType
                    });
                } else {
                    reject(error);
                }
            });
        });
    }
}

export default ScreenshotTaker;
