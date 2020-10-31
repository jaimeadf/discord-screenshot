import DiscordEmbedDto from './DiscordEmbedDto';

interface DiscordWebhookMessageDto {
    username?: string;
    avatar_url?: string;
    content?: string;
    tts?: boolean;
    embeds?: DiscordEmbedDto[];
}

 export default DiscordWebhookMessageDto;
