interface DiscordEmbedAuthorDto {
    name?: string;
    url?: string;
    icon_url?: string;
}

interface DiscordEmbedFieldDto {
    name?: string;
    value?: string;
    inline?: boolean;
}

interface DiscordEmbedImageDto {
    url?: string;
}

interface DiscordEmbedFooterDto {
    text?: string;
    icon_url?: string;
}

interface DiscordEmbedDto {
    color?: number;
    author?: DiscordEmbedAuthorDto;
    title?: string;
    url?: string;
    description?: string;
    fields?: DiscordEmbedFieldDto[];
    thumbnail?: DiscordEmbedImageDto;
    image?: DiscordEmbedImageDto;
    footer?: DiscordEmbedFooterDto;
    timestamp?: string;
}

export default DiscordEmbedDto;

export {
    DiscordEmbedAuthorDto,
    DiscordEmbedFieldDto,
    DiscordEmbedImageDto,
    DiscordEmbedFooterDto
};
