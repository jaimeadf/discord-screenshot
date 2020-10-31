# discord-screenshot

<p>
    <a href="https://github.com/GHMatti/ghmattimysql/blob/master/license.md">
        <img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="License">
    </a>
</p>

<p>
    <a href="https://discord.gg/xvqfCgg">
        <img src="https://discordapp.com/api/guilds/753071308010684417/widget.png?style=banner2" alt="Chat">
    </a>
</p>

## Visão geral

`discord-screenshot` é um resource para [FiveM](https://fivem.net) e [RedM](https://redm.gg) que tira uma captura de tela de um player e a upa para um webhook do discord.

[![Showcase](https://img.youtube.com/vi/c9h40LoLky8/maxresdefault.jpg)](https://youtu.be/c9h40LoLky8)

## Instalação

1. Certifique-se que seus artefatos ([windows](https://runtime.fivem.net/artifacts/fivem/build_server_windows/master) ou [linux](https://runtime.fivem.net/artifacts/fivem/build_proot_linux/master)) estejam atualizados.
2. Baixe o último arquivo zip em [releases](https://github.com/jaimeadf/discord-screenshot/releases) e extraia na sua pasta resources.
3. Adicione `ensure screenshot-basic` e `ensure discord-screenshot` no seu server.cfg.
4. Configure o resource no arquivo `settings.json` dentro da pasta discord-screenshot.

## Uso

Um comando `/screenshot <alvo>` é criado de acordo com a framework que você está utilizando. Se você passar `-1` como alvo, uma captura da tela de todos no servidor será tirada.

**Ele só funciona fora de `localhost`!**

### Standalone

#### /screenshot &lt;player ou identificador&gt;
Pode ser usado via console ou por qualquer um com a permissão ace `command.screenshot`.

### ESX

#### /screenshot &lt;player&gt;
Pode ser usado via console ou por qualquer admin.

### vRP

#### /screenshot &lt;user_id&gt;
Pode ser usado via console ou por qualquer um com a permissão `command.screenshot`.

## API

### Servidor

#### requestClientScreenshotUploadToDiscord(player, webhookMessageDto)
Tira uma captura de tela do cliente especificado e a envia para o webhook do discord configurado. 

Argumentos:
* **player**: string | number
* **webhookMessageDto**: [WebhookMessageDto](https://birdie0.github.io/discord-webhooks-guide/discord_webhook.html)

Exemplo:
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
Tira uma captura de tela do cliente especificado e a envia para o webhook do discord passado.

Argumentos:
* **player**: string | number
* **webhookUrl**: string
* **options**: object
  * **encoding**: 'png' | 'jpg' | 'webp'
  * **quality**: number
* **webhookMessageDto**: [WebhookMessageDto](https://birdie0.github.io/discord-webhooks-guide/discord_webhook.html)

Exemplo:
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

## Dependências

* [screenshot-basic](https://github.com/citizenfx/screenshot-basic)

## Issues

Reporte qualquer problema que tiver e tente fornecer todas as informações sobre ele.


## Contribuindo

Sinta-se livre para contribuir e melhorar o código e o repositório.
