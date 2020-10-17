function getPlayerIdentifiers(player: number | string): string[] {
    const identifiers: string[] = [];
    const identifiersNumber = GetNumPlayerIdentifiers(player.toString());

    for (let i = 0; i < identifiersNumber; i++) {
        identifiers.push(GetPlayerIdentifier(player.toString(), i))
    }

    return identifiers;
}

export default getPlayerIdentifiers;