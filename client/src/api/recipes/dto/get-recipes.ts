export type GetRecipesDTO = Recipe[];

export type Recipe = {
    _id: string,
    title: string,
    kind: Kind,
    date: Date | string,
    image?: string,
    ratings: {
        "1": string[],
        "2": string[],
        "3": string[],
        "4": string[],
        "5": string[]
    }
}

export type Kind = {
    _id: string,
    title: string
}