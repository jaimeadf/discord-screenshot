import Framework from './Framework';
import ScreenshotOptions from './screenshot/ScreenshotOptions';

interface Settings {
    webhookUrl: string;
    framework: Framework;
    commandName: string;
    commandPermission: string;
    hiddenIdentifiers: string[];
    screenshotOptions?: ScreenshotOptions;
}

export function loadSettings(): Settings {
    return JSON.parse(LoadResourceFile(GetCurrentResourceName(), 'settings.json'));
}

export default Settings;
