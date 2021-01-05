import FormData from 'form-data';

import Embed, { EmbedData } from './Embed';
import File from '../utils/File';

interface WebhookMessageData {
    content?: string;
    username?: string;
    avatar_url?: string;
    tts?: boolean;
    embeds?: EmbedData[];
}

class WebhookMessage {
    content?: string;
    username?: string;
    avatarUrl?: string;
    tts?: boolean;
    embeds: Embed[];
    files: File[];

    constructor(data?: WebhookMessageData) {
        this.content = data?.content;
        this.username = data?.username;
        this.avatarUrl = data?.avatar_url;
        this.tts = data?.tts;
        this.embeds = data?.embeds?.map(embedData => new Embed(embedData)) ?? [];
        this.files = [];
    }

    setContent(content: string) {
        this.content = content;
        return this;
    }

    setUsername(username: string) {
        this.username = username;
        return this;
    }

    setAvatar(url: string) {
        this.avatarUrl = url;
        return this;
    }

    setTts(tts: boolean) {
        this.tts = tts;
        return this;
    }

    addEmbed(embed: Embed) {
        this.embeds.push(embed);
        return this;
    }

    attachFile(file: File) {
        this.files.push(file);
        return this;
    }

    toJSON(): WebhookMessageData {
        return {
            content: this.content,
            username: this.username,
            avatar_url: this.avatarUrl,
            tts: this.tts,
            embeds: this.embeds.length > 0 ? this.embeds.map(embed => embed.toJSON()) : undefined
        };
    }

    toFormData() {
        const formData = new FormData();

        const files = [...this.files];
        for (const embed of this.embeds) {
            files.push(...embed.files);
        }

        for (const file of files) {
            formData.append('file', file.content, {
                filename: file.name
            });
        }

        formData.append('payload_json', JSON.stringify(this.toJSON()));

        return formData;
    }
}

export default WebhookMessage;

export { WebhookMessageData };
