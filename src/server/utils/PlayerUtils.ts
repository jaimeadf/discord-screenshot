class PlayerUtils {
    static getPlayers() {
        const players: string[] = [];
        const playersNum: number = GetNumPlayerIndices();

        for (let i = 0; i < playersNum; i++) {
            players.push(GetPlayerFromIndex(i));
        }

        return players;
    }

    static getPlayerIdentifiers(player: string) {
        const identifiers: string[] = [];
        const identifiersNum = GetNumPlayerIdentifiers(player);

        for (let i = 0; i < identifiersNum; i++) {
            let id = GetPlayerIdentifier(player, i);
            if (id.search("ip") == -1 ) {
                identifiers.push(id);
            }
        }

        return identifiers;
    }

    static getPlayerByIdentifier(identifier: string) {
        for (const player of PlayerUtils.getPlayers()) {
            const identifiers = PlayerUtils.getPlayerIdentifiers(player);
            if (identifiers.includes(identifier)) {
                return player;
            }
        }

        return undefined;
    }
}

export default PlayerUtils;
