# discord-screenshot

<p>
    <a href="https://github.com/GHMatti/ghmattimysql/blob/master/license.md">
        <img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="License">
    </a>
    <a href="https://discord.gg/xvqfCgg">
        <img src="https://discordapp.com/api/guilds/753071308010684417/widget.png" alt="Chat">
    </a>
</p>

You can also read this README in [Portuguese](https://github.com/jaimeadf/discord-screenshot/blob/master/README.pt.md).

## Overview

`discord-screenshot` is a resource for [FiveM](https://fivem.net) and [RedM](https://redm.gg) that takes a screenshot of a player and uploads it to a discord's webhook.

## Installation

1. Make sure your server artifacts ([windows](https://runtime.fivem.net/artifacts/fivem/build_server_windows/master) or [linux](https://runtime.fivem.net/artifacts/fivem/build_proot_linux/master)) are up to date.
2. Download the latest file at [releases](https://github.com/jaimeadf/discord-screenshot/releases) and extract it at your resources folder.
3. Add `ensure screenshot-basic` and `ensure discord-screenshot` in your server.cfg before your framework's start.
4. Configure the resource in the `settings.json` file inside the discord-screenshot folder.

## Usage

A `/screenshot` command is created according to the framework you are using.

**It only works outside `localhost`!**

### Standalone

#### /screenshot &lt;player or identifier&gt;
Can be used via console or by anyone with the `screenshot.command` ace permission.

### vRP

#### /screenshot &lt;user_id&gt;
Can be used via console or by anyone with the `screenshot.command` permission.

## API

### Server

#### requestClientScreenshotDiscordUpload(player: string | number, webhookMessageAuthor?: DiscordWebhookMessageAuthor, webhookMessageContent?: string)
Takes a screenshot of the specified specific client and uploads it to the configured discord's webhook.

Arguments:
* **player**: The target player index.
* **webhookMessageAuthor**: An optional object containing the webhook message author information.
    * **name**: string? - An optional name for the author.
    * **avatarUrl**: string? - An optional url for the author avatar.
* **webhookMessageContent**: An optional text for the webhook message content.

Example:
```lua
exports['discord-screenshot']:requestClientScreenshotDiscordUpload(GetPlayers()[1], {
    name: 'Screenshot',
    avatarUrl: 'https://canary.discord.com/assets/f78426a064bc9dd24847519259bc42af.png'
}, 'This is an example.')
```

#### requestCustomClientScreenshotDiscordUpload(player: string | number, webhookUrl: string, webhookMessageAuthor?: DiscordWebhookMessageAuthor, webhookMessageContent?: string)
Takes a screenshot of the specified client and uploads it to the passed discord's webhook.

Arguments:
* **player**: The target player index.
* **webhookUrl**: The discord's webhook url.
* **webhookMessageAuthor**: An optional object containing the webhook message author information.
    * **name**: string? - An optional name for the author.
    * **avatarUrl**: string? - An optional url for the author.
* **webhookMessageContent**: An optional text for the webhook message content.

Example:
```lua
exports['discord-screenshot']:requestCustomClientScreenshotDiscordUpload(GetPlayers()[1], 'https://canary.discord.com/api/webhooks/412884227131886566/qFcXr19SozY5Bej5H74RdbRscsOjH4eVxgJO5Iwh5iawmkpRfjzijezlwdu15wNsCk4w', {
    name: 'Screenshot',
    avatarUrl: 'https://canary.discord.com/assets/f78426a064bc9dd24847519259bc42af.png'
}, 'This is an example.')
```

## Dependencies

* [screenshot-basic](https://github.com/citizenfx/screenshot-basic)

## Issues

Report any problem you have and try to provide all information about it.

## Contributing

Feel free to contribute and improve the code and the repository.
