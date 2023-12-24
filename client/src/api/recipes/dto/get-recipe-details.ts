export type GetRecipeDetailsDTO = {
    _id: string,
    title: string,
    description: string,
    date: Date | string,
    image?: string,
    prep_time: number,
    cook_time: number,
    servings: number,
    ratings: Rating,
    kind: Kind,
    author: Author,
    nutritions: Nutritions,
    ingredients: string[],
    directions: string[]
};

type Rating = {
    "1": string[],
    "2": string[],
    "3": string[],
    "4": string[],
    "5": string[],
};

type Nutritions = {
    calories: number,
    carbs: number,
    fat: number,
    protein: number
};

type Kind = {
    _id: string,
    title: string
};

type Author = {
    _id: string,
    login: string
};
