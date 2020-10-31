import Color from 'color';

import DiscordEmbedDto  from '../dtos/discord/DiscordEmbedDto';

interface DiscordEmbedAuthor {
    name?: string;
    url?: string;
    iconUrl?: string;
}

interface DiscordEmbedField {
    name?: string;
    content?: string;
    inline?: boolean;
}

interface DiscordEmbedFooter {
    text?: string;
    iconUrl?: string;
}

class DiscordEmbed {
    private color?: Color;
    private author?: DiscordEmbedAuthor;
    private title?: string;
    private url?: string;
    private description?: string;
    private readonly fields: DiscordEmbedField[];
    private thumbnailUrl?: string;
    private imageUrl?: string;
    private footer?: DiscordEmbedFooter;
    private timestamp?: Date;

    public constructor(dto?: DiscordEmbedDto) {
        this.fields = [];

        if (dto) {
            this.color = dto.color ? Color(dto.color) : undefined;
            this.author = dto.author ? {
                name: dto.author.name,
                url: dto.author.url,
                iconUrl: dto.author.icon_url
            } : undefined;
            this.title = dto.title;
            this.url = dto.url;
            this.description = dto.description;
            dto.fields?.forEach(fieldDto => {
                this.fields.push({
                    name: fieldDto.name,
                    content: fieldDto.value,
                    inline: fieldDto.inline
                });
            });
            this.thumbnailUrl = dto.thumbnail?.url;
            this.imageUrl = dto.image?.url;
            this.footer = dto.footer ? {
                text: dto.footer.text,
                iconUrl: dto.footer.icon_url
            } : undefined;
            this.timestamp = dto.timestamp ? new Date(dto.timestamp) : undefined;
        }
    }

    public setColor(color: Color): DiscordEmbed {
        this.color = color;
        return this;
    }

    public setAuthor(name: string, url?: string, iconUrl?: string): DiscordEmbed {
        this.author = {
            name,
            url,
            iconUrl
        };
        return this;
    }

    public setTitle(title: string): DiscordEmbed {
        this.title = title;
        return this;
    }

    public setUrl(url: string): DiscordEmbed {
        this.url = url;
        return this;
    }

    public addField(name: string, content?: string, inline: boolean = false): DiscordEmbed {
        const field: DiscordEmbedField = {
            name,
            content,
            inline
        };

        this.fields.push(field);
        return this;
    }

    public setDescription(description: string): DiscordEmbed {
        this.description = description;
        return this;
    }

    public setThumbnail(url: string): DiscordEmbed {
        this.thumbnailUrl = url;
        return this;
    }

    public setImage(url: string): DiscordEmbed {
        this.imageUrl = url;
        return this;
    }

    public setFooter(text: string, iconUrl: string): DiscordEmbed {
        this.footer = {
            text,
            iconUrl
        };
        return this;
    }

    public setTimestamp(timestamp: Date): DiscordEmbed {
        this.timestamp = timestamp;
        return this;
    }

    public toDto(): DiscordEmbedDto {
        return {
            color: this.color?.rgbNumber(),
            author: this.author ? {
                name: this.author.name,
                url: this.author.url,
                icon_url: this.author.iconUrl
            } : undefined,
            title: this.title,
            url: this.url,
            description: this.description,
            fields: this.fields.map(field => ({
                name: field.name,
                value: field.content,
                inline: field.inline
            })),
            thumbnail: this.thumbnailUrl ? undefined : {
                url: this.thumbnailUrl
            },
            image: this.imageUrl ? undefined : {
                url: this.imageUrl
            },
            footer: this.footer ? {
                text: this.footer.text,
                icon_url: this.footer.iconUrl
            } : undefined,
            timestamp: this.timestamp?.toISOString()
        };
    }
}

export default DiscordEmbed;

export {
    DiscordEmbedAuthor,
    DiscordEmbedField,
    DiscordEmbedFooter
};
