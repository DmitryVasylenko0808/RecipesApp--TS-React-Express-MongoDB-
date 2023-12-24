export type GetReviewsDTO = Review[];

type Author = {
    _id: string,
    login: string,
    avatar_file: string
};

export type Review = {
    _id: string,
    author: Author,
    text: string,
    createdAt: Date | string,
    updatedAt: Date | string,
};