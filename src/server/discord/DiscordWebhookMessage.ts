import FormData from 'form-data';

import File from '../utils/File';
import DiscordEmbed from './DiscordEmbed';
import DiscordWebhookMessageDto from "../dtos/discord/DiscordWebhookMessageDto";

interface DiscordWebhookMessageAuthor {
    name?: string;
    avatarUrl?: string;
}

class DiscordWebhookMessage {
    private author?: DiscordWebhookMessageAuthor;
    private content?: string;
    private tts?: boolean;
    private readonly embeds: DiscordEmbed[];
    private readonly files: File[];

    public constructor() {
        this.files = [];
        this.embeds = [];
    }

    public setAuthor(name: string, avatarUrl?: string): DiscordWebhookMessage {
        this.author = {
            name,
            avatarUrl
        };
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

    public addEmbed(embed: DiscordEmbed): DiscordWebhookMessage {
        this.embeds.push(embed);
        return this;
    }

    public toDto(): DiscordWebhookMessageDto {
        return {
            username: this.author?.name,
            avatar_url: this.author?.avatarUrl,
            content: this.content,
            tts: this.tts,
            embeds: this.embeds.map(embed => embed.toDto())
        };
    }

    public toFormData(): FormData {
        const formData = new FormData();

        formData.append('payload_json', JSON.stringify(this.toDto()), {
            contentType: 'application/json'
        });

        for (const file of this.files) {
            formData.append('files[]', file.content, {
                filename: file.fileName,
                contentType: file.mimeType.essence
            });
        }

        return formData;
    }
}

export default DiscordWebhookMessage;
