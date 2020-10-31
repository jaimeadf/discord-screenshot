import FormData from 'form-data';

import DiscordEmbed from './DiscordEmbed';
import DiscordWebhookMessageDto from '../dtos/discord/DiscordWebhookMessageDto';

import File from '../utils/File';

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

    public constructor(dto?: DiscordWebhookMessageDto) {
        this.embeds = [];
        this.files = [];

        if (dto) {
            if (dto.username || dto.avatar_url) {
                this.author = {
                    name: dto.username,
                    avatarUrl: dto.avatar_url
                };
            }
            this.content = dto.content;
            this.tts = dto.tts;
            dto.embeds?.forEach(embedDto => {
                this.embeds.push(new DiscordEmbed(embedDto));
            });
        }
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

    public setTts(tts: boolean): DiscordWebhookMessage {
        this.tts = tts;
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
