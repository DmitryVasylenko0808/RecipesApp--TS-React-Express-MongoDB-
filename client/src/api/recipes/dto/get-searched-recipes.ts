export type GetSearchedRecipesDTO = Recipe[];

export type Recipe = {
    _id: string,
    title: string,
    kind: Kind,
    date: Date | string,
    image?: string,
    rating: {
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