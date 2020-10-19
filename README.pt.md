# discord-screenshot

<p>
    <a href="https://github.com/GHMatti/ghmattimysql/blob/master/license.md">
        <img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="License">
    </a>
    <a href="https://discord.gg/xvqfCgg">
        <img src="https://discordapp.com/api/guilds/753071308010684417/widget.png" alt="Chat">
    </a>
</p>

## Visão geral

`discord-screenshot` é um resource para [FiveM](https://fivem.net) e [RedM](https://redm.gg) que tira uma captura de tela de um player e a upa para um webhook do discord.

## Instalação

1. Certifique-se que seus artefatos ([windows](https://runtime.fivem.net/artifacts/fivem/build_server_windows/master) ou [linux](https://runtime.fivem.net/artifacts/fivem/build_proot_linux/master)) estejam atualizados.
2. Baixe o último arquivo em [releases](https://github.com/jaimeadf/discord-screenshot/releases) e extraia na sua pasta resources.
3. Adicione `ensure screenshot-basic` e `ensure discord-screenshot` no seu server.cfg antes do start de sua framework.
4. Configure o resource no arquivo `settings.json` dentro da pasta discord-screenshot.

## Uso

Um comando `/screenshot` é criado de acordo com a framework que você está utilizando.

**Ele só funciona fora de `localhost`!**

### Standalone

#### /screenshot &lt;player ou identificador&gt;
Pode ser usado via console ou por qualquer um com a permissão ace `command.screenshot`.

### vRP

#### /screenshot &lt;user_id&gt;
Pode ser usado via console ou por qualquer um com a permissão `command.screenshot`.

## API

### Servidor

#### requestClientScreenshotDiscordUpload(player: string | number, webhookMessageAuthor?: DiscordWebhookMessageAuthor, webhookMessageContent?: string)
Tira uma captura de tela do cliente especificado e a envia para o webhook do discord configurado. 

Argumentos:
* **player**: O índice do player alvo.
* **webhookMessageAuthor**: Um objeto opcional contendo as informações do autor da mensagem do webhook.
    * **name**: string? - Um nome opcional para o autor.
    * **avatarUrl**: string? - Uma url opcional para o avatar do autor.
* **webhookMessageContent**: Um texto opcional para o contéudo da mensagem do webhook.

Exemplo:
```lua
exports['discord-screenshot']:requestClientScreenshotDiscordUpload(GetPlayers()[1], {
    name: 'Screenshot',
    avatarUrl: 'https://canary.discord.com/assets/f78426a064bc9dd24847519259bc42af.png'
}, 'This is an example.')
```

#### requestCustomClientScreenshotDiscordUpload(player: string | number, webhookUrl: string, webhookMessageAuthor?: DiscordWebhookMessageAuthor, webhookMessageContent?: string)
Tira uma captura de tela do cliente especificado e a envia para o webhook do discord passado.

Argumentos:
* **player**: O índice do player alvo.
* **webhookUrl**: A url do webhook do discord.
* **webhookMessageAuthor**: Um objeto opcional contendo as informações do autor da mensagem do webhook.
    * **name**: string? - Um nome opcional para o autor.
    * **avatarUrl**: string? - Uma url opcional para o avatar do autor.
* **webhookMessageContent**: Um texto opcional para o contéudo da mensagem do webhook.

Exemplo:
```lua
exports['discord-screenshot']:requestCustomClientScreenshotDiscordUpload(GetPlayers()[1], 'https://canary.discord.com/api/webhooks/412884227131886566/qFcXr19SozY5Bej5H74RdbRscsOjH4eVxgJO5Iwh5iawmkpRfjzijezlwdu15wNsCk4w', {
    name: 'Screenshot',
    avatarUrl: 'https://canary.discord.com/assets/f78426a064bc9dd24847519259bc42af.png'
}, 'This is an example.')
```

## Dependências

* [screenshot-basic](https://github.com/citizenfx/screenshot-basic)

## Issues

Reporte qualquer problema que tiver e tente fornecer todas as informações sobre ele.


## Contribuindo

Sinta-se livre para contribuir e melhorar o código e o repositório.
