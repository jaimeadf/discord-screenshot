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

> You can also read this README in [Portuguese](https://github.com/jaimeadf/discord-screenshot/blob/master/README.pt.md).

`discord-screenshot` is a resource for [FiveM](https://fivem.net) that captures a screenshot of a player and upload it to a discord's webhook.

[![Showcase](https://img.youtube.com/vi/c9h40LoLky8/maxresdefault.jpg)](https://youtu.be/c9h40LoLky8)

## Setup
1. Make sure your artifcats ([windows](https://runtime.fivem.net/artifacts/fivem/build_server_windows/master) ou [linux](https://runtime.fivem.net/artifacts/fivem/build_proot_linux/master)) are up to date.
2.Extract the latest zip file at [releases](https://github.com/jaimeadf/discord-screenshot/releases) in your resources folder.
3. Add `ensure screenshot-basic` and `ensure discord-screenshot` in your `server.cfg`.
4. Adjust the [configuration](#configuration) of the resource in the `settings.json`.

## Configuration

* **webhookUrl**: The url of your discord's webhook.
* **framework**: The framework you are using (`vrp` or `none`).
* **commandName**: The command name.
* **commandPermission**: The permission to use the command.
* **screenshotOptions**
  * **encoding**: The file format (`png`, `jpg` or `webp`)
  * **quality**: The image quality from 0 to 1.

## Usage

> **Note:** If you pass `-1` as target, the screen of all the players will be captured.

### Standalone

#### /screenshot &lt;player ou identifier&gt;

Can be used via console or by anyone with the ace permission `discord.screenshot`.

### vRP

#### /screenshot &lt;user_id&gt;

Can be used via console or by anyone with the permission `discord.screenshot`.

## Exports

### Server

#### requestClientScreenshotUploadToDiscord

Capture the screen of the player and send it to the configured discord webhook.

Parameters:
* **player**: string | number
* **webhookMessageData?**: [WebhookMessageData](https://birdie0.github.io/discord-webhooks-guide/discord_webhook.html)
* **callback?**: (error?: string) => void

Example:
```lua
exports["discord-screenshot"]:requestClientScreenshotUploadToDiscord(
    GetPlayers()[1],
    {
        username = "A cat",
        avatar_url = "https://cdn2.thecatapi.com/images/IboDUkK8K.jpg",
        content = "Meow!",
        embeds = {
            {
                color = 16771584,
                author = {
                    name = "Wow!",
                    icon_url = "https://cdn.discordapp.com/embed/avatars/0.png"
                },
                title = "I can send anything."
            }
        }
    },
    function(error)
        if error then
            return print("^7" .. error)
        end
        print("Sent screenshot successfully")
    end
)

```

#### requestCustomClientScreenshotUploadToDiscord

Capture the screen of the player and send it to the specified discord webhook.

Parameters:
* **player**: string | number
* **webhookUrl**: string
* **options?**: object
  * **encoding**: 'png' | 'jpg' | 'webp'
  * **quality**: number
* **webhookMessageData?**: [WebhookMessageData](https://birdie0.github.io/discord-webhooks-guide/discord_webhook.html)
* **callback?**: (error?: string) => void

Example:
```lua
exports["discord-screenshot"]:requestCustomClientScreenshotUploadToDiscord(
    GetPlayers()[1],
    "https://ptb.discord.com/api/webhooks/767824413780607097/WLjd77Y0CUvqXmhLCYzqkiZ-BrTpcGfNiZ7hXcJRgQxrU0YR8sy566MgMHgqRx8IZ9iu",
    {
        encoding = "png",
        quality = 1
    },
    {
        username = "A cat",
        avatar_url = "https://cdn2.thecatapi.com/images/IboDUkK8K.jpg",
        content = "Meow!",
        embeds = {
            {
                color = 16771584,
                author = {
                    name = "Wow!",
                    icon_url = "https://cdn.discordapp.com/embed/avatars/0.png"
                },
                title = "I can send anything."
            }
        }
    },
    function(error)
        if error then
            return print("^7" .. error)
        end
        print("Sent screenshot successfully")
    end
)
```

## Dependencies

* [screenshot-basic](https://github.com/citizenfx/screenshot-basic)
