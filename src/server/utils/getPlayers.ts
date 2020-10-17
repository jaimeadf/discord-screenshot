function getPlayers(): string[] {
    const players: string[] = [];

    for (let i = 0; i < GetNumPlayerIndices(); i++) {
        players.push(GetPlayerFromIndex(i));
    }

    return players;
}

export default getPlayers;