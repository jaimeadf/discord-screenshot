# discord-screenshot

<p align="center">
  <a href="https://github.com/GHMatti/ghmattimysql/blob/master/license.md">
    <img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="License">
  </a>
  <a href="https://discord.gg/z6Yx9A8VDR">
    <img src="https://discordapp.com/api/guilds/514185816315265068/widget.png" alt="Chat">
  </a>
</p>

`discord-screenshot` é um resource para [FiveM](https://fivem.net) que captura a tela de um player e a upa para o
webhook do discord.

[![Showcase](https://yt-embed.herokuapp.com/embed?v=c9h40LoLky8)](https://youtu.be/c9h40LoLky8)

## Instalação

1. Certifique-se que seus artefatos ([windows](https://runtime.fivem.net/artifacts/fivem/build_server_windows/master)
   ou [linux](https://runtime.fivem.net/artifacts/fivem/build_proot_linux/master)) estão atualizados.
2. Extraia o último arquivo zip em [releases](https://github.com/jaimeadf/discord-screenshot/releases) na sua pasta
   resources.
3. Adicione `ensure screenshot-basic` e `ensure discord-screenshot` no seu `server.cfg`.
4. Ajuste a [configuração](#configuração) do resource no `settings.json`.

## Configuração

* **webhookUrl** - A url do seu webhook do discord.
* **framework** - A framework que você está usando (`vrp` ou `none`).
* **commandName** - O nome do comando.
* **commandPermission** - A permissão para usar o comando.
* **screenshotOptions**
    * **encoding** - O formato do arquivo (`png`, `jpg` ou `webp`)
    * **quality** - A qualidade da imagem de 0.0 a 1.0.

## Uso padrão

> **Nota:** Se você passar `-1` como alvo, a tela de todos os jogadores será capturada.

### Standalone

#### /screenshot &lt;player ou identifier&gt;

Pode ser usado pelo console do servidor ou por qualquer um com a permissão ace `request.screenshot`.

### vRP

#### /screenshot &lt;user_id&gt;

Pode ser usado pelo console do servidor ou por qualquer um com a permissão `request.screenshot`.

## Exports

### Servidor

#### requestClientScreenshotUploadToDiscord

Captura a tela do player e a envia para o webhook do discord configurado.

Parâmetros:

* **player**: string | number
* **webhookMessageData?**: [WebhookMessageData](https://birdie0.github.io/discord-webhooks-guide/discord_webhook.html)
* **timeoutMs?**: number
* **callback?**: (error?: string) => void

Exemplo:

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
    30000,
    function(error)
        if error then
            return print("^1ERROR: " .. error)
        end
        print("Sent screenshot successfully")
    end
)
```

#### requestCustomClientScreenshotUploadToDiscord

Captura a tela do player e a envia para o webhook do discord especificado.

Parâmetros:

* **player**: string | number
* **webhookUrl**: string
* **options?**: object
    * **encoding**: 'png' | 'jpg' | 'webp'
    * **quality**: number
* **webhookMessageData?**: [WebhookMessageData](https://birdie0.github.io/discord-webhooks-guide/discord_webhook.html)
* **timeoutMs?**: number
* **callback?**: (error?: string) => void

Exemplo:

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
    30000,
    function(error)
        if error then
            return print("^1ERROR: " .. error)
        end
        print("Sent screenshot successfully")
    end
)
```

## Dependências

* [screenshot-basic](https://github.com/citizenfx/screenshot-basic)
