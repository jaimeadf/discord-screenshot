type ScreenshotEncoding = 'png' | 'jpg' | 'webp';

interface ScreenshotOptions {
    encoding?: ScreenshotEncoding;
    quality?: number;
}

export default ScreenshotOptions;

export {
    ScreenshotEncoding
};
