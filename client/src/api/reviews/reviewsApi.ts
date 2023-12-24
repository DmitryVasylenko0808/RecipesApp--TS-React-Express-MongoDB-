import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { BASE_API_URL_REVIEWS } from "../../constants/api";
import { GetReviewsDTO } from "./dto/get-reviews";

type GetReviewsParams = {
    recipeId?: string,
    page: number,
    sortDate: string
}

export const reviewsApi = createApi({
    reducerPath: "reviewsApi",
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_API_URL_REVIEWS
    }),
    endpoints: builder => ({
        getReviews: builder.query<GetReviewsDTO, GetReviewsParams>({
            query: ({ recipeId, page, sortDate }) => `/${recipeId}?page=${page}&sortDate=${sortDate}`
        })
    }) 
});

export const { useLazyGetReviewsQuery } = reviewsApi;