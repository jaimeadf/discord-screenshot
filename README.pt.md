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

discord-screenshot é um resource para [FiveM](https://fivem.net) e [RedM](https://redm.gg) que tira uma screenshot de um player e a upa para um webhook do discord.

## Como instalar

1. Certifique-se que seus artefatos ([windows](https://runtime.fivem.net/artifacts/fivem/build_server_windows/master) ou [linux](https://runtime.fivem.net/artifacts/fivem/build_proot_linux/master)) estejam atualizados.
2. Baixe o último arquivo em [releases](https://github.com/jaimeadf/discord-screenshot/releases) e extraia na sua pasta resources.
3. Adicione `ensure screenshot-basic` e `ensure discord-screenshot` no seu server.cfg antes do start de sua framework.
4. Configure o resource no arquivo `settings.json` dentro da pasta discord-screenshot.

## Uso

Um comando `/screenshot` é criado de acordo com a framework que você está utilizando.

### Standalone

#### /screenshot &lt;player&gt;
Pode ser usado via console ou por qualquer um com a permissão ace `screenshot.command`.

### vRP

#### /screenshot &lt;user_id&gt;
Pode ser usado via console ou por qualquer um com a permissão `screenshot.command`.

## API

### Servidor

#### requestClientDiscordScreenshotUpload(player: string | number, webhookMessageAuthor?: DiscordWebhookMessageAuthor, webhookMessageContent?: string): void
Solicita que o cliente especificado tire uma captura de tela e a upe para um webhook do discord.

Argumentos:
* **player**: O índice do player alvo.
* **webhookMessageAuthor**: Um objeto opcional contendo as informações do autor da mensagem.
    * **name**: string? - Um nome opcional para o autor.
    * **avatarUrl**: string? - Uma url opcional para o autor.
* **webhookMessageContent**: An optional text for the webhook message.

## Dependências

* [screenshot-basic](https://github.com/citizenfx/screenshot-basic)

## Issues

Reporte qualquer problema que tiver e tente fornecer todas as informações.


## Contribuindo

Sinta-se livre para contribuir e melhorar o código e o repositório.
