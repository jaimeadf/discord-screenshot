# discord-screenshot

<p>
    <a href="https://github.com/GHMatti/ghmattimysql/blob/master/license.md">
        <img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="License">
    </a>
</p>

<p>
    <a href="https://discord.gg/z6Yx9A8VDR">
        <img src="https://discordapp.com/api/guilds/514185816315265068/widget.png?style=banner2" alt="Chat">
    </a>
</p>

You can also read this README in [Portuguese](https://github.com/jaimeadf/discord-screenshot/blob/master/README.pt.md).

## Overview

`discord-screenshot` is a resource for [FiveM](https://fivem.net) and [RedM](https://redm.gg) that takes a screenshot of a player and uploads it to a discord's webhook.

[![Showcase](https://img.youtube.com/vi/c9h40LoLky8/maxresdefault.jpg)](https://youtu.be/c9h40LoLky8)

## Installation

1. Make sure your server artifacts ([windows](https://runtime.fivem.net/artifacts/fivem/build_server_windows/master) or [linux](https://runtime.fivem.net/artifacts/fivem/build_proot_linux/master)) are up to date.
2. Download the latest zip file at [releases](https://github.com/jaimeadf/discord-screenshot/releases) and extract it at your resources folder.
3. Add `ensure screenshot-basic` and `ensure discord-screenshot` in your server.cfg.
4. Configure the resource in the `settings.json` file inside the discord-screenshot folder.

## Usage

A `/screenshot <target>` command is created according to the framework you are using. If you pass `-1` as target, a screenshot of everyone in the server will be taken.

**It only works outside `localhost`!**

### Standalone

#### /screenshot &lt;player or identifier&gt;
Can be used via console or by anyone with the `command.screenshot` ace permission.

### ESX

#### /screenshot &lt;player&gt;
Can be used via console or by any admin.

### vRP

#### /screenshot &lt;user_id&gt;
Can be used via console or by anyone with the `command.screenshot` permission.

## API

### Server

#### requestClientScreenshotUploadToDiscord(player, webhookMessageDto)
Takes a screenshot of the specified specific client and uploads it to the configured discord's webhook.

Arguments:
* **player**: string | number
* **webhookMessageDto**: [WebhookMessageDto](https://birdie0.github.io/discord-webhooks-guide/discord_webhook.html)

Example:
```lua
exports['discord-screenshot']:requestClientScreenshotUploadToDiscord(GetPlayers()[1], {
    username = 'A cat',
    avatar_url = 'https://cdn2.thecatapi.com/images/IboDUkK8K.jpg',
    content = 'Meow!',
    embeds = {
        {
            color = 16771584,
            author = {
                name = 'Wow!',
                icon_url = 'https://cdn.discordapp.com/embed/avatars/0.png'
            },
            title = 'I can send anything.'
        }
    }
})
```

#### requestCustomClientScreenshotUploadToDiscord(player, webhookUrl, webhookMessageDto)
Takes a screenshot of the specified client and uploads it to the passed discord's webhook.

Arguments:
* **player**: string | number
* **webhookUrl**: string
* **options**: object
  * **encoding**: 'png' | 'jpg' | 'webp'
  * **quality**: number
* **webhookMessageDto**: [WebhookMessageDto](https://birdie0.github.io/discord-webhooks-guide/discord_webhook.html)

Example:
```lua
local screenshotOptions = {
    encoding = 'png',
    quality = 1
}

exports['discord-screenshot']:requestCustomClientScreenshotUploadToDiscord(GetPlayers()[1], 'https://ptb.discord.com/api/webhooks/767824413780607097/WLjd77Y0CUvqXmhLCYzqkiZ-BrTpcGfNiZ7hXcJRgQxrU0YR8sy566MgMHgqRx8IZ9iu', screenshotOptions, {
    username = 'A cat',
    avatar_url = 'https://cdn2.thecatapi.com/images/IboDUkK8K.jpg',
    content = 'Meow!',
    embeds = {
        {
            color = 16771584,
            author = {
                name = 'Wow!',
                icon_url = 'https://cdn.discordapp.com/embed/avatars/0.png'
            },
            title = 'I can send anything.'
        }
    }
})
```

## Dependencies

* [screenshot-basic](https://github.com/citizenfx/screenshot-basic)

## Issues

Report any problem you have and try to provide all information about it.

## Contributing

Feel free to contribute and improve the code and the repository.
