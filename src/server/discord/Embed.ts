import Color from 'color';

import EmbedFooter from './EmbedFooter';
import EmbedMedia from './EmbedMedia';
import EmbedAuthor from './EmbedAuthor';
import EmbedField from './EmbedField';
import File from '../utils/File';

interface EmbedData {
    title?: string;
    description?: string;
    url?: string;
    timestamp?: string;
    color?: number;
    footer?: EmbedFooter;
    image?: EmbedMedia;
    thumbnail?: EmbedMedia;
    video?: EmbedMedia;
    author?: EmbedAuthor;
    fields?: EmbedField[];
}

class Embed {
    title?: string;
    description?: string;
    url?: string;
    timestamp?: string;
    color?: number;
    footer?: EmbedFooter;
    image?: EmbedMedia;
    thumbnail?: EmbedMedia;
    video?: EmbedMedia;
    author?: EmbedAuthor;
    fields: EmbedField[];
    files: File[];

    constructor(data?: EmbedData) {
        this.title = data?.title;
        this.description = data?.description;
        this.url = data?.url;
        this.timestamp = data?.timestamp;
        this.color = data?.color;
        this.footer = data?.footer;
        this.image = data?.image;
        this.thumbnail = data?.thumbnail;
        this.video = data?.video;
        this.author = data?.author;
        this.fields = data?.fields ?? [];
        this.files = [];
    }

    setTitle(title: string) {
        this.title = title;
        return this;
    }

    setDescription(description: string) {
        this.description = description;
        return this;
    }

    setUrl(url: string) {
        this.url = url;
        return this;
    }

    setTimestamp(date: Date = new Date()) {
        this.timestamp = date.toISOString();
        return this;
    }

    setColor(color: Color) {
        this.color = color.rgbNumber();
        return this;
    }

    setFooter(text: string, iconUrl?: string) {
        this.footer = {
            text,
            icon_url: iconUrl
        };
        return this;
    }

    setImage(image: string | File, width?: number, height?: number) {
        this.image = {
            url: this.resolveMedia(image),
            width,
            height
        };
        return this;
    }

    setThumbnail(thumbnail: string | File, width?: number, height?: number) {
        this.thumbnail = {
            url: this.resolveMedia(thumbnail),
            width,
            height
        };
        return this;
    }

    setVideo(video: string | File, width?: number, height?: number) {
        this.video = {
            url: this.resolveMedia(video),
            width,
            height
        };
        return this;
    }

    setAuthor(name?: string, url?: string, iconUrl?: string) {
        this.author = {
            name,
            url,
            icon_url: iconUrl
        };
        return this;
    }

    addField(name: string, value: string, inline: boolean = false) {
        this.fields.push({
            name,
            value,
            inline
        });
        return this;
    }

    attachFile(file: File) {
        this.files.push(file);
        return this;
    }

    toJSON(): EmbedData {
        return {
            title: this.title,
            description: this.description,
            url: this.url,
            timestamp: this.timestamp,
            color: this.color,
            footer: this.footer,
            image: this.image,
            thumbnail: this.thumbnail,
            video: this.video,
            author: this.author,
            fields: this.fields.length > 0 ? this.fields : undefined
        };
    }

    private resolveMedia(media: string | File) {
        if (media instanceof File) {
            this.attachFile(media);
            return `attachment://${media.name}`;
        }

        return media;
    }
}

export default Embed;

export { EmbedData };
