import FormData from 'form-data';

import DiscordWebhookMessageAuthor from './DiscordWebhookMessageAuthor';
import File from '../utils/File';

class DiscordWebhookMessage {
    private author?: DiscordWebhookMessageAuthor;
    private content?: string;
    private readonly files: File[];

    public constructor() {
        this.files = [];
    }

    public setAuthor(author: DiscordWebhookMessageAuthor): DiscordWebhookMessage {
        this.author = author;
        return this;
    }

    public setContent(content: string): DiscordWebhookMessage {
        this.content = content;
        return this;
    }

    public attachFile(file: File): DiscordWebhookMessage {
        this.files.push(file);
        return this;
    }

    public async toFormData(): Promise<FormData> {
        const formData = new FormData();

        if(this.content) formData.append('content', this.content);

        if (this.author) {
            if (this.author.name) formData.append('username', this.author.name);
            if (this.author.avatarUrl) formData.append('avatar_url', this.author.avatarUrl);
        }

        for (const file of this.files) {
            formData.append('files[]', file.content, {
                filename: file.filename,
                contentType: file.mimeType.type
            });
        }

        return formData;
    }
}

export default DiscordWebhookMessage;
